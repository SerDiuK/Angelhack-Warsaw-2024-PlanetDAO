// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './Community.sol';

contract PlanetDAO {
  address[] public communities;

  event CommunityCreated(address communityAddress);

  function createCommunity(string memory _name, string memory _description, string memory _startDate, string memory _image, string memory _brandingColor, string memory _brandingLogo, uint256 _subscriptionPrice) public {
    Community community = new Community(_name, _description, _startDate, _image, _brandingColor, _brandingLogo, _subscriptionPrice, payable(msg.sender));

    communities.push(address(community));

    emit CommunityCreated(address(community));
  }

  function getCommunities() public view returns (address[] memory) {
    return communities;
  }
}
