const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether');
};

describe('Idea', function () {
  let community;
  let goal;
  let idea;

  let owner;
  let member;
  let notMember;
  let donor;

  beforeEach(async function () {
    [owner, member, donor, notMember] = await ethers.getSigners();

    const Goal = await ethers.getContractFactory('Goal');
    const Community = await ethers.getContractFactory('Community');
    const Idea = await ethers.getContractFactory('Idea');

    community = await Community.deploy('Test Community', 'Amazing community description', '2024-06-15', 'ipfs://image_hash', '#123456', 'ipfs://logo_hash', tokens(0.01), owner.address);
    await community.connect(member).join({ value: tokens(0.01) });
    await community.connect(donor).join({ value: tokens(0.01) });
    goal = await Goal.deploy('Test Goal', 'Amazing Goal description', 'ipfs://image_hash', owner.address, await community.getAddress(), tokens('2'), '2024-07-15');

    idea = await Idea.deploy('Test Idea', 'Amazing Idea description', 'ipfs://image_hash', tokens(4), owner.address, await goal.getAddress(), await community.getAddress());
  });

  it('Should deploy with correct details', async function () {
    const ideaDetails = await idea.viewIdea();

    expect(ideaDetails.name).to.equal('Test Idea');
    expect(ideaDetails.description).to.equal('Amazing Idea description');
    expect(ideaDetails.image).to.equal('ipfs://image_hash');
    expect(ideaDetails.owner).to.equal(owner.address);
    expect(ideaDetails.deleted).to.equal(false);
    expect(await idea.getGoal()).to.equal(await goal.getAddress());
    expect(await idea.getCommunity()).to.equal(await community.getAddress());
  });

  it('Should be possible to delete a idea by the owner', async function () {
    await idea.connect(owner).deleteIdea();

    const ideaDetails = await idea.viewIdea();

    expect(ideaDetails.deleted).to.be.true;
  });

  it('Should prevent non-owners from deleting the idea', async function () {
    await expect(idea.connect(member).deleteIdea()).to.be.revertedWith('Not the owner');
  });

  it('Should accept donations', async function () {
    const donationAmount = tokens(1);

    await idea.connect(donor).donate({ value: donationAmount });

    const ideaInfo = await idea.viewIdea();
    expect(ideaInfo.donationsReceived).to.equal(donationAmount);

    await expect(idea.connect(donor).donate({ value: donationAmount })).to.changeEtherBalance(donor, `-${donationAmount.toString()}`);
  });

  it('Should allow voting to members', async function () {
    await idea.connect(member).vote();
    await idea.connect(donor).vote();

    const ideaInfo = await idea.viewIdea();
    expect(ideaInfo.votesCount).to.equal(2);
    expect(await idea.connect(member).isVoter()).to.be.true;
    expect(await idea.connect(notMember).isVoter()).to.be.false;
  });

  it('Should not allow non-members to vote', async function () {
    await expect(idea.connect(notMember).vote()).to.be.revertedWith('Not a member of the community');
  });

  it('Should not allow double votes', async function () {
    await idea.connect(member).vote();

    await expect(idea.connect(member).vote()).to.be.revertedWith('User has already voted');
  });

  it('Should allow unvoting when already voted', async function () {
    await idea.connect(member).vote();
    expect((await idea.viewIdea()).votesCount).to.equal(1);

    await idea.connect(member).unVote();

    expect((await idea.viewIdea()).votesCount).to.equal(0);
  });
});
