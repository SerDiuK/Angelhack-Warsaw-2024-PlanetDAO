/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Community",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Community__factory>;
    getContractFactory(
      name: "Goal",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Goal__factory>;
    getContractFactory(
      name: "Idea",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Idea__factory>;
    getContractFactory(
      name: "PlanetDAO",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PlanetDAO__factory>;
    getContractFactory(
      name: "UserRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UserRegistry__factory>;

    getContractAt(
      name: "Community",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Community>;
    getContractAt(
      name: "Goal",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Goal>;
    getContractAt(
      name: "Idea",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Idea>;
    getContractAt(
      name: "PlanetDAO",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.PlanetDAO>;
    getContractAt(
      name: "UserRegistry",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.UserRegistry>;

    deployContract(
      name: "Community",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Community>;
    deployContract(
      name: "Goal",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Goal>;
    deployContract(
      name: "Idea",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Idea>;
    deployContract(
      name: "PlanetDAO",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PlanetDAO>;
    deployContract(
      name: "UserRegistry",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UserRegistry>;

    deployContract(
      name: "Community",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Community>;
    deployContract(
      name: "Goal",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Goal>;
    deployContract(
      name: "Idea",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Idea>;
    deployContract(
      name: "PlanetDAO",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PlanetDAO>;
    deployContract(
      name: "UserRegistry",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UserRegistry>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
