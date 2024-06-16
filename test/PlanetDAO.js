const { expect } = require('chai');
const { ethers } = require('hardhat');
const { tokens } = require('./utils');

describe('PlanetDAO', function () {
  let planetDAO;

  beforeEach(async function () {
    const PlanetDAO = await ethers.getContractFactory('PlanetDAO');
    planetDAO = await PlanetDAO.deploy();
  });

  it('Should deploy with correct details', async function () {
    expect((await planetDAO.getCommunities()).length).to.equal(0);
  });

  it('should create a community', async function () {
    await planetDAO.createCommunity('Test Community', 'Amazing community description', '2024-06-15', 'ipfs://image_hash', '#123456', 'ipfs://logo_hash', tokens(0.01));

    expect((await planetDAO.getCommunities()).length).to.equal(1);
  });

  it('should get multiple communities', async () => {
    await planetDAO.createCommunity('Test Community 1', 'Amazing community description', '2024-06-15', 'ipfs://image_hash', '#123456', 'ipfs://logo_hash', tokens(0.01));
    await planetDAO.createCommunity('Test Community 2', 'Fantastic community description', '2024-06-15', 'ipfs://image_hash', '#123456', 'ipfs://logo_hash', tokens(0.01));

    const communities = await planetDAO.getCommunities();

    expect(communities.length).to.equal(2);
  });
});
