import { createContext, useState, ReactNode } from 'react';
import { ethers, Signer } from 'ethers';
import { useUserRegistry } from '../services/useUserRegistry';
import { useUser } from '@auth0/nextjs-auth0/client';

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: Signer | null;
  account: string | null;
  connectMetamask: Function;
  planetDAOAddress: string;
  userRegistryAddress: string;
  balance: string | null;
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const planetDAOAddress = process.env.NEXT_PUBLIC_CONTRACT as string;
  const userRegistryAddress = process.env.NEXT_PUBLIC_USER_CONTRACT as string;

  const connectMetamask = async () => {
    if (!window.ethereum) {
      console.log('Please install MetaMask!');
      return;
    }

    const initWeb3 = async () => {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      const web3Signer = await web3Provider.getSigner();
      setSigner(web3Signer);

      const userAccount = await web3Signer.getAddress();
      setAccount(userAccount);

      const userBalance = await web3Provider.getBalance(userAccount);
      setBalance(Number(ethers.formatEther(userBalance)).toFixed(3));
    };

    await window.ethereum.request({ method: 'eth_requestAccounts' });

    await initWeb3();
  };

  return <Web3Context.Provider value={{ provider, signer, account, connectMetamask, planetDAOAddress, userRegistryAddress, balance }}>{children}</Web3Context.Provider>;
}
