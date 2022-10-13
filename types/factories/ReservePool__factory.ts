/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ReservePool, ReservePoolInterface } from "../ReservePool";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Recovered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "LTV",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNeededCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stableCredit",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sourceAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_swapRouter",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minLTV",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "operatorBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "operatorPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolFee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "recoverERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "credits",
        type: "uint256",
      },
    ],
    name: "reimburseMember",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minLTV",
        type: "uint256",
      },
    ],
    name: "setMinLTV",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_operatorPercent",
        type: "uint256",
      },
    ],
    name: "setOperatorPercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint24",
        name: "_poolFee",
        type: "uint24",
      },
    ],
    name: "setPoolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sourceAddress",
        type: "address",
      },
    ],
    name: "setSource",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stableCredit",
    outputs: [
      {
        internalType: "contract IStableCredit",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract ISwapRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapSink",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapSinkPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061364d806100206000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80638da5cb5b116100de578063c31c9c0711610097578063e61ef44d11610071578063e61ef44d146103c8578063ebdac090146103e6578063f2fde38b14610402578063fcdd8aac1461041e57610173565b8063c31c9c0714610370578063d8dfeb451461038e578063d8e09035146103ac57610173565b80638da5cb5b146102c457806391df222e146102e2578063a802691214610300578063b699ea381461031c578063bad4a01f14610338578063c0c53b8b1461035457610173565b806362965d8e1161013057806362965d8e1461022a578063715018a61461024857806373dd250c146102525780637b4044a01461026e5780637d85d8ff1461028c5780638980f11f146102a857610173565b8063047ba40d14610178578063089fe6aa146101965780631e404440146101b4578063262a1647146101d257806349a6b1db146101f05780635c975abb1461020c575b600080fd5b61018061043c565b60405161018d919061268b565b60405180910390f35b61019e610462565b6040516101ab91906126c4565b60405180910390f35b6101bc610477565b6040516101c991906126f8565b60405180910390f35b6101da610614565b6040516101e791906126f8565b60405180910390f35b61020a60048036038101906102059190612744565b61061a565b005b610214610905565b604051610221919061278c565b60405180910390f35b61023261091c565b60405161023f91906126f8565b60405180910390f35b610250610aa3565b005b61026c600480360381019061026791906127d3565b610b2b565b005b610276610bc9565b60405161028391906126f8565b60405180910390f35b6102a660048036038101906102a19190612744565b610bcf565b005b6102c260048036038101906102bd919061283e565b610d4c565b005b6102cc610e30565b6040516102d9919061288d565b60405180910390f35b6102ea610e5a565b6040516102f791906126f8565b60405180910390f35b61031a600480360381019061031591906128a8565b610e60565b005b61033660048036038101906103319190612744565b610f20565b005b610352600480360381019061034d9190612744565b6110b8565b005b61036e600480360381019061036991906128d5565b611239565b005b610378611593565b6040516103859190612949565b60405180910390f35b6103966115b9565b6040516103a391906126f8565b60405180910390f35b6103c660048036038101906103c1919061283e565b6115bf565b005b6103d0611945565b6040516103dd91906126f8565b60405180910390f35b61040060048036038101906103fb9190612744565b61194b565b005b61041c600480360381019061041791906128a8565b611b93565b005b610426611c8b565b60405161043391906126f8565b60405180910390f35b60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60cb60149054906101000a900462ffffff1681565b60008061048261091c565b905060d1548110610497576000915050610611565b620f424063ffffffff1660ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a08ed36a60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561054757600080fd5b505afa15801561055b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057f9190612979565b6040518263ffffffff1660e01b815260040161059b91906126f8565b60206040518083038186803b1580156105b357600080fd5b505afa1580156105c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105eb9190612979565b8260d1546105f991906129d5565b6106039190612a09565b61060d9190612a92565b9150505b90565b60d15481565b60026097541415610660576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065790612b20565b60405180910390fd5b600260978190555060ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fe9fbb80336040518263ffffffff1660e01b81526004016106c3919061288d565b60206040518083038186803b1580156106db57600080fd5b505afa1580156106ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107139190612b6c565b806107505750610721610e30565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b61078f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078690612be5565b60405180910390fd5b600081116107d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c990612c51565b60405180910390fd5b60ce54811115610817576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080e90612ce3565b60405180910390fd5b8060ce600082825461082991906129d5565b925050819055506108fa338260ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b15801561089d57600080fd5b505afa1580156108b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d59190612d18565b73ffffffffffffffffffffffffffffffffffffffff16611c919092919063ffffffff16565b600160978190555050565b6000606560009054906101000a900460ff16905090565b60008060cc5414156109325760cc549050610aa0565b60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a08ed36a60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156109d857600080fd5b505afa1580156109ec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a109190612979565b6040518263ffffffff1660e01b8152600401610a2c91906126f8565b60206040518083038186803b158015610a4457600080fd5b505afa158015610a58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7c9190612979565b620f424063ffffffff1660cc54610a939190612a09565b610a9d9190612a92565b90505b90565b610aab611d17565b73ffffffffffffffffffffffffffffffffffffffff16610ac9610e30565b73ffffffffffffffffffffffffffffffffffffffff1614610b1f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1690612d91565b60405180910390fd5b610b296000611d1f565b565b610b33611d17565b73ffffffffffffffffffffffffffffffffffffffff16610b51610e30565b73ffffffffffffffffffffffffffffffffffffffff1614610ba7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9e90612d91565b60405180910390fd5b8060cb60146101000a81548162ffffff021916908362ffffff16021790555050565b60cf5481565b60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fe9fbb80336040518263ffffffff1660e01b8152600401610c2a919061288d565b60206040518083038186803b158015610c4257600080fd5b505afa158015610c56573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7a9190612b6c565b80610cb75750610c88610e30565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610cf6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ced90612be5565b60405180910390fd5b620f424063ffffffff16811115610d42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3990612e23565b60405180910390fd5b8060d18190555050565b610d54611d17565b73ffffffffffffffffffffffffffffffffffffffff16610d72610e30565b73ffffffffffffffffffffffffffffffffffffffff1614610dc8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dbf90612d91565b60405180910390fd5b610df333828473ffffffffffffffffffffffffffffffffffffffff16611c919092919063ffffffff16565b7f8c1256b8896378cd5044f80c202f9772b9d77dc85c8a6eb51967210b09bfaa288282604051610e24929190612e43565b60405180910390a15050565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60d05481565b610e68611d17565b73ffffffffffffffffffffffffffffffffffffffff16610e86610e30565b73ffffffffffffffffffffffffffffffffffffffff1614610edc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed390612d91565b60405180910390fd5b8060cb60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fe9fbb80336040518263ffffffff1660e01b8152600401610f7b919061288d565b60206040518083038186803b158015610f9357600080fd5b505afa158015610fa7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fcb9190612b6c565b806110085750610fd9610e30565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b611047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161103e90612be5565b60405180910390fd5b620f424063ffffffff16811115611093576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108a90612ede565b60405180910390fd5b8060cf8190555080620f424063ffffffff166110af91906129d5565b60d08190555050565b600260975414156110fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110f590612b20565b60405180910390fd5b600260978190555060008111611149576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161114090612f4a565b60405180910390fd5b8060cc600082825461115b9190612f6a565b9250508190555061122e33308360ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b1580156111d057600080fd5b505afa1580156111e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112089190612d18565b73ffffffffffffffffffffffffffffffffffffffff16611de5909392919063ffffffff16565b600160978190555050565b600060019054906101000a900460ff166112615760008054906101000a900460ff161561126a565b611269611e6e565b5b6112a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112a090613032565b60405180910390fd5b60008060019054906101000a900460ff1615905080156112f9576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b611301611e7f565b611309611ed8565b611311611f31565b611319611f8a565b8360ca60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160c960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610bb860cb60146101000a81548162ffffff021916908362ffffff1602179055508260cb60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b15801561146557600080fd5b505afa158015611479573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061149d9190612d18565b73ffffffffffffffffffffffffffffffffffffffff1663095ea7b360c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6040518363ffffffff1660e01b8152600401611519929190612e43565b602060405180830381600087803b15801561153357600080fd5b505af1158015611547573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061156b9190612b6c565b50801561158d5760008060016101000a81548160ff0219169083151502179055505b50505050565b60c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60cc5481565b60ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663fe9fbb80336040518263ffffffff1660e01b815260040161161a919061288d565b60206040518083038186803b15801561163257600080fd5b505afa158015611646573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061166a9190612b6c565b806116a75750611678610e30565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b6116e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116dd90612be5565b60405180910390fd5b6002609754141561172c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161172390612b20565b60405180910390fd5b6002609781905550600060cc54141561174457611939565b600060ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b1580156117ae57600080fd5b505afa1580156117c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117e69190612d18565b905060cc5482101561189e578160cc600082825461180491906129d5565b925050819055508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84846040518363ffffffff1660e01b8152600401611846929190612e43565b602060405180830381600087803b15801561186057600080fd5b505af1158015611874573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118989190612b6c565b50611937565b8073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8460cc546040518363ffffffff1660e01b81526004016118db929190612e43565b602060405180830381600087803b1580156118f557600080fd5b505af1158015611909573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061192d9190612b6c565b50600060cc819055505b505b60016097819055505050565b60cd5481565b60026097541415611991576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161198890612b20565b60405180910390fd5b6002609781905550600081116119dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119d39061309e565b60405180910390fd5b611aa833308360ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b158015611a4a57600080fd5b505afa158015611a5e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a829190612d18565b73ffffffffffffffffffffffffffffffffffffffff16611de5909392919063ffffffff16565b6000611ab2610477565b905081811115611adb578160cc6000828254611ace9190612f6a565b9250508190555050611b88565b8060cc6000828254611aed9190612f6a565b92505081905550611b29620f424063ffffffff168284611b0d91906129d5565b60d054611b1a9190612a09565b611b249190612a92565b61202d565b60cd6000828254611b3a9190612f6a565b92505081905550620f424063ffffffff168183611b5791906129d5565b60cf54611b649190612a09565b611b6e9190612a92565b60ce6000828254611b7f9190612f6a565b92505081905550505b600160978190555050565b611b9b611d17565b73ffffffffffffffffffffffffffffffffffffffff16611bb9610e30565b73ffffffffffffffffffffffffffffffffffffffff1614611c0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c0690612d91565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611c7f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c7690613130565b60405180910390fd5b611c8881611d1f565b50565b60ce5481565b611d128363a9059cbb60e01b8484604051602401611cb0929190612e43565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050612269565b505050565b600033905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b611e68846323b872dd60e01b858585604051602401611e0693929190613150565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050612269565b50505050565b6000611e7930612330565b15905090565b600060019054906101000a900460ff16611ece576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ec5906131f9565b60405180910390fd5b611ed6612353565b565b600060019054906101000a900460ff16611f27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f1e906131f9565b60405180910390fd5b611f2f6123ac565b565b600060019054906101000a900460ff16611f80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f77906131f9565b60405180910390fd5b611f88612418565b565b611f92610905565b15611fd2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fc990613265565b60405180910390fd5b6001606560006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258612016611d17565b604051612023919061288d565b60405180910390a1565b6000612037610905565b1561204457819050612264565b600060405180610100016040528060ca60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b1580156120ba57600080fd5b505afa1580156120ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120f29190612d18565b73ffffffffffffffffffffffffffffffffffffffff16815260200160cb60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160cb60149054906101000a900462ffffff1662ffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff16815260200142815260200184815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815250905060c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663414bf389826040518263ffffffff1660e01b815260040161220e9190613363565b602060405180830381600087803b15801561222857600080fd5b505af115801561223c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122609190612979565b9150505b919050565b60006122cb826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166124799092919063ffffffff16565b905060008151111561232b57808060200190518101906122eb9190612b6c565b61232a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612321906133f1565b60405180910390fd5b5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff166123a2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612399906131f9565b60405180910390fd5b6001609781905550565b600060019054906101000a900460ff166123fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123f2906131f9565b60405180910390fd5b6000606560006101000a81548160ff021916908315150217905550565b600060019054906101000a900460ff16612467576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161245e906131f9565b60405180910390fd5b612477612472611d17565b611d1f565b565b60606124888484600085612491565b90509392505050565b6060824710156124d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124cd90613483565b60405180910390fd5b6124df85612330565b61251e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612515906134ef565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516125479190613589565b60006040518083038185875af1925050503d8060008114612584576040519150601f19603f3d011682016040523d82523d6000602084013e612589565b606091505b50915091506125998282866125a5565b92505050949350505050565b606083156125b557829050612605565b6000835111156125c85782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125fc91906135f5565b60405180910390fd5b9392505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061265161264c6126478461260c565b61262c565b61260c565b9050919050565b600061266382612636565b9050919050565b600061267582612658565b9050919050565b6126858161266a565b82525050565b60006020820190506126a0600083018461267c565b92915050565b600062ffffff82169050919050565b6126be816126a6565b82525050565b60006020820190506126d960008301846126b5565b92915050565b6000819050919050565b6126f2816126df565b82525050565b600060208201905061270d60008301846126e9565b92915050565b600080fd5b612721816126df565b811461272c57600080fd5b50565b60008135905061273e81612718565b92915050565b60006020828403121561275a57612759612713565b5b60006127688482850161272f565b91505092915050565b60008115159050919050565b61278681612771565b82525050565b60006020820190506127a1600083018461277d565b92915050565b6127b0816126a6565b81146127bb57600080fd5b50565b6000813590506127cd816127a7565b92915050565b6000602082840312156127e9576127e8612713565b5b60006127f7848285016127be565b91505092915050565b600061280b8261260c565b9050919050565b61281b81612800565b811461282657600080fd5b50565b60008135905061283881612812565b92915050565b6000806040838503121561285557612854612713565b5b600061286385828601612829565b92505060206128748582860161272f565b9150509250929050565b61288781612800565b82525050565b60006020820190506128a2600083018461287e565b92915050565b6000602082840312156128be576128bd612713565b5b60006128cc84828501612829565b91505092915050565b6000806000606084860312156128ee576128ed612713565b5b60006128fc86828701612829565b935050602061290d86828701612829565b925050604061291e86828701612829565b9150509250925092565b600061293382612658565b9050919050565b61294381612928565b82525050565b600060208201905061295e600083018461293a565b92915050565b60008151905061297381612718565b92915050565b60006020828403121561298f5761298e612713565b5b600061299d84828501612964565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006129e0826126df565b91506129eb836126df565b9250828210156129fe576129fd6129a6565b5b828203905092915050565b6000612a14826126df565b9150612a1f836126df565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612a5857612a576129a6565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612a9d826126df565b9150612aa8836126df565b925082612ab857612ab7612a63565b5b828204905092915050565b600082825260208201905092915050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b6000612b0a601f83612ac3565b9150612b1582612ad4565b602082019050919050565b60006020820190508181036000830152612b3981612afd565b9050919050565b612b4981612771565b8114612b5457600080fd5b50565b600081519050612b6681612b40565b92915050565b600060208284031215612b8257612b81612713565b5b6000612b9084828501612b57565b91505092915050565b7f4665654d616e616765723a20556e617574686f72697a65642063616c6c657200600082015250565b6000612bcf601f83612ac3565b9150612bda82612b99565b602082019050919050565b60006020820190508181036000830152612bfe81612bc2565b9050919050565b7f52657365727665506f6f6c3a2043616e6e6f7420776974686472617720300000600082015250565b6000612c3b601e83612ac3565b9150612c4682612c05565b602082019050919050565b60006020820190508181036000830152612c6a81612c2e565b9050919050565b7f52657365727665506f6f6c3a20496e73756666696369656e74206f706572617460008201527f6f722062616c616e636500000000000000000000000000000000000000000000602082015250565b6000612ccd602a83612ac3565b9150612cd882612c71565b604082019050919050565b60006020820190508181036000830152612cfc81612cc0565b9050919050565b600081519050612d1281612812565b92915050565b600060208284031215612d2e57612d2d612713565b5b6000612d3c84828501612d03565b91505092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612d7b602083612ac3565b9150612d8682612d45565b602082019050919050565b60006020820190508181036000830152612daa81612d6e565b9050919050565b7f52657365727665506f6f6c3a204c5456206d757374206265206c65737320746860008201527f616e203130302500000000000000000000000000000000000000000000000000602082015250565b6000612e0d602783612ac3565b9150612e1882612db1565b604082019050919050565b60006020820190508181036000830152612e3c81612e00565b9050919050565b6000604082019050612e58600083018561287e565b612e6560208301846126e9565b9392505050565b7f52657365727665506f6f6c3a206f70657261746f722070657263656e74206d7560008201527f7374206265206c657373207468616e2031303025000000000000000000000000602082015250565b6000612ec8603483612ac3565b9150612ed382612e6c565b604082019050919050565b60006020820190508181036000830152612ef781612ebb565b9050919050565b7f52657365727665506f6f6c3a2043616e6e6f74207374616b6520300000000000600082015250565b6000612f34601b83612ac3565b9150612f3f82612efe565b602082019050919050565b60006020820190508181036000830152612f6381612f27565b9050919050565b6000612f75826126df565b9150612f80836126df565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612fb557612fb46129a6565b5b828201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b600061301c602e83612ac3565b915061302782612fc0565b604082019050919050565b6000602082019050818103600083015261304b8161300f565b9050919050565b7f52657365727665506f6f6c3a2043616e6e6f74206465706f7369742030000000600082015250565b6000613088601d83612ac3565b915061309382613052565b602082019050919050565b600060208201905081810360008301526130b78161307b565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061311a602683612ac3565b9150613125826130be565b604082019050919050565b600060208201905081810360008301526131498161310d565b9050919050565b6000606082019050613165600083018661287e565b613172602083018561287e565b61317f60408301846126e9565b949350505050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b60006131e3602b83612ac3565b91506131ee82613187565b604082019050919050565b60006020820190508181036000830152613212816131d6565b9050919050565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b600061324f601083612ac3565b915061325a82613219565b602082019050919050565b6000602082019050818103600083015261327e81613242565b9050919050565b61328e81612800565b82525050565b61329d816126a6565b82525050565b6132ac816126df565b82525050565b6132bb8161260c565b82525050565b610100820160008201516132d86000850182613285565b5060208201516132eb6020850182613285565b5060408201516132fe6040850182613294565b5060608201516133116060850182613285565b50608082015161332460808501826132a3565b5060a082015161333760a08501826132a3565b5060c082015161334a60c08501826132a3565b5060e082015161335d60e08501826132b2565b50505050565b60006101008201905061337960008301846132c1565b92915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b60006133db602a83612ac3565b91506133e68261337f565b604082019050919050565b6000602082019050818103600083015261340a816133ce565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b600061346d602683612ac3565b915061347882613411565b604082019050919050565b6000602082019050818103600083015261349c81613460565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b60006134d9601d83612ac3565b91506134e4826134a3565b602082019050919050565b60006020820190508181036000830152613508816134cc565b9050919050565b600081519050919050565b600081905092915050565b60005b83811015613543578082015181840152602081019050613528565b83811115613552576000848401525b50505050565b60006135638261350f565b61356d818561351a565b935061357d818560208601613525565b80840191505092915050565b60006135958284613558565b915081905092915050565b600081519050919050565b6000601f19601f8301169050919050565b60006135c7826135a0565b6135d18185612ac3565b93506135e1818560208601613525565b6135ea816135ab565b840191505092915050565b6000602082019050818103600083015261360f81846135bc565b90509291505056fea2646970667358221220e6fbf3895b23705ce5e5502c8073b7cdbe221cd71782731ed597fd5fcac72d3964736f6c63430008090033";

export class ReservePool__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ReservePool> {
    return super.deploy(overrides || {}) as Promise<ReservePool>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ReservePool {
    return super.attach(address) as ReservePool;
  }
  connect(signer: Signer): ReservePool__factory {
    return super.connect(signer) as ReservePool__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReservePoolInterface {
    return new utils.Interface(_abi) as ReservePoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReservePool {
    return new Contract(address, _abi, signerOrProvider) as ReservePool;
  }
}
