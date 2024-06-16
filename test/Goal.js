const { expect } = require('chai');
const { ethers } = require('hardhat');
const { tokens } = require('./utils');

describe('Goal', function () {
  let goal;
  let community;
  let owner;
  let member;

  beforeEach(async function () {
    [owner, member] = await ethers.getSigners();

    const Goal = await ethers.getContractFactory('Goal');
    const Community = await ethers.getContractFactory('Community');

    community = await Community.deploy('Test Community', 'Amazing community description', '2024-06-15', 'ipfs://image_hash', '#123456', 'ipfs://logo_hash', tokens(0.01), owner.address);

    goal = await Goal.deploy('Test Goal', 'Amazing Goal description', 'ipfs://image_hash', owner.address, await community.getAddress(), tokens('2'), '2024-07-15');
  });

  it('Should deploy with correct details', async function () {
    const goalDetails = await goal.viewGoal();

    expect(goalDetails.name).to.equal('Test Goal');
    expect(goalDetails.description).to.equal('Amazing Goal description');
    expect(goalDetails.image).to.equal('ipfs://image_hash');
    expect(goalDetails.owner).to.equal(owner.address);
    expect(goalDetails.deleted).to.equal(false);
    expect(await goal.getCommunity()).to.equal(await community.getAddress());
  });

  it('Should be possible to delete a goal by the owner', async function () {
    await goal.connect(owner).deleteGoal();

    const goalDetails = await goal.viewGoal();

    expect(goalDetails.deleted).to.be.true;
  });

  it('Should prevent non-owners from deleting the goal', async function () {
    await expect(goal.connect(member).deleteGoal()).to.be.revertedWith('Not the owner');
  });

  it('should be possible to create an idea', async () => {
    expect((await goal.getIdeas()).length).to.equal(0);

    await goal.createIdea('Awesome idea 1', 'Awesome idea description', 'ipfs://image_hash', tokens('1'));
    await goal.createIdea('Awesome idea 2', 'Awesome idea description', 'ipfs://image_hash', tokens('4'));

    expect((await goal.getIdeas()).length).to.equal(2);
  });
});
