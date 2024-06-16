import { useContext } from 'react';
import { Community__factory, PlanetDAO__factory } from '../../../typechain-types'; // Ensure this path matches your TypeChain generated types
import { Web3Context } from '../contexts/Web3Context';
import { MappedCommunity } from '../model/mapped-community';
import { communityMapper } from '../utils/community-mapper';
import { ethers } from 'ethers';
import { MappedMember } from '../model/mapped-member';
import { memberMapper } from '../utils/member-mapper';
import { useUserRegistry } from './useUserRegistry';
import { userMapper } from '../utils/user-mapper';
import { MappedUser } from '../model/mapped-user';

export function useCommunities() {
  const context = useContext(Web3Context);
  const { getUser } = useUserRegistry();

  const fetchCommunities = async (): Promise<MappedCommunity[]> => {
    if (context?.signer) {
      const planetDAO = await PlanetDAO__factory.connect(context.planetDAOAddress, context.signer);

      const communityAddresses = await planetDAO.getCommunities();

      const communityDetailsPromises = communityAddresses.map(async (address: string) => {
        const community = Community__factory.connect(address, context.signer);
        const communityDetails = await community.viewCommunity();
        const isMember = await community.isMember();
        const isOwner = communityDetails.owner === context.account;
        const user = (await getUser(communityDetails.owner)) as MappedUser;

        return communityMapper(communityDetails, address, isMember, isOwner, user);
      });

      const communities = await Promise.all(communityDetailsPromises);

      return communities;
    } else {
      return [];
    }
  };

  const fetchCommunityMembers = async (address: string): Promise<MappedMember[]> => {
    if (context?.signer) {
      const community = await Community__factory.connect(address, context.signer);
      const communityMemberAddresses = await community.getMembers();

      const communityMemberPromises = communityMemberAddresses.map(async (address: string) => {
        const user = (await getUser(address)) as MappedUser;

        return memberMapper(user, address);
      });

      const communityMembers = await Promise.all(communityMemberPromises);

      return communityMembers;
    } else {
      return [];
    }
  };

  const fetchJoinedCommunities = async () => {
    const communities = await fetchCommunities();

    return communities.filter((community) => community.isMember || community.isOwner);
  };

  const fetchCommunity = async (address: string): Promise<MappedCommunity | undefined> => {
    if (context?.signer) {
      const community = await Community__factory.connect(address, context.signer);

      const communityDetails = await community.viewCommunity();
      const isMember = await community.isMember();
      const isOwner = communityDetails.owner === context.account;
      const user = (await getUser(communityDetails.owner)) as MappedUser;

      return communityMapper(communityDetails, address, isMember, isOwner, user);
    }
  };

  const createCommunity = async (name: string, description: string, startDate: string, image: string, brandingColor: string, brandingLogo: string, subscriptionPrice: string) => {
    if (context?.signer) {
      const planetDAO = await PlanetDAO__factory.connect(context.planetDAOAddress, context.signer);

      const tx = await planetDAO.createCommunity(name, description, startDate, image, brandingColor, brandingLogo, ethers.parseEther(subscriptionPrice));
      await tx.wait();

      await fetchCommunities();
    }
  };

  const deleteCommunity = async (address: string) => {
    if (context?.signer) {
      const community = await Community__factory.connect(address, context.signer);

      const tx = await community.deleteCommunity();
      await tx.wait();

      await fetchCommunities();
    }
  };

  const joinCommunity = async (address: string, subscriptionPrice: string) => {
    if (context?.signer) {
      const community = await Community__factory.connect(address, context.signer);

      const tx = await community.join({ value: ethers.parseEther(subscriptionPrice) });
      await tx.wait();

      await fetchCommunities();
    }
  };

  const leaveCommunity = async (address: string) => {
    if (context?.signer) {
      const community = await Community__factory.connect(address, context.signer);

      const tx = await community.leave();
      await tx.wait();

      await fetchCommunities();
    }
  };

  return { fetchJoinedCommunities, fetchCommunities, fetchCommunity, createCommunity, joinCommunity, leaveCommunity, deleteCommunity, fetchCommunityMembers };
}
