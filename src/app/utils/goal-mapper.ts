import { ethers } from 'ethers';
import { Goal } from '../../../typechain-types';
import { MappedGoal } from '../model/mapped-goal';
import { MappedUser } from '../model/mapped-user';
import { MappedIdea } from '../model/mapped-idea';

export const goalMapper = (goalDetails: any, address: string, isOwner: boolean, owner: MappedUser, ideas: MappedIdea[]): MappedGoal => ({
  address,
  name: goalDetails.name,
  description: goalDetails.description,
  image: goalDetails.image,
  isOwner,
  owner,
  // deleted: goalDetails.deleted,
  deleted: false,
  target: Number(ethers.formatUnits(goalDetails.target)),
  reached: ideas.reduce((acc, idea) => (acc += idea.donationsReceived), 0),
  endDate: goalDetails.endDate,
  ideasNumber: ideas.length
});
