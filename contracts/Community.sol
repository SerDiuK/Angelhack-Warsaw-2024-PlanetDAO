// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './Goal.sol';

contract Community {
  struct CommunityInfo {
    string name;
    string description;
    string startDate;
    string image;
    string brandingColor;
    string brandingLogo;
    uint256 subscriptionPrice;
    address payable owner;
    uint256 createdAt;
    bool deleted;
    uint256 membersCount;
  }

  CommunityInfo community;

  mapping(address => bool) public members;
  address[] private membersList;

  address[] goals;

  event Joined(address indexed member);
  event Left(address indexed member);
  event Deleted(address indexed owner);
  event GoalCreated(address goalAddress);

  modifier onlyOwner() {
    require(msg.sender == community.owner, 'Not the owner');
    _;
  }

  modifier isActive() {
    require(community.deleted == false, 'Community has been deleted');
    _;
  }

  modifier onlyMembers() {
    require(members[msg.sender], 'Not a member');
    _;
  }

  modifier isNotMember() {
    require(!members[msg.sender], 'Already a member');
    _;
  }

  modifier isMemberOrOwner() {
    require(msg.sender == community.owner || members[msg.sender] == true, 'Must be either the owner or a member');
    _;
  }

  constructor(string memory _name, string memory _description, string memory _startDate, string memory _image, string memory _brandingColor, string memory _brandingLogo, uint256 _subscriptionPrice, address payable _owner) {
    community = CommunityInfo({name: _name, description: _description, startDate: _startDate, image: _image, brandingColor: _brandingColor, brandingLogo: _brandingLogo, subscriptionPrice: _subscriptionPrice, owner: _owner, createdAt: block.timestamp, deleted: false, membersCount: 0});
    members[_owner] = true;
    membersList.push(_owner);
  }

  function join() public payable isActive isNotMember {
    require(msg.value >= community.subscriptionPrice, 'Insufficient subscription price');

    members[msg.sender] = true;
    membersList.push(msg.sender);
    community.membersCount += 1;

    emit Joined(msg.sender);
  }

  function leave() public isActive onlyMembers {
    members[msg.sender] = false;
    community.membersCount -= 1;
    _removeMemberFromList(msg.sender);
    emit Left(msg.sender);
  }

  function deleteCommunity() public isActive onlyOwner {
    emit Deleted(msg.sender);
    community.owner.transfer(address(this).balance);
    community.deleted = true;
  }

  function createGoal(string memory _name, string memory _description, string memory _image, uint256 _target, string memory _endDate) public isActive isMemberOrOwner {
    Goal goal = new Goal(_name, _description, _image, address(msg.sender), address(this), _target, _endDate);

    goals.push(address(goal));

    emit GoalCreated(address(goal));
  }

  function _removeMemberFromList(address _member) internal {
    uint256 length = membersList.length;
    for (uint256 i = 0; i < length; i++) {
      if (membersList[i] == _member) {
        membersList[i] = membersList[length - 1];
        membersList.pop();
        break;
      }
    }
  }

  function viewCommunity() public view returns (CommunityInfo memory) {
    return community;
  }

  function getGoals() public view returns (address[] memory) {
    return goals;
  }

  function isMember() public view returns (bool) {
    return members[msg.sender];
  }

  function getMembers() public view returns (address[] memory) {
    return membersList;
  }
}
