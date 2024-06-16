const { expect } = require('chai');
const { ethers } = require('hardhat');
const { tokens } = require('./utils');

describe('Community', function () {
  let community;
  let owner;
  let member;
  let member2;
  let member3;

  const donationAmount = tokens(0.01);

  beforeEach(async function () {
    [owner, member, member2, member3] = await ethers.getSigners();

    const Community = await ethers.getContractFactory('Community');
    community = await Community.deploy('Test Community', 'Amazing community description', '2024-06-15', 'ipfs://image_hash', '#123456', 'ipfs://logo_hash', donationAmount, owner.address);
  });

  it('Should deploy with correct details', async function () {
    const communityDetails = await community.viewCommunity();

    expect(communityDetails.name).to.equal('Test Community');
    expect(communityDetails.description).to.equal('Amazing community description');
    expect(communityDetails.startDate).to.equal('2024-06-15');
    expect(Number(communityDetails.createdAt)).to.be.a('number');
    expect(communityDetails.image).to.equal('ipfs://image_hash');
    expect(communityDetails.brandingColor).to.equal('#123456');
    expect(communityDetails.subscriptionPrice).to.equal(tokens(0.01));
    expect(communityDetails.owner).to.equal(owner.address);
    expect(communityDetails.deleted).to.equal(false);
  });

  it('Should allow users to join', async function () {
    expect((await community.viewCommunity()).membersCount).to.equal(0);

    await community.connect(member).join({ value: donationAmount });
    expect(await community.members(member.address)).to.be.true;
    expect((await community.viewCommunity()).membersCount).to.equal(1);
  });

  it('Should prevent double joining', async function () {
    await community.connect(member).join({ value: donationAmount });
    await expect(community.connect(member).join({ value: donationAmount })).to.be.revertedWith('Already a member');
  });

  it('Should allow users to leave', async function () {
    await community.connect(member).join({ value: donationAmount });
    expect(await community.members(member.address)).to.be.true;
    expect((await community.viewCommunity()).membersCount).to.equal(1);

    await community.connect(member).leave();
    expect(await community.members(member.address)).to.be.false;
    expect((await community.viewCommunity()).membersCount).to.equal(0);
  });

  it('Should prevent non-members from leaving', async function () {
    await expect(community.connect(member).leave()).to.be.revertedWith('Not a member');
  });

  it('Should allow owner to delete the community', async function () {
    expect((await community.viewCommunity()).deleted).to.be.false;

    await community.deleteCommunity();

    expect((await community.viewCommunity()).deleted).to.be.true;
  });

  it('Should prevent operations on a deleted community', async function () {
    await community.connect(owner).deleteCommunity();
    await expect(community.connect(member).join({ value: donationAmount })).to.be.revertedWith('Community has been deleted');
    await expect(community.connect(member).leave()).to.be.revertedWith('Community has been deleted');
  });

  it('Should prevent non-owners from deleting the community', async function () {
    await expect(community.connect(member).deleteCommunity()).to.be.revertedWith('Not the owner');
  });

  it('should not be possible for non-owners or non-members to create a goal', async function () {
    await expect(community.connect(member).createGoal('Test Goal', 'Amazing Goal description', 'ipfs://image_hash', tokens('2'), '2024-07-15')).to.be.revertedWith('Must be either the owner or a member');
  });

  it('should be possible for the owners to create a goal', async function () {
    await community.createGoal('Test Goal', 'Amazing Goal description', 'ipfs://image_hash', tokens('2'), '2024-07-15');

    expect((await community.getGoals()).length).to.equal(1);
  });

  it('should be possible for the members to create a goal', async function () {
    await community.connect(member).join({ value: donationAmount });
    await community.connect(member).createGoal('Test Goal', 'Amazing Goal description', 'ipfs://image_hash', tokens('2'), '2024-07-15');

    expect((await community.getGoals()).length).to.equal(1);
  });

  it('should be able to check if sender is a member', async function () {
    expect(await community.connect(member).isMember()).to.be.false;

    await community.connect(member).join({ value: donationAmount });

    expect(await community.connect(member).isMember()).to.be.true;
  });

  it('should retrieve a list of members including the owner', async function () {
    await community.connect(member).join({ value: donationAmount });
    await community.connect(member2).join({ value: donationAmount });

    const membersList = await community.getMembers();
    expect(membersList.length).to.equal(3);
    expect(membersList[0]).to.equal(owner.address);
    expect(membersList[1]).to.equal(member.address);
    expect(membersList[2]).to.equal(member2.address);
  });

  it('should remove members from the list of members', async function () {
    await community.connect(member).join({ value: donationAmount });
    await community.connect(member2).join({ value: donationAmount });
    await community.connect(member3).join({ value: donationAmount });

    await community.connect(member2).leave();

    const membersList = await community.getMembers();

    expect(membersList.length).to.equal(3);
    expect(membersList[0]).to.equal(owner.address);
    expect(membersList[1]).to.equal(member.address);
    expect(membersList[2]).to.equal(member3.address);
  });
});
