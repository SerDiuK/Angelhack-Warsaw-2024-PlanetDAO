import { Contract, PopulatedTransaction } from 'ethers';
import { BrowserProvider, Eip1193Provider } from 'ethers/types/providers';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
    signerAddress: string;
    injectedWeb3: Web3;
  }
}
export {};
