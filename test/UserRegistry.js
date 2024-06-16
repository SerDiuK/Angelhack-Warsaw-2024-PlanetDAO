const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('UserRegistry', function () {
  let registry;
  let user1;
  let user2;

  beforeEach(async function () {
    [user1, user2] = await ethers.getSigners();

    const UserRegistry = await ethers.getContractFactory('UserRegistry');
    registry = await UserRegistry.deploy();
  });

  it('should register a single user', async function () {
    await registry.connect(user1).registerUser('Barry Bono', 'http://profile-url');

    const user = await registry.getUser(user1.address);

    expect(user.name).to.equal('Barry Bono');
    expect(user.image).to.equal('http://profile-url');
  });

  it("should throw an error if the user doesn't exist", async function () {
    await expect(registry.connect(user1).getUser(user1.address)).to.be.revertedWith('No user exists for this wallet');
  });

  it('should only be possible to register a single user to a address', async function () {
    await registry.connect(user1).registerUser('Barry Bono', 'http://profile-url');

    await expect(registry.registerUser('Kevin Ko', 'http://profile-url')).to.be.revertedWith('User already registered to this wallet');
  });

  it('should have a name of at least 3 characters', async function () {
    await expect(registry.registerUser('Ke', 'http://profile-url')).to.be.revertedWith('Name must be at least 3 characters long');
  });

  it('should be possible to add badges', async () => {
    await registry.connect(user1).registerUser('Barry Bono', 'http://profile-url');
    await registry.connect(user1).addBadge(user1.address, 'JoinedCommunity');

    const badges = await registry.connect(user1).getBadges(user1.address);

    expect(badges.length).to.equal(1);
  });

  it('should only be possible to add badges to existing users', async () => {
    await expect(registry.connect(user1).addBadge(user1.address, 'JoinedCommunity')).to.be.revertedWith('User not registered');
  });
});
