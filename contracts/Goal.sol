// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './Idea.sol';
import './Community.sol';

struct GoalInfo {
  string name;
  string description;
  string image;
  string endDate;
  address owner;
  uint256 createdAt;
  uint256 target;
  uint256 reached;
  bool deleted;
}

contract Goal {
  GoalInfo public goal;

  address community;

  address[] ideas;

  event Deleted(address indexed owner);
  event IdeaCreated(address goalAddress);

  modifier onlyOwner() {
    require(msg.sender == goal.owner, 'Not the owner');
    _;
  }

  modifier isMemberOrOwner() {
    require(msg.sender == goal.owner || Community(community).members(msg.sender), 'Must be either the owner or a member');
    _;
  }

  modifier isActive() {
    require(goal.deleted == false, 'Goal has been deleted');
    _;
  }

  constructor(string memory _name, string memory _description, string memory _image, address _owner, address _community, uint256 _target, string memory _endDate) {
    goal = GoalInfo({name: _name, description: _description, image: _image, owner: _owner, createdAt: block.timestamp, deleted: false, target: _target, reached: 0, endDate: _endDate});

    community = _community;
  }

  function deleteGoal() public isActive onlyOwner {
    emit Deleted(msg.sender);
    goal.deleted = true;
  }

  function createIdea(string memory _name, string memory _description, string memory _image, uint256 _donationsTarget) public isActive isMemberOrOwner {
    Idea idea = new Idea(_name, _description, _image, _donationsTarget, address(msg.sender), payable(address(this)), community);

    ideas.push(address(idea));

    emit IdeaCreated(address(idea));
  }

  function viewGoal() public view returns (GoalInfo memory) {
    return goal;
  }

  function getIdeas() public view returns (address[] memory) {
    return ideas;
  }

  function getCommunity() public view returns (address) {
    return community;
  }
}
