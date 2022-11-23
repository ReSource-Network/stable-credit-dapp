/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RiskManager, RiskManagerInterface } from "../RiskManager";

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
    ],
    name: "CreditDefault",
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
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pastDueTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "defaultTime",
        type: "uint256",
      },
    ],
    name: "CreditTermsCreated",
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
        name: "network",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "PeriodEnded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "network",
        type: "address",
      },
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_creditLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pastDueTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "defaultTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_balance",
        type: "uint256",
      },
    ],
    name: "createCreditLine",
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
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "pastDueTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "defaultTime",
        type: "uint256",
      },
    ],
    name: "createCreditTerms",
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "creditTerms",
    outputs: [
      {
        internalType: "uint256",
        name: "issueDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "defaultDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pastDueDate",
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
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "inDefault",
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
    name: "initialize",
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
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "isPastDue",
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
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_memberFeeRate",
        type: "uint256",
      },
    ],
    name: "setMemberFeeRate",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "setReservePool",
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
        name: "_targetFeeRate",
        type: "uint256",
      },
    ],
    name: "setTargetFeeRate",
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
    inputs: [
      {
        internalType: "address",
        name: "network",
        type: "address",
      },
      {
        internalType: "address",
        name: "member",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "creditLimit",
        type: "uint256",
      },
    ],
    name: "updateCreditLimit",
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
        internalType: "address",
        name: "member",
        type: "address",
      },
    ],
    name: "validateCreditLine",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061218a806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806367dcb668116100975780638da5cb5b116100665780638da5cb5b1461024a578063a2f503b614610268578063a5ddb50414610298578063f2fde38b146102b4576100f5565b806367dcb668146101fe578063715018a61461021a5780637e02cf25146102245780638129fc1c14610240576100f5565b806332cde071116100d357806332cde071146101665780634d8c233b146101965780634f393a07146101c657806367c93b9e146101e2576100f5565b80630266f044146100fa57806308bd015a1461011857806312310acc1461014a575b600080fd5b6101026102d0565b60405161010f91906116e9565b60405180910390f35b610132600480360381019061012d9190611747565b6102f6565b604051610141939291906117a0565b60405180910390f35b610164600480360381019061015f9190611803565b61032d565b005b610180600480360381019061017b9190611747565b610498565b60405161018d9190611871565b60405180910390f35b6101b060048036038101906101ab9190611747565b6105db565b6040516101bd9190611871565b60405180910390f35b6101e060048036038101906101db919061188c565b610709565b005b6101fc60048036038101906101f791906118b9565b6107c9565b005b61021860048036038101906102139190611920565b610956565b005b610222610c91565b005b61023e60048036038101906102399190611803565b610d19565b005b610248610e07565b005b610252610ef3565b60405161025f91906119d1565b60405180910390f35b610282600480360381019061027d9190611747565b610f1d565b60405161028f9190611871565b60405180910390f35b6102b260048036038101906102ad91906119ec565b611038565b005b6102ce60048036038101906102c9919061188c565b6111a0565b005b606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6065602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020154905083565b610335611298565b73ffffffffffffffffffffffffffffffffffffffff16610353610ef3565b73ffffffffffffffffffffffffffffffffffffffff16146103a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a090611a89565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff1663d0fb02036040518163ffffffff1660e01b815260040160206040518083038186803b1580156103ef57600080fd5b505afa158015610403573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104279190611ae7565b73ffffffffffffffffffffffffffffffffffffffff1663c93e158783836040518363ffffffff1660e01b8152600401610461929190611b14565b600060405180830381600087803b15801561047b57600080fd5b505af115801561048f573d6000803e3d6000fd5b50505050505050565b6000808373ffffffffffffffffffffffffffffffffffffffff16634a9a75aa846040518263ffffffff1660e01b81526004016104d491906119d1565b60206040518083038186803b1580156104ec57600080fd5b505afa158015610500573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105249190611b52565b11610564576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055b90611bf1565b60405180910390fd5b61056e83836105db565b156105ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a590611c83565b60405180910390fd5b6105b88383610f1d565b156105d0576105c783836112a0565b600090506105d5565b600190505b92915050565b600080606560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154146106fe57606560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015442101580156106f957506106f78383610f1d565b155b610701565b60005b905092915050565b610711611298565b73ffffffffffffffffffffffffffffffffffffffff1661072f610ef3565b73ffffffffffffffffffffffffffffffffffffffff1614610785576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077c90611a89565b60405180910390fd5b80606660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6107d1611298565b73ffffffffffffffffffffffffffffffffffffffff166107ef610ef3565b73ffffffffffffffffffffffffffffffffffffffff1614610845576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083c90611a89565b60405180910390fd5b604051806060016040528042815260200182426108629190611cd2565b815260200183426108739190611cd2565b815250606560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010155604082015181600201559050507f223c4d03becad31b0352f36b31fffb2906911e04d24f5580f56aa20dd772aba4848484846040516109489493929190611d28565b60405180910390a150505050565b61095e611298565b73ffffffffffffffffffffffffffffffffffffffff1661097c610ef3565b73ffffffffffffffffffffffffffffffffffffffff16146109d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c990611a89565b60405180910390fd5b6000606560008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414610a94576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8b90611ddf565b60405180910390fd5b60008411610ad7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ace90611e71565b60405180910390fd5b838311610b19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1090611f03565b60405180910390fd5b610b25878786866107c9565b6000821115610c19578673ffffffffffffffffffffffffffffffffffffffff1663d0fb02036040518163ffffffff1660e01b815260040160206040518083038186803b158015610b7457600080fd5b505afa158015610b88573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bac9190611ae7565b73ffffffffffffffffffffffffffffffffffffffff1663c93e158787846040518363ffffffff1660e01b8152600401610be6929190611b14565b600060405180830381600087803b158015610c0057600080fd5b505af1158015610c14573d6000803e3d6000fd5b505050505b8673ffffffffffffffffffffffffffffffffffffffff16635290e1f48787846040518463ffffffff1660e01b8152600401610c5693929190611f23565b600060405180830381600087803b158015610c7057600080fd5b505af1158015610c84573d6000803e3d6000fd5b5050505050505050505050565b610c99611298565b73ffffffffffffffffffffffffffffffffffffffff16610cb7610ef3565b73ffffffffffffffffffffffffffffffffffffffff1614610d0d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d0490611a89565b60405180910390fd5b610d1760006114b6565b565b610d21611298565b73ffffffffffffffffffffffffffffffffffffffff16610d3f610ef3565b73ffffffffffffffffffffffffffffffffffffffff1614610d95576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8c90611a89565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff1663c6223c8983836040518363ffffffff1660e01b8152600401610dd0929190611b14565b600060405180830381600087803b158015610dea57600080fd5b505af1158015610dfe573d6000803e3d6000fd5b50505050505050565b600060019054906101000a900460ff16610e2f5760008054906101000a900460ff1615610e38565b610e3761157c565b5b610e77576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e6e90611fcc565b60405180910390fd5b60008060019054906101000a900460ff161590508015610ec7576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610ecf61158d565b8015610ef05760008060016101000a81548160ff0219169083151502179055505b50565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080606560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541461102d57606560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154421015611030565b60005b905092915050565b611040611298565b73ffffffffffffffffffffffffffffffffffffffff1661105e610ef3565b73ffffffffffffffffffffffffffffffffffffffff16146110b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ab90611a89565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff1663d0fb02036040518163ffffffff1660e01b815260040160206040518083038186803b1580156110fa57600080fd5b505afa15801561110e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111329190611ae7565b73ffffffffffffffffffffffffffffffffffffffff16634991cb35826040518263ffffffff1660e01b815260040161116a9190611fec565b600060405180830381600087803b15801561118457600080fd5b505af1158015611198573d6000803e3d6000fd5b505050505050565b6111a8611298565b73ffffffffffffffffffffffffffffffffffffffff166111c6610ef3565b73ffffffffffffffffffffffffffffffffffffffff161461121c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161121390611a89565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561128c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161128390612079565b60405180910390fd5b611295816114b6565b50565b600033905090565b60008273ffffffffffffffffffffffffffffffffffffffff166332a92229836040518263ffffffff1660e01b81526004016112db91906119d1565b60206040518083038186803b1580156112f357600080fd5b505afa158015611307573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132b9190611b52565b90508273ffffffffffffffffffffffffffffffffffffffff1663b0930250836040518263ffffffff1660e01b815260040161136691906119d1565b600060405180830381600087803b15801561138057600080fd5b505af1158015611394573d6000803e3d6000fd5b50505050606560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000808201600090556001820160009055600282016000905550506000811115611477577f33842e0f248d802434e296381c9aac95c5ad895390a9086d9e962afd08f9ace08383604051611469929190612099565b60405180910390a1506114b2565b7fe2a4195f58112900a65fe5d831cea3c097221fd82fec6ad9577784e2bf1454f083836040516114a8929190612099565b60405180910390a1505b5050565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000611587306115e6565b15905090565b600060019054906101000a900460ff166115dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115d390612134565b60405180910390fd5b6115e4611609565b565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16611658576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161164f90612134565b60405180910390fd5b611668611663611298565b6114b6565b565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006116af6116aa6116a58461166a565b61168a565b61166a565b9050919050565b60006116c182611694565b9050919050565b60006116d3826116b6565b9050919050565b6116e3816116c8565b82525050565b60006020820190506116fe60008301846116da565b92915050565b600080fd5b60006117148261166a565b9050919050565b61172481611709565b811461172f57600080fd5b50565b6000813590506117418161171b565b92915050565b6000806040838503121561175e5761175d611704565b5b600061176c85828601611732565b925050602061177d85828601611732565b9150509250929050565b6000819050919050565b61179a81611787565b82525050565b60006060820190506117b56000830186611791565b6117c26020830185611791565b6117cf6040830184611791565b949350505050565b6117e081611787565b81146117eb57600080fd5b50565b6000813590506117fd816117d7565b92915050565b60008060006060848603121561181c5761181b611704565b5b600061182a86828701611732565b935050602061183b86828701611732565b925050604061184c868287016117ee565b9150509250925092565b60008115159050919050565b61186b81611856565b82525050565b60006020820190506118866000830184611862565b92915050565b6000602082840312156118a2576118a1611704565b5b60006118b084828501611732565b91505092915050565b600080600080608085870312156118d3576118d2611704565b5b60006118e187828801611732565b94505060206118f287828801611732565b9350506040611903878288016117ee565b9250506060611914878288016117ee565b91505092959194509250565b600080600080600080600060e0888a03121561193f5761193e611704565b5b600061194d8a828b01611732565b975050602061195e8a828b01611732565b965050604061196f8a828b016117ee565b95505060606119808a828b016117ee565b94505060806119918a828b016117ee565b93505060a06119a28a828b016117ee565b92505060c06119b38a828b016117ee565b91505092959891949750929550565b6119cb81611709565b82525050565b60006020820190506119e660008301846119c2565b92915050565b60008060408385031215611a0357611a02611704565b5b6000611a1185828601611732565b9250506020611a22858286016117ee565b9150509250929050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611a73602083611a2c565b9150611a7e82611a3d565b602082019050919050565b60006020820190508181036000830152611aa281611a66565b9050919050565b6000611ab482611709565b9050919050565b611ac481611aa9565b8114611acf57600080fd5b50565b600081519050611ae181611abb565b92915050565b600060208284031215611afd57611afc611704565b5b6000611b0b84828501611ad2565b91505092915050565b6000604082019050611b2960008301856119c2565b611b366020830184611791565b9392505050565b600081519050611b4c816117d7565b92915050565b600060208284031215611b6857611b67611704565b5b6000611b7684828501611b3d565b91505092915050565b7f537461626c654372656469743a206d656d62657220646f6573206e6f7420686160008201527f7665206120637265646974206c696e6500000000000000000000000000000000602082015250565b6000611bdb603083611a2c565b9150611be682611b7f565b604082019050919050565b60006020820190508181036000830152611c0a81611bce565b9050919050565b7f537461626c654372656469743a20437265646974206c696e652069732070617360008201527f7420647565000000000000000000000000000000000000000000000000000000602082015250565b6000611c6d602583611a2c565b9150611c7882611c11565b604082019050919050565b60006020820190508181036000830152611c9c81611c60565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611cdd82611787565b9150611ce883611787565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611d1d57611d1c611ca3565b5b828201905092915050565b6000608082019050611d3d60008301876119c2565b611d4a60208301866119c2565b611d576040830185611791565b611d646060830184611791565b95945050505050565b7f5269736b4d616e616765723a20437265646974206c696e6520616c726561647960008201527f2065786973747320666f72206d656d6265720000000000000000000000000000602082015250565b6000611dc9603283611a2c565b9150611dd482611d6d565b604082019050919050565b60006020820190508181036000830152611df881611dbc565b9050919050565b7f5269736b4d616e616765723a2070617374206475652074696d65206d7573742060008201527f62652067726561746572207468616e2030000000000000000000000000000000602082015250565b6000611e5b603183611a2c565b9150611e6682611dff565b604082019050919050565b60006020820190508181036000830152611e8a81611e4e565b9050919050565b7f537461626c654372656469743a2064656661756c742074696d65206d7573742060008201527f62652067726561746572207468616e2070617374206475650000000000000000602082015250565b6000611eed603883611a2c565b9150611ef882611e91565b604082019050919050565b60006020820190508181036000830152611f1c81611ee0565b9050919050565b6000606082019050611f3860008301866119c2565b611f456020830185611791565b611f526040830184611791565b949350505050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000611fb6602e83611a2c565b9150611fc182611f5a565b604082019050919050565b60006020820190508181036000830152611fe581611fa9565b9050919050565b60006020820190506120016000830184611791565b92915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612063602683611a2c565b915061206e82612007565b604082019050919050565b6000602082019050818103600083015261209281612056565b9050919050565b60006040820190506120ae60008301856119c2565b6120bb60208301846119c2565b9392505050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b600061211e602b83611a2c565b9150612129826120c2565b604082019050919050565b6000602082019050818103600083015261214d81612111565b905091905056fea26469706673582212208c83633d48d7502c2e0dd6fe4f6db69b334a7aa0c271cd9224ae076c31a5753f64736f6c63430008090033";

export class RiskManager__factory extends ContractFactory {
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
  ): Promise<RiskManager> {
    return super.deploy(overrides || {}) as Promise<RiskManager>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RiskManager {
    return super.attach(address) as RiskManager;
  }
  connect(signer: Signer): RiskManager__factory {
    return super.connect(signer) as RiskManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RiskManagerInterface {
    return new utils.Interface(_abi) as RiskManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RiskManager {
    return new Contract(address, _abi, signerOrProvider) as RiskManager;
  }
}