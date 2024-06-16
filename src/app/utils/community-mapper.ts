import { ethers } from 'ethers';
import { Community } from '../../../typechain-types';
import { MappedCommunity } from '../model/mapped-community';
import { MappedUser } from '../model/mapped-user';

export const communityMapper = (communityDetails: Community.CommunityInfoStruct, address: string, isMember: boolean, isOwner: boolean, owner: MappedUser): MappedCommunity => ({
  address,
  name: communityDetails.name,
  description: communityDetails.description,
  subscriptionPrice: Number(ethers.formatUnits(communityDetails.subscriptionPrice)),
  image: communityDetails.image,
  startDate: communityDetails.startDate,
  isOwner,
  isMember,
  owner,
  membersCount: Number(communityDetails.membersCount.toString()),
  deleted: communityDetails.deleted,
  brandingColor: communityDetails.brandingColor,
  brandingLogo: communityDetails.brandingColor
});
