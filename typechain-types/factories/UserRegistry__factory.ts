/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { UserRegistry, UserRegistryInterface } from "../UserRegistry";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "string",
        name: "_badge",
        type: "string",
      },
    ],
    name: "addBadge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_walletAddress",
        type: "address",
      },
    ],
    name: "getBadges",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_walletAddress",
        type: "address",
      },
    ],
    name: "getUser",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "badges",
            type: "string[]",
          },
        ],
        internalType: "struct UserRegistry.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "address",
        name: "_wallet",
        type: "address",
      },
    ],
    name: "registerUserToWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50610d8e8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806303828e45146100675780631d2e4afd1461009057806362a251cc146100a55780636f77926b146100b8578063a87430ba146100d8578063b0779d11146100f9575b600080fd5b61007a61007536600461082b565b61010c565b6040516100879190610893565b60405180910390f35b6100a361009e36600461099d565b610273565b005b6100a36100b3366004610a06565b6102fd565b6100cb6100c636600461082b565b610391565b6040516100879190610a7f565b6100eb6100e636600461082b565b61064c565b604051610087929190610b25565b6100a3610107366004610b53565b610778565b6001600160a01b03811660009081526020819052604081208054606092919061013490610b8b565b9050116101885760405162461bcd60e51b815260206004820152601e60248201527f4e6f20757365722065786973747320666f7220746869732077616c6c6574000060448201526064015b60405180910390fd5b6001600160a01b03821660009081526020818152604080832060020180548251818502810185019093528083529193909284015b828210156102685783829060005260206000200180546101db90610b8b565b80601f016020809104026020016040519081016040528092919081815260200182805461020790610b8b565b80156102545780601f1061022957610100808354040283529160200191610254565b820191906000526020600020905b81548152906001019060200180831161023757829003601f168201915b5050505050815260200190600101906101bc565b505050509050919050565b336000908152602081905260409020805461028d90610b8b565b1590506102ac5760405162461bcd60e51b815260040161017f90610bc5565b6003825110156102ce5760405162461bcd60e51b815260040161017f90610c0b565b336000908152602081905260409020806102e88482610c99565b50600181016102f78382610c99565b50505050565b336000908152602081905260409020805461031790610b8b565b1590506103365760405162461bcd60e51b815260040161017f90610bc5565b6003835110156103585760405162461bcd60e51b815260040161017f90610c0b565b6001600160a01b03811660009081526020819052604090208061037b8582610c99565b506001810161038a8482610c99565b5050505050565b6103b560405180606001604052806060815260200160608152602001606081525090565b6001600160a01b038216600090815260208190526040812080546103d890610b8b565b9050116104275760405162461bcd60e51b815260206004820152601e60248201527f4e6f20757365722065786973747320666f7220746869732077616c6c65740000604482015260640161017f565b6001600160a01b0382166000908152602081905260409081902081516060810190925280548290829061045990610b8b565b80601f016020809104026020016040519081016040528092919081815260200182805461048590610b8b565b80156104d25780601f106104a7576101008083540402835291602001916104d2565b820191906000526020600020905b8154815290600101906020018083116104b557829003601f168201915b505050505081526020016001820180546104eb90610b8b565b80601f016020809104026020016040519081016040528092919081815260200182805461051790610b8b565b80156105645780601f1061053957610100808354040283529160200191610564565b820191906000526020600020905b81548152906001019060200180831161054757829003601f168201915b5050505050815260200160028201805480602002602001604051908101604052809291908181526020016000905b8282101561063e5783829060005260206000200180546105b190610b8b565b80601f01602080910402602001604051908101604052809291908181526020018280546105dd90610b8b565b801561062a5780601f106105ff5761010080835404028352916020019161062a565b820191906000526020600020905b81548152906001019060200180831161060d57829003601f168201915b505050505081526020019060010190610592565b505050915250909392505050565b60006020819052908152604090208054819061066790610b8b565b80601f016020809104026020016040519081016040528092919081815260200182805461069390610b8b565b80156106e05780601f106106b5576101008083540402835291602001916106e0565b820191906000526020600020905b8154815290600101906020018083116106c357829003601f168201915b5050505050908060010180546106f590610b8b565b80601f016020809104026020016040519081016040528092919081815260200182805461072190610b8b565b801561076e5780601f106107435761010080835404028352916020019161076e565b820191906000526020600020905b81548152906001019060200180831161075157829003601f168201915b5050505050905082565b336000908152602081905260408120805461079290610b8b565b9050116107d75760405162461bcd60e51b8152602060048201526013602482015272155cd95c881b9bdd081c9959da5cdd195c9959606a1b604482015260640161017f565b6001600160a01b0382166000908152602081815260408220600201805460018101825590835291200161080a8282610c99565b505050565b80356001600160a01b038116811461082657600080fd5b919050565b60006020828403121561083d57600080fd5b6108468261080f565b9392505050565b6000815180845260005b8181101561087357602081850181015186830182015201610857565b506000602082860101526020601f19601f83011685010191505092915050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b828110156108ec57603f198786030184526108d785835161084d565b945060209384019391909101906001016108bb565b50929695505050505050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261091f57600080fd5b813567ffffffffffffffff811115610939576109396108f8565b604051601f8201601f19908116603f0116810167ffffffffffffffff81118282101715610968576109686108f8565b60405281815283820160200185101561098057600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156109b057600080fd5b823567ffffffffffffffff8111156109c757600080fd5b6109d38582860161090e565b925050602083013567ffffffffffffffff8111156109f057600080fd5b6109fc8582860161090e565b9150509250929050565b600080600060608486031215610a1b57600080fd5b833567ffffffffffffffff811115610a3257600080fd5b610a3e8682870161090e565b935050602084013567ffffffffffffffff811115610a5b57600080fd5b610a678682870161090e565b925050610a766040850161080f565b90509250925092565b602081526000825160606020840152610a9b608084018261084d565b90506020840151601f19848303016040850152610ab8828261084d565b6040860151858203601f190160608701528051808352919350602090810192508084019190600582901b85010160005b82811015610b1957601f19868303018452610b0482865161084d565b60209586019594909401939150600101610ae8565b50979650505050505050565b604081526000610b38604083018561084d565b8281036020840152610b4a818561084d565b95945050505050565b60008060408385031215610b6657600080fd5b610b6f8361080f565b9150602083013567ffffffffffffffff8111156109f057600080fd5b600181811c90821680610b9f57607f821691505b602082108103610bbf57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526026908201527f5573657220616c7265616479207265676973746572656420746f2074686973206040820152651dd85b1b195d60d21b606082015260800190565b60208082526027908201527f4e616d65206d757374206265206174206c6561737420332063686172616374656040820152667273206c6f6e6760c81b606082015260800190565b601f82111561080a57806000526020600020601f840160051c81016020851015610c795750805b601f840160051c820191505b8181101561038a5760008155600101610c85565b815167ffffffffffffffff811115610cb357610cb36108f8565b610cc781610cc18454610b8b565b84610c52565b6020601f821160018114610cfb5760008315610ce35750848201515b600019600385901b1c1916600184901b17845561038a565b600084815260208120601f198516915b82811015610d2b5787850151825560209485019460019092019101610d0b565b5084821015610d495786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220d5ad8d38640e20d90e27e408c4a08f28a3767c4fb0196a39745c7d853af5fc5564736f6c634300081a0033";

type UserRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UserRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UserRegistry__factory extends ContractFactory {
  constructor(...args: UserRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      UserRegistry & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): UserRegistry__factory {
    return super.connect(runner) as UserRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UserRegistryInterface {
    return new Interface(_abi) as UserRegistryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): UserRegistry {
    return new Contract(address, _abi, runner) as unknown as UserRegistry;
  }
}
