/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace Idea {
  export type IdeaInfoStruct = {
    name: string;
    description: string;
    image: string;
    owner: AddressLike;
    donationsTarget: BigNumberish;
    donationsReceived: BigNumberish;
    createdAt: BigNumberish;
    deleted: boolean;
    votesCount: BigNumberish;
  };

  export type IdeaInfoStructOutput = [
    name: string,
    description: string,
    image: string,
    owner: string,
    donationsTarget: bigint,
    donationsReceived: bigint,
    createdAt: bigint,
    deleted: boolean,
    votesCount: bigint
  ] & {
    name: string;
    description: string;
    image: string;
    owner: string;
    donationsTarget: bigint;
    donationsReceived: bigint;
    createdAt: bigint;
    deleted: boolean;
    votesCount: bigint;
  };
}

export interface IdeaInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deleteIdea"
      | "donate"
      | "getCommunity"
      | "getGoal"
      | "isVoter"
      | "unVote"
      | "viewIdea"
      | "vote"
      | "votes"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Deleted"
      | "DonationReceived"
      | "UnvotedIdea"
      | "VotedIdea"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "deleteIdea",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "donate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCommunity",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getGoal", values?: undefined): string;
  encodeFunctionData(functionFragment: "isVoter", values?: undefined): string;
  encodeFunctionData(functionFragment: "unVote", values?: undefined): string;
  encodeFunctionData(functionFragment: "viewIdea", values?: undefined): string;
  encodeFunctionData(functionFragment: "vote", values?: undefined): string;
  encodeFunctionData(functionFragment: "votes", values: [AddressLike]): string;

  decodeFunctionResult(functionFragment: "deleteIdea", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "donate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCommunity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getGoal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isVoter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "viewIdea", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votes", data: BytesLike): Result;
}

export namespace DeletedEvent {
  export type InputTuple = [owner: AddressLike];
  export type OutputTuple = [owner: string];
  export interface OutputObject {
    owner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DonationReceivedEvent {
  export type InputTuple = [donor: AddressLike, amount: BigNumberish];
  export type OutputTuple = [donor: string, amount: bigint];
  export interface OutputObject {
    donor: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnvotedIdeaEvent {
  export type InputTuple = [voter: AddressLike];
  export type OutputTuple = [voter: string];
  export interface OutputObject {
    voter: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VotedIdeaEvent {
  export type InputTuple = [voter: AddressLike];
  export type OutputTuple = [voter: string];
  export interface OutputObject {
    voter: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Idea extends BaseContract {
  connect(runner?: ContractRunner | null): Idea;
  waitForDeployment(): Promise<this>;

  interface: IdeaInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  deleteIdea: TypedContractMethod<[], [void], "nonpayable">;

  donate: TypedContractMethod<[], [void], "payable">;

  getCommunity: TypedContractMethod<[], [string], "view">;

  getGoal: TypedContractMethod<[], [string], "view">;

  isVoter: TypedContractMethod<[], [boolean], "view">;

  unVote: TypedContractMethod<[], [void], "payable">;

  viewIdea: TypedContractMethod<[], [Idea.IdeaInfoStructOutput], "view">;

  vote: TypedContractMethod<[], [void], "payable">;

  votes: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deleteIdea"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "donate"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "getCommunity"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getGoal"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "isVoter"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "unVote"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "viewIdea"
  ): TypedContractMethod<[], [Idea.IdeaInfoStructOutput], "view">;
  getFunction(
    nameOrSignature: "vote"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "votes"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  getEvent(
    key: "Deleted"
  ): TypedContractEvent<
    DeletedEvent.InputTuple,
    DeletedEvent.OutputTuple,
    DeletedEvent.OutputObject
  >;
  getEvent(
    key: "DonationReceived"
  ): TypedContractEvent<
    DonationReceivedEvent.InputTuple,
    DonationReceivedEvent.OutputTuple,
    DonationReceivedEvent.OutputObject
  >;
  getEvent(
    key: "UnvotedIdea"
  ): TypedContractEvent<
    UnvotedIdeaEvent.InputTuple,
    UnvotedIdeaEvent.OutputTuple,
    UnvotedIdeaEvent.OutputObject
  >;
  getEvent(
    key: "VotedIdea"
  ): TypedContractEvent<
    VotedIdeaEvent.InputTuple,
    VotedIdeaEvent.OutputTuple,
    VotedIdeaEvent.OutputObject
  >;

  filters: {
    "Deleted(address)": TypedContractEvent<
      DeletedEvent.InputTuple,
      DeletedEvent.OutputTuple,
      DeletedEvent.OutputObject
    >;
    Deleted: TypedContractEvent<
      DeletedEvent.InputTuple,
      DeletedEvent.OutputTuple,
      DeletedEvent.OutputObject
    >;

    "DonationReceived(address,uint256)": TypedContractEvent<
      DonationReceivedEvent.InputTuple,
      DonationReceivedEvent.OutputTuple,
      DonationReceivedEvent.OutputObject
    >;
    DonationReceived: TypedContractEvent<
      DonationReceivedEvent.InputTuple,
      DonationReceivedEvent.OutputTuple,
      DonationReceivedEvent.OutputObject
    >;

    "UnvotedIdea(address)": TypedContractEvent<
      UnvotedIdeaEvent.InputTuple,
      UnvotedIdeaEvent.OutputTuple,
      UnvotedIdeaEvent.OutputObject
    >;
    UnvotedIdea: TypedContractEvent<
      UnvotedIdeaEvent.InputTuple,
      UnvotedIdeaEvent.OutputTuple,
      UnvotedIdeaEvent.OutputObject
    >;

    "VotedIdea(address)": TypedContractEvent<
      VotedIdeaEvent.InputTuple,
      VotedIdeaEvent.OutputTuple,
      VotedIdeaEvent.OutputObject
    >;
    VotedIdea: TypedContractEvent<
      VotedIdeaEvent.InputTuple,
      VotedIdeaEvent.OutputTuple,
      VotedIdeaEvent.OutputObject
    >;
  };
}
