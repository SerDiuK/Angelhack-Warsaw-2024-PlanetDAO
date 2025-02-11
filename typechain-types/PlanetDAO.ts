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

export interface PlanetDAOInterface extends Interface {
  getFunction(
    nameOrSignature: "communities" | "createCommunity" | "getCommunities"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "CommunityCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "communities",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createCommunity",
    values: [string, string, string, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCommunities",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "communities",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCommunity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCommunities",
    data: BytesLike
  ): Result;
}

export namespace CommunityCreatedEvent {
  export type InputTuple = [communityAddress: AddressLike];
  export type OutputTuple = [communityAddress: string];
  export interface OutputObject {
    communityAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PlanetDAO extends BaseContract {
  connect(runner?: ContractRunner | null): PlanetDAO;
  waitForDeployment(): Promise<this>;

  interface: PlanetDAOInterface;

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

  communities: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  createCommunity: TypedContractMethod<
    [
      _name: string,
      _description: string,
      _startDate: string,
      _image: string,
      _brandingColor: string,
      _brandingLogo: string,
      _subscriptionPrice: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  getCommunities: TypedContractMethod<[], [string[]], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "communities"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "createCommunity"
  ): TypedContractMethod<
    [
      _name: string,
      _description: string,
      _startDate: string,
      _image: string,
      _brandingColor: string,
      _brandingLogo: string,
      _subscriptionPrice: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getCommunities"
  ): TypedContractMethod<[], [string[]], "view">;

  getEvent(
    key: "CommunityCreated"
  ): TypedContractEvent<
    CommunityCreatedEvent.InputTuple,
    CommunityCreatedEvent.OutputTuple,
    CommunityCreatedEvent.OutputObject
  >;

  filters: {
    "CommunityCreated(address)": TypedContractEvent<
      CommunityCreatedEvent.InputTuple,
      CommunityCreatedEvent.OutputTuple,
      CommunityCreatedEvent.OutputObject
    >;
    CommunityCreated: TypedContractEvent<
      CommunityCreatedEvent.InputTuple,
      CommunityCreatedEvent.OutputTuple,
      CommunityCreatedEvent.OutputObject
    >;
  };
}
