import { useContext } from 'react';
import { Goal__factory, Idea__factory } from '../../../typechain-types';
import { Web3Context } from '../contexts/Web3Context';
import { MappedIdea } from '../model/mapped-idea';
import { ideaMapper } from '../utils/idea-mapper';
import { ethers } from 'ethers';
import { useUserRegistry } from './useUserRegistry';
import { MappedUser } from '../model/mapped-user';

export function useIdeas() {
  const context = useContext(Web3Context);
  const { getUser } = useUserRegistry();

  const fetchIdeas = async (goalAddress: string): Promise<MappedIdea[]> => {
    if (context?.signer) {
      const goals = await Goal__factory.connect(goalAddress, context.signer);

      const ideaAddresses = await goals.getIdeas();

      const ideaDetailsPromises = ideaAddresses.map(async (address: string) => {
        const idea = Idea__factory.connect(address, context.signer);
        const ideaDetails = await idea.viewIdea();
        const isOwner = ideaDetails.owner === context.account;
        const isVoter = await idea.isVoter();
        const user = (await getUser(ideaDetails.owner)) as MappedUser;

        return ideaMapper(ideaDetails, address, isOwner, isVoter, user);
      });

      return await Promise.all(ideaDetailsPromises);
    } else {
      return [];
    }
  };

  const fetchIdea = async (ideaAddress: string) => {
    if (context?.signer) {
      const idea = await Idea__factory.connect(ideaAddress, context.signer);

      const ideaDetails = await idea.viewIdea();
      const isOwner = ideaDetails.owner === context.account;
      const isVoter = await idea.isVoter();

      const user = (await getUser(ideaDetails.owner)) as MappedUser;

      return ideaMapper(ideaDetails, ideaAddress, isOwner, isVoter, user);
    }
  };

  const createIdea = async (name: string, description: string, image: string, goalAddress: string, donationsTarget: number) => {
    if (context?.signer) {
      const goal = await Goal__factory.connect(goalAddress, context.signer);

      const tx = await goal.createIdea(name, description, image, donationsTarget);
      await tx.wait();

      await fetchIdeas(goalAddress);
    }
  };

  const deleteIdea = async (ideaAddress: string) => {
    if (context?.signer) {
      const idea = await Idea__factory.connect(ideaAddress, context.signer);

      const tx = await idea.deleteIdea();
      await tx.wait();
    }
  };

  const donate = async (ideaAddress: string, donation: string) => {
    if (context?.signer) {
      const idea = Idea__factory.connect(ideaAddress, context.signer);

      const tx = await idea.donate({
        value: ethers.parseEther(donation.toString())
      });

      await tx.wait();
    }
  };

  const vote = async (ideaAddress: string) => {
    if (context?.signer) {
      const idea = Idea__factory.connect(ideaAddress, context.signer);

      const tx = await idea.vote();

      await tx.wait();
    }
  };

  const unVote = async (ideaAddress: string) => {
    if (context?.signer) {
      const idea = Idea__factory.connect(ideaAddress, context.signer);

      const tx = await idea.unVote();

      await tx.wait();
    }
  };

  return { fetchIdeas, fetchIdea, createIdea, deleteIdea, donate, vote, unVote };
}
