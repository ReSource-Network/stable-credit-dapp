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

interface IStableCreditInterface extends ethers.utils.Interface {
  functions: {
    "access()": FunctionFragment;
    "convertCreditToReferenceToken(uint256)": FunctionFragment;
    "createCreditLine(address,uint256,uint256)": FunctionFragment;
    "feeManager()": FunctionFragment;
    "referenceToken()": FunctionFragment;
    "riskManager()": FunctionFragment;
    "updateCreditLimit(address,uint256)": FunctionFragment;
    "writeOffCreditLine(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "access", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "convertCreditToReferenceToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createCreditLine",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "feeManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "referenceToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "riskManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateCreditLimit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "writeOffCreditLine",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "access", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "convertCreditToReferenceToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCreditLine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "referenceToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "riskManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCreditLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "writeOffCreditLine",
    data: BytesLike
  ): Result;

  events: {
    "CreditBalanceRepayed(address,uint128)": EventFragment;
    "CreditLimitUpdated(address,uint256)": EventFragment;
    "CreditLineCreated(address,uint256,uint256)": EventFragment;
    "MembersDemurraged(uint256)": EventFragment;
    "NetworkDebtBurned(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreditBalanceRepayed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreditLimitUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreditLineCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MembersDemurraged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NetworkDebtBurned"): EventFragment;
}

export type CreditBalanceRepayedEvent = TypedEvent<
  [string, BigNumber] & { member: string; amount: BigNumber }
>;

export type CreditLimitUpdatedEvent = TypedEvent<
  [string, BigNumber] & { member: string; creditLimit: BigNumber }
>;

export type CreditLineCreatedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    member: string;
    creditLimit: BigNumber;
    balance: BigNumber;
  }
>;

export type MembersDemurragedEvent = TypedEvent<
  [BigNumber] & { amount: BigNumber }
>;

export type NetworkDebtBurnedEvent = TypedEvent<
  [string, BigNumber] & { member: string; amount: BigNumber }
>;

export class IStableCredit extends BaseContract {
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

  interface: IStableCreditInterface;

  functions: {
    access(overrides?: CallOverrides): Promise<[string]>;

    convertCreditToReferenceToken(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    createCreditLine(
      member: string,
      _creditLimit: BigNumberish,
      _balance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeManager(overrides?: CallOverrides): Promise<[string]>;

    referenceToken(overrides?: CallOverrides): Promise<[string]>;

    riskManager(overrides?: CallOverrides): Promise<[string]>;

    updateCreditLimit(
      member: string,
      creditLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    writeOffCreditLine(
      member: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  access(overrides?: CallOverrides): Promise<string>;

  convertCreditToReferenceToken(
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  createCreditLine(
    member: string,
    _creditLimit: BigNumberish,
    _balance: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeManager(overrides?: CallOverrides): Promise<string>;

  referenceToken(overrides?: CallOverrides): Promise<string>;

  riskManager(overrides?: CallOverrides): Promise<string>;

  updateCreditLimit(
    member: string,
    creditLimit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  writeOffCreditLine(
    member: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    access(overrides?: CallOverrides): Promise<string>;

    convertCreditToReferenceToken(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createCreditLine(
      member: string,
      _creditLimit: BigNumberish,
      _balance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    feeManager(overrides?: CallOverrides): Promise<string>;

    referenceToken(overrides?: CallOverrides): Promise<string>;

    riskManager(overrides?: CallOverrides): Promise<string>;

    updateCreditLimit(
      member: string,
      creditLimit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    writeOffCreditLine(
      member: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CreditBalanceRepayed(address,uint128)"(
      member?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; amount: BigNumber }
    >;

    CreditBalanceRepayed(
      member?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; amount: BigNumber }
    >;

    "CreditLimitUpdated(address,uint256)"(
      member?: null,
      creditLimit?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; creditLimit: BigNumber }
    >;

    CreditLimitUpdated(
      member?: null,
      creditLimit?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; creditLimit: BigNumber }
    >;

    "CreditLineCreated(address,uint256,uint256)"(
      member?: null,
      creditLimit?: null,
      balance?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { member: string; creditLimit: BigNumber; balance: BigNumber }
    >;

    CreditLineCreated(
      member?: null,
      creditLimit?: null,
      balance?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { member: string; creditLimit: BigNumber; balance: BigNumber }
    >;

    "MembersDemurraged(uint256)"(
      amount?: null
    ): TypedEventFilter<[BigNumber], { amount: BigNumber }>;

    MembersDemurraged(
      amount?: null
    ): TypedEventFilter<[BigNumber], { amount: BigNumber }>;

    "NetworkDebtBurned(address,uint256)"(
      member?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; amount: BigNumber }
    >;

    NetworkDebtBurned(
      member?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    access(overrides?: CallOverrides): Promise<BigNumber>;

    convertCreditToReferenceToken(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createCreditLine(
      member: string,
      _creditLimit: BigNumberish,
      _balance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeManager(overrides?: CallOverrides): Promise<BigNumber>;

    referenceToken(overrides?: CallOverrides): Promise<BigNumber>;

    riskManager(overrides?: CallOverrides): Promise<BigNumber>;

    updateCreditLimit(
      member: string,
      creditLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    writeOffCreditLine(
      member: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    access(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    convertCreditToReferenceToken(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createCreditLine(
      member: string,
      _creditLimit: BigNumberish,
      _balance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    referenceToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    riskManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateCreditLimit(
      member: string,
      creditLimit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    writeOffCreditLine(
      member: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
