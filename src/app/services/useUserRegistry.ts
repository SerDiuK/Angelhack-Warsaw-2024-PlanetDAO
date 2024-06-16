import { useContext } from 'react';
import { UserRegistry__factory } from '../../../typechain-types'; // Ensure this path matches your TypeChain generated types
import { Web3Context } from '../contexts/Web3Context';
import { userMapper } from '../utils/user-mapper';
import { MappedUser } from '../model/mapped-user';
import { useUser } from '@auth0/nextjs-auth0/client';

export function useUserRegistry() {
  const context = useContext(Web3Context);
  const { user } = useUser();

  const getUser = async (accountAddress: string): Promise<MappedUser | null> => {
    if (context?.signer) {
      try {
        const userRegistry = await UserRegistry__factory.connect(context.userRegistryAddress, context.signer);
        const user = await userRegistry.getUser(accountAddress);

        return userMapper(user, accountAddress);
      } catch (error) {
        if (user) {
          await registerUser(user?.name as string, user?.picture as string);
        }
        return null;
      }
    } else {
      return null;
    }
  };

  const getBadges = async (accountAddress: string): Promise<string[]> => {
    if (context?.signer) {
      const userRegistry = await UserRegistry__factory.connect(context.userRegistryAddress, context.signer);
      return await userRegistry.getBadges(accountAddress);
    } else {
      return [];
    }
  };

  const registerUser = async (name: string, profileUrl: string): Promise<void> => {
    if (context?.signer) {
      try {
        const userRegistry = await UserRegistry__factory.connect(context.userRegistryAddress, context.signer);
        const tx = await userRegistry.registerUser(name, profileUrl);

        await tx.wait();
        window.location.reload();
      } catch (error) {
        console.log('Registration error?', error);
      }
    }
  };

  return { registerUser, getUser, getBadges };
}
