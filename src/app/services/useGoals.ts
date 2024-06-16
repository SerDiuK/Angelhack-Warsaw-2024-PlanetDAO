import { useContext } from 'react';
import { Community__factory, Goal__factory } from '../../../typechain-types';
import { Web3Context } from '../contexts/Web3Context';
import { MappedGoal } from '../model/mapped-goal';
import { goalMapper } from '../utils/goal-mapper';
import { ethers } from 'ethers';
import { MappedUser } from '../model/mapped-user';
import { useUserRegistry } from './useUserRegistry';
import { useIdeas } from './useIdeas';

export function useGoals() {
  const context = useContext(Web3Context);
  const { getUser } = useUserRegistry();
  const { fetchIdeas } = useIdeas();

  const fetchGoals = async (communityId: string): Promise<MappedGoal[]> => {
    if (context?.signer) {
      const community = await Community__factory.connect(communityId, context.signer);

      const goalAddresses = await community.getGoals();

      const goalDetailsPromises = goalAddresses.map(async (goalAddress: string) => {
        const goal = Goal__factory.connect(goalAddress, context.signer);
        const goalDetails = await goal.viewGoal();
        const isOwner = goalDetails.owner === context.account;
        const user = (await getUser(goalDetails.owner)) as MappedUser;
        const ideas = await fetchIdeas(goalAddress);

        return goalMapper(goalDetails, goalAddress, isOwner, user, ideas);
      });

      return await Promise.all(goalDetailsPromises);
    } else {
      return [];
    }
  };

  const fetchGoal = async (goalAddress: string) => {
    if (context?.signer) {
      const goal = await Goal__factory.connect(goalAddress, context.signer);

      const goalDetails = await goal.viewGoal();
      const isOwner = goalDetails.owner === context.account;
      const user = (await getUser(goalDetails.owner)) as MappedUser;
      const ideas = await fetchIdeas(goalAddress);

      return goalMapper(goalDetails, goalAddress, isOwner, user, ideas);
    }
  };

  const createGoal = async (name: string, description: string, image: string, communityAddress: string, target: number, endDate: string) => {
    if (context?.signer) {
      const community = await Community__factory.connect(communityAddress, context.signer);

      const tx = await community.createGoal(name, description, image, ethers.parseEther(target.toString()), endDate);
      await tx.wait();

      await fetchGoals(communityAddress);
    }
  };

  const deleteGoal = async (goalAddress: string) => {
    if (context?.signer) {
      const goal = await Goal__factory.connect(goalAddress, context.signer);

      const tx = await goal.deleteGoal();
      await tx.wait();
    }
  };

  return { fetchGoals, fetchGoal, createGoal, deleteGoal };
}
