// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract UserRegistry {
  struct User {
    string name;
    string image;
    string[] badges;
  }

  mapping(address => User) public users;

  modifier userExists() {
    require(bytes(users[msg.sender].name).length > 0, 'User not registered');
    _;
  }

  function registerUser(string memory _name, string memory _image) public {
    require(bytes(users[msg.sender].name).length == 0, 'User already registered to this wallet');
    require(bytes(_name).length >= 3, 'Name must be at least 3 characters long');

    User storage user = users[msg.sender];
    user.name = _name;
    user.image = _image;
  }

  function registerUserToWallet(string memory _name, string memory _image, address _wallet) public {
    require(bytes(users[msg.sender].name).length == 0, 'User already registered to this wallet');
    require(bytes(_name).length >= 3, 'Name must be at least 3 characters long');

    User storage user = users[_wallet];
    user.name = _name;
    user.image = _image;
  }

  function addBadge(address _user, string memory _badge) public userExists {
    users[_user].badges.push(_badge);
  }

  function getUser(address _walletAddress) public view returns (User memory) {
    require(bytes(users[_walletAddress].name).length > 0, 'No user exists for this wallet');

    return users[_walletAddress];
  }

  function getBadges(address _walletAddress) public view returns (string[] memory) {
    require(bytes(users[_walletAddress].name).length > 0, 'No user exists for this wallet');
    return users[_walletAddress].badges;
  }
}
