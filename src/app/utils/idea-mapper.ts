import { ethers } from 'ethers';
import { Idea } from '../../../typechain-types';
import { MappedIdea } from '../model/mapped-idea';
import { MappedUser } from '../model/mapped-user';

export const ideaMapper = (ideaDetails: Idea.IdeaInfoStruct, address: string, isOwner: boolean, isVoter: boolean, owner: MappedUser): MappedIdea => ({
  address,
  name: ideaDetails.name,
  description: ideaDetails.description,
  image: ideaDetails.image,
  isOwner,
  owner,
  deleted: ideaDetails.deleted,
  donationsReceived: Number(ethers.formatUnits(ideaDetails.donationsReceived)),
  donationsTarget: Number(ethers.formatUnits(ideaDetails.donationsTarget)),
  votesCount: Number(ideaDetails.votesCount.toString()),
  isVoter
});
