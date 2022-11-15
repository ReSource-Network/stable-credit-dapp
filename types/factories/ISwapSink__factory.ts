/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISwapSink, ISwapSinkInterface } from "../ISwapSink";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "network",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "credits",
        type: "uint256",
      },
    ],
    name: "depositFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ISwapSink__factory {
  static readonly abi = _abi;
  static createInterface(): ISwapSinkInterface {
    return new utils.Interface(_abi) as ISwapSinkInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISwapSink {
    return new Contract(address, _abi, signerOrProvider) as ISwapSink;
  }
}
