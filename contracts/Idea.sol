// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import './Community.sol';
import './Goal.sol';

contract Idea {
  struct IdeaInfo {
    string name;
    string description;
    string image;
    address owner;
    uint donationsTarget;
    uint256 donationsReceived;
    uint256 createdAt;
    bool deleted;
    uint256 votesCount;
  }

  IdeaInfo idea;

  address payable goal;
  address community;

  mapping(address => bool) public votes;

  event Deleted(address indexed owner);
  event DonationReceived(address indexed donor, uint256 amount);
  event VotedIdea(address indexed voter);
  event UnvotedIdea(address indexed voter);

  modifier onlyOwner() {
    require(msg.sender == idea.owner, 'Not the owner');
    _;
  }

  modifier isActive() {
    require(idea.deleted == false, 'Idea has been deleted');
    _;
  }

  modifier onlyMember() {
    require(Community(community).members(msg.sender), 'Not a member of the community');
    _;
  }

  modifier hasVoted() {
    require(votes[msg.sender], 'User has not voted yet');
    _;
  }

  modifier hasNotVoted() {
    require(!votes[msg.sender], 'User has already voted');
    _;
  }

  constructor(string memory _name, string memory _description, string memory _image, uint256 _donationsTarget, address _owner, address payable _goal, address _community) {
    idea = IdeaInfo({name: _name, description: _description, image: _image, owner: _owner, donationsTarget: _donationsTarget, donationsReceived: 0, createdAt: block.timestamp, deleted: false, votesCount: 0});

    community = _community;
    goal = _goal;
  }

  function deleteIdea() public isActive onlyOwner {
    emit Deleted(msg.sender);
    idea.deleted = true;
  }

  function donate() public payable isActive {
    require(msg.value > 0, 'Donation must be greater than 0');

    idea.donationsReceived += msg.value;

    emit DonationReceived(msg.sender, msg.value);
  }

  function vote() public payable isActive onlyMember hasNotVoted {
    idea.votesCount += 1;
    votes[msg.sender] = true;

    emit VotedIdea(msg.sender);
  }

  function unVote() public payable isActive hasVoted {
    idea.votesCount -= 1;
    votes[msg.sender] = false;

    emit UnvotedIdea(msg.sender);
  }

  function viewIdea() public view returns (IdeaInfo memory) {
    return idea;
  }

  function getGoal() public view returns (address) {
    return goal;
  }

  function getCommunity() public view returns (address) {
    return community;
  }

  function isVoter() public view returns (bool) {
    return votes[msg.sender];
  }
}
