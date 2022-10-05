/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FeeManager, FeeManagerInterface } from "../FeeManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "network",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalFee",
        type: "uint256",
      },
    ],
    name: "FeesCollected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "network",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalFee",
        type: "uint256",
      },
    ],
    name: "FeesDistributed",
    type: "event",
  },
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
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "collectFees",
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
    name: "collectedFees",
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
        name: "network",
        type: "address",
      },
    ],
    name: "distributeFees",
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
    name: "feePercent",
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
        name: "_reservePool",
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
    name: "pauseFees",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reservePool",
    outputs: [
      {
        internalType: "contract IReservePool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "network",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feePercent",
        type: "uint256",
      },
    ],
    name: "setNetworkFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "unpauseFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "network",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalFeePercent",
        type: "uint256",
      },
    ],
    name: "updateTotalFeePercents",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506124c5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806385d796521161009757806398dc9b811161006657806398dc9b8114610226578063c4d66de814610242578063e00efe4a1461025e578063f2fde38b1461027a576100f5565b806385d79652146101c65780638980f11f146101d05780638da5cb5b146101ec5780639413f25c1461020a576100f5565b806329f11b54116100d357806329f11b54146101525780635c975abb1461016e578063715018a61461018c5780637c96cd2414610196576100f5565b80630266f044146100fa5780630ee70d49146101185780631cead9a714610122575b600080fd5b610102610296565b60405161010f91906118d9565b60405180910390f35b6101206102bc565b005b61013c60048036038101906101379190611937565b610342565b604051610149919061197d565b60405180910390f35b61016c600480360381019061016791906119c4565b61035a565b005b610176610775565b6040516101839190611a1f565b60405180910390f35b61019461078c565b005b6101b060048036038101906101ab9190611937565b610814565b6040516101bd919061197d565b60405180910390f35b6101ce61082c565b005b6101ea60048036038101906101e591906119c4565b6108b2565b005b6101f461095d565b6040516102019190611a49565b60405180910390f35b610224600480360381019061021f9190611937565b610987565b005b610240600480360381019061023b91906119c4565b610b15565b005b61025c60048036038101906102579190611937565b610cb0565b005b61027860048036038101906102739190611a64565b610dee565b005b610294600480360381019061028f9190611937565b611033565b005b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6102c461112b565b73ffffffffffffffffffffffffffffffffffffffff166102e261095d565b73ffffffffffffffffffffffffffffffffffffffff1614610338576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032f90611b14565b60405180910390fd5b610340611133565b565b60996020528060005260406000206000915090505481565b818073ffffffffffffffffffffffffffffffffffffffff1663fe9fbb80336040518263ffffffff1660e01b81526004016103949190611a49565b60206040518083038186803b1580156103ac57600080fd5b505afa1580156103c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e49190611b60565b8061042157506103f261095d565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610460576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045790611bd9565b60405180910390fd5b620f424063ffffffff168211156104ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a390611c6b565b60405180910390fd5b60008373ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b1580156104f457600080fd5b505afa158015610508573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052c9190611ca0565b73ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e30609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff1660e01b8152600401610588929190611ccd565b60206040518083038186803b1580156105a057600080fd5b505afa1580156105b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d89190611d0b565b141561072c578273ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b15801561062457600080fd5b505afa158015610638573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065c9190611ca0565b73ffffffffffffffffffffffffffffffffffffffff1663095ea7b3609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6040518363ffffffff1660e01b81526004016106d8929190611d38565b602060405180830381600087803b1580156106f257600080fd5b505af1158015610706573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072a9190611b60565b505b81609860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505050565b6000603360009054906101000a900460ff16905090565b61079461112b565b73ffffffffffffffffffffffffffffffffffffffff166107b261095d565b73ffffffffffffffffffffffffffffffffffffffff1614610808576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ff90611b14565b60405180910390fd5b61081260006111d6565b565b60986020528060005260406000206000915090505481565b61083461112b565b73ffffffffffffffffffffffffffffffffffffffff1661085261095d565b73ffffffffffffffffffffffffffffffffffffffff16146108a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161089f90611b14565b60405180910390fd5b6108b061129c565b565b6108ba61112b565b73ffffffffffffffffffffffffffffffffffffffff166108d861095d565b73ffffffffffffffffffffffffffffffffffffffff161461092e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092590611b14565b60405180910390fd5b61095933828473ffffffffffffffffffffffffffffffffffffffff1661133e9092919063ffffffff16565b5050565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a71532cd82609960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518363ffffffff1660e01b8152600401610a23929190611d38565b600060405180830381600087803b158015610a3d57600080fd5b505af1158015610a51573d6000803e3d6000fd5b505050507f63be20cc905d5ba0cf65db405c4999f99f2575e521875f13a8009d6eed7a09d981609960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051610ac5929190611d38565b60405180910390a16000609960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b818073ffffffffffffffffffffffffffffffffffffffff1663fe9fbb80336040518263ffffffff1660e01b8152600401610b4f9190611a49565b60206040518083038186803b158015610b6757600080fd5b505afa158015610b7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9f9190611b60565b80610bdc5750610bad61095d565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610c1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1290611bd9565b60405180910390fd5b620f424063ffffffff16821115610c67576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5e90611dd3565b60405180910390fd5b81609860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505050565b600060019054906101000a900460ff16610cd85760008054906101000a900460ff1615610ce1565b610ce06113c4565b5b610d20576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1790611e65565b60405180910390fd5b60008060019054906101000a900460ff161590508015610d70576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610d786113d5565b610d8061142e565b610d88611133565b81609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508015610dea5760008060016101000a81548160ff0219169083151502179055505b5050565b610df6610775565b15610e005761102e565b600033905060008173ffffffffffffffffffffffffffffffffffffffff1663a08ed36a620f424063ffffffff1685609860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e789190611eb4565b610e829190611f3d565b6040518263ffffffff1660e01b8152600401610e9e919061197d565b60206040518083038186803b158015610eb657600080fd5b505afa158015610eca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eee9190611d0b565b9050610f9a8530838573ffffffffffffffffffffffffffffffffffffffff1663ca709a256040518163ffffffff1660e01b815260040160206040518083038186803b158015610f3c57600080fd5b505afa158015610f50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f749190611ca0565b73ffffffffffffffffffffffffffffffffffffffff16611487909392919063ffffffff16565b80609960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610fe99190611f6e565b925050819055507f9bcb6d1f38f6800906185471a11ede9a8e16200853225aa62558db6076490f2d33868360405161102393929190611fc4565b60405180910390a150505b505050565b61103b61112b565b73ffffffffffffffffffffffffffffffffffffffff1661105961095d565b73ffffffffffffffffffffffffffffffffffffffff16146110af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110a690611b14565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561111f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111169061206d565b60405180910390fd5b611128816111d6565b50565b600033905090565b61113b610775565b1561117b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611172906120d9565b60405180910390fd5b6001603360006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586111bf61112b565b6040516111cc9190611a49565b60405180910390a1565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6112a4610775565b6112e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112da90612145565b60405180910390fd5b6000603360006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa61132761112b565b6040516113349190611a49565b60405180910390a1565b6113bf8363a9059cbb60e01b848460405160240161135d929190611d38565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611510565b505050565b60006113cf306115d7565b15905090565b600060019054906101000a900460ff16611424576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141b906121d7565b60405180910390fd5b61142c6115fa565b565b600060019054906101000a900460ff1661147d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611474906121d7565b60405180910390fd5b61148561165b565b565b61150a846323b872dd60e01b8585856040516024016114a893929190611fc4565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611510565b50505050565b6000611572826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166116c79092919063ffffffff16565b90506000815111156115d257808060200190518101906115929190611b60565b6115d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115c890612269565b60405180910390fd5b5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16611649576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611640906121d7565b60405180910390fd5b61165961165461112b565b6111d6565b565b600060019054906101000a900460ff166116aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116a1906121d7565b60405180910390fd5b6000603360006101000a81548160ff021916908315150217905550565b60606116d684846000856116df565b90509392505050565b606082471015611724576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161171b906122fb565b60405180910390fd5b61172d856115d7565b61176c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161176390612367565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516117959190612401565b60006040518083038185875af1925050503d80600081146117d2576040519150601f19603f3d011682016040523d82523d6000602084013e6117d7565b606091505b50915091506117e78282866117f3565b92505050949350505050565b6060831561180357829050611853565b6000835111156118165782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184a919061246d565b60405180910390fd5b9392505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061189f61189a6118958461185a565b61187a565b61185a565b9050919050565b60006118b182611884565b9050919050565b60006118c3826118a6565b9050919050565b6118d3816118b8565b82525050565b60006020820190506118ee60008301846118ca565b92915050565b600080fd5b60006119048261185a565b9050919050565b611914816118f9565b811461191f57600080fd5b50565b6000813590506119318161190b565b92915050565b60006020828403121561194d5761194c6118f4565b5b600061195b84828501611922565b91505092915050565b6000819050919050565b61197781611964565b82525050565b6000602082019050611992600083018461196e565b92915050565b6119a181611964565b81146119ac57600080fd5b50565b6000813590506119be81611998565b92915050565b600080604083850312156119db576119da6118f4565b5b60006119e985828601611922565b92505060206119fa858286016119af565b9150509250929050565b60008115159050919050565b611a1981611a04565b82525050565b6000602082019050611a346000830184611a10565b92915050565b611a43816118f9565b82525050565b6000602082019050611a5e6000830184611a3a565b92915050565b600080600060608486031215611a7d57611a7c6118f4565b5b6000611a8b86828701611922565b9350506020611a9c86828701611922565b9250506040611aad868287016119af565b9150509250925092565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611afe602083611ab7565b9150611b0982611ac8565b602082019050919050565b60006020820190508181036000830152611b2d81611af1565b9050919050565b611b3d81611a04565b8114611b4857600080fd5b50565b600081519050611b5a81611b34565b92915050565b600060208284031215611b7657611b756118f4565b5b6000611b8484828501611b4b565b91505092915050565b7f4665654d616e616765723a20556e617574686f72697a65642063616c6c657200600082015250565b6000611bc3601f83611ab7565b9150611bce82611b8d565b602082019050919050565b60006020820190508181036000830152611bf281611bb6565b9050919050565b7f4665654d616e616765723a204665652070657263656e74206d7573742062652060008201527f6c657373207468616e2031303025000000000000000000000000000000000000602082015250565b6000611c55602e83611ab7565b9150611c6082611bf9565b604082019050919050565b60006020820190508181036000830152611c8481611c48565b9050919050565b600081519050611c9a8161190b565b92915050565b600060208284031215611cb657611cb56118f4565b5b6000611cc484828501611c8b565b91505092915050565b6000604082019050611ce26000830185611a3a565b611cef6020830184611a3a565b9392505050565b600081519050611d0581611998565b92915050565b600060208284031215611d2157611d206118f4565b5b6000611d2f84828501611cf6565b91505092915050565b6000604082019050611d4d6000830185611a3a565b611d5a602083018461196e565b9392505050565b7f4665654d616e616765723a20746f74616c20666565206d757374206265206c6560008201527f7373207468616e20313030250000000000000000000000000000000000000000602082015250565b6000611dbd602c83611ab7565b9150611dc882611d61565b604082019050919050565b60006020820190508181036000830152611dec81611db0565b9050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000611e4f602e83611ab7565b9150611e5a82611df3565b604082019050919050565b60006020820190508181036000830152611e7e81611e42565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611ebf82611964565b9150611eca83611964565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611f0357611f02611e85565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611f4882611964565b9150611f5383611964565b925082611f6357611f62611f0e565b5b828204905092915050565b6000611f7982611964565b9150611f8483611964565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611fb957611fb8611e85565b5b828201905092915050565b6000606082019050611fd96000830186611a3a565b611fe66020830185611a3a565b611ff3604083018461196e565b949350505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612057602683611ab7565b915061206282611ffb565b604082019050919050565b600060208201905081810360008301526120868161204a565b9050919050565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b60006120c3601083611ab7565b91506120ce8261208d565b602082019050919050565b600060208201905081810360008301526120f2816120b6565b9050919050565b7f5061757361626c653a206e6f7420706175736564000000000000000000000000600082015250565b600061212f601483611ab7565b915061213a826120f9565b602082019050919050565b6000602082019050818103600083015261215e81612122565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b60006121c1602b83611ab7565b91506121cc82612165565b604082019050919050565b600060208201905081810360008301526121f0816121b4565b9050919050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6000612253602a83611ab7565b915061225e826121f7565b604082019050919050565b6000602082019050818103600083015261228281612246565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b60006122e5602683611ab7565b91506122f082612289565b604082019050919050565b60006020820190508181036000830152612314816122d8565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000612351601d83611ab7565b915061235c8261231b565b602082019050919050565b6000602082019050818103600083015261238081612344565b9050919050565b600081519050919050565b600081905092915050565b60005b838110156123bb5780820151818401526020810190506123a0565b838111156123ca576000848401525b50505050565b60006123db82612387565b6123e58185612392565b93506123f581856020860161239d565b80840191505092915050565b600061240d82846123d0565b915081905092915050565b600081519050919050565b6000601f19601f8301169050919050565b600061243f82612418565b6124498185611ab7565b935061245981856020860161239d565b61246281612423565b840191505092915050565b600060208201905081810360008301526124878184612434565b90509291505056fea2646970667358221220865a31ab942b1cd0e5e73032ae765f79269ceda25eb71ea7875fdd1f0f2f7d3a64736f6c63430008090033";

export class FeeManager__factory extends ContractFactory {
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
  ): Promise<FeeManager> {
    return super.deploy(overrides || {}) as Promise<FeeManager>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): FeeManager {
    return super.attach(address) as FeeManager;
  }
  connect(signer: Signer): FeeManager__factory {
    return super.connect(signer) as FeeManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FeeManagerInterface {
    return new utils.Interface(_abi) as FeeManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FeeManager {
    return new Contract(address, _abi, signerOrProvider) as FeeManager;
  }
}
