/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IFeeManagerInterface extends ethers.utils.Interface {
  functions: {
    "collectFees(address,address,uint256)": FunctionFragment;
    "setMemberFeeRate(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "collectFees",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setMemberFeeRate",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "collectFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMemberFeeRate",
    data: BytesLike
  ): Result;

  events: {
    "FeesCollected(address,uint256)": EventFragment;
    "FeesDistributed(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeesCollected"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeesDistributed"): EventFragment;
}

export type FeesCollectedEvent = TypedEvent<
  [string, BigNumber] & { member: string; totalFee: BigNumber }
>;

export type FeesDistributedEvent = TypedEvent<
  [BigNumber] & { totalFee: BigNumber }
>;

export class IFeeManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IFeeManagerInterface;

  functions: {
    collectFees(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMemberFeeRate(
      member: string,
      _feePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  collectFees(
    sender: string,
    receiver: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMemberFeeRate(
    member: string,
    _feePercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    collectFees(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMemberFeeRate(
      member: string,
      _feePercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FeesCollected(address,uint256)"(
      member?: null,
      totalFee?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; totalFee: BigNumber }
    >;

    FeesCollected(
      member?: null,
      totalFee?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; totalFee: BigNumber }
    >;

    "FeesDistributed(uint256)"(
      totalFee?: null
    ): TypedEventFilter<[BigNumber], { totalFee: BigNumber }>;

    FeesDistributed(
      totalFee?: null
    ): TypedEventFilter<[BigNumber], { totalFee: BigNumber }>;
  };

  estimateGas: {
    collectFees(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMemberFeeRate(
      member: string,
      _feePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    collectFees(
      sender: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMemberFeeRate(
      member: string,
      _feePercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
