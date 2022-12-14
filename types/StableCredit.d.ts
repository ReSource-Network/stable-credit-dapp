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

interface StableCreditInterface extends ethers.utils.Interface {
  functions: {
    "__MutualCredit_init(string,string)": FunctionFragment;
    "__StableCredit_init(address,address,string,string)": FunctionFragment;
    "access()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "burnFrom(address,uint256)": FunctionFragment;
    "burnNetworkDebt(uint256)": FunctionFragment;
    "convertCreditToReferenceToken(uint256)": FunctionFragment;
    "createCreditLine(address,uint256,uint256)": FunctionFragment;
    "creditBalanceOf(address)": FunctionFragment;
    "creditLimitLeftOf(address)": FunctionFragment;
    "creditLimitOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "feeManager()": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "networkDebt()": FunctionFragment;
    "owner()": FunctionFragment;
    "referenceToken()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "repayCreditBalance(address,uint128)": FunctionFragment;
    "riskManager()": FunctionFragment;
    "setFeeManager(address)": FunctionFragment;
    "setRiskManager(address)": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateCreditLimit(address,uint256)": FunctionFragment;
    "writeOffCreditLine(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "__MutualCredit_init",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "__StableCredit_init",
    values: [string, string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "access", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "burnFrom",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burnNetworkDebt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "convertCreditToReferenceToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createCreditLine",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "creditBalanceOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "creditLimitLeftOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "creditLimitOf",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "feeManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "networkDebt",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "referenceToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "repayCreditBalance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "riskManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeManager",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRiskManager",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateCreditLimit",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "writeOffCreditLine",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "__MutualCredit_init",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "__StableCredit_init",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "access", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burnFrom", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "burnNetworkDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "convertCreditToReferenceToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCreditLine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "creditBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "creditLimitLeftOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "creditLimitOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "networkDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "referenceToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "repayCreditBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "riskManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRiskManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
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
    "Approval(address,address,uint256)": EventFragment;
    "CreditBalanceRepayed(address,uint128)": EventFragment;
    "CreditLimitUpdate(address,uint256)": EventFragment;
    "CreditLimitUpdated(address,uint256)": EventFragment;
    "CreditLineCreated(address,uint256,uint256)": EventFragment;
    "MembersDemurraged(uint256)": EventFragment;
    "NetworkDebtBurned(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreditBalanceRepayed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreditLimitUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreditLimitUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreditLineCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MembersDemurraged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NetworkDebtBurned"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;

export type CreditBalanceRepayedEvent = TypedEvent<
  [string, BigNumber] & { member: string; amount: BigNumber }
>;

export type CreditLimitUpdateEvent = TypedEvent<
  [string, BigNumber] & { member: string; limit: BigNumber }
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

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; value: BigNumber }
>;

export class StableCredit extends BaseContract {
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

  interface: StableCreditInterface;

  functions: {
    __MutualCredit_init(
      name_: string,
      symbol_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    __StableCredit_init(
      _referenceToken: string,
      _accessManager: string,
      name_: string,
      symbol_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    access(overrides?: CallOverrides): Promise<[string]>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    burn(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burnFrom(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burnNetworkDebt(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

    creditBalanceOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    creditLimitLeftOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    creditLimitOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeManager(overrides?: CallOverrides): Promise<[string]>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    networkDebt(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    referenceToken(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    repayCreditBalance(
      member: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    riskManager(overrides?: CallOverrides): Promise<[string]>;

    setFeeManager(
      _feeManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRiskManager(
      _riskManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

  __MutualCredit_init(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  __StableCredit_init(
    _referenceToken: string,
    _accessManager: string,
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  access(overrides?: CallOverrides): Promise<string>;

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  burn(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burnFrom(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burnNetworkDebt(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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

  creditBalanceOf(
    member: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  creditLimitLeftOf(
    member: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  creditLimitOf(member: string, overrides?: CallOverrides): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeManager(overrides?: CallOverrides): Promise<string>;

  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  networkDebt(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  referenceToken(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  repayCreditBalance(
    member: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  riskManager(overrides?: CallOverrides): Promise<string>;

  setFeeManager(
    _feeManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRiskManager(
    _riskManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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
    __MutualCredit_init(
      name_: string,
      symbol_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    __StableCredit_init(
      _referenceToken: string,
      _accessManager: string,
      name_: string,
      symbol_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    access(overrides?: CallOverrides): Promise<string>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    burnFrom(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    burnNetworkDebt(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

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

    creditBalanceOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditLimitLeftOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditLimitOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    feeManager(overrides?: CallOverrides): Promise<string>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    networkDebt(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    referenceToken(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    repayCreditBalance(
      member: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    riskManager(overrides?: CallOverrides): Promise<string>;

    setFeeManager(
      _feeManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRiskManager(
      _riskManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

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
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

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

    "CreditLimitUpdate(address,uint256)"(
      member?: null,
      limit?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; limit: BigNumber }
    >;

    CreditLimitUpdate(
      member?: null,
      limit?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { member: string; limit: BigNumber }
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

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;
  };

  estimateGas: {
    __MutualCredit_init(
      name_: string,
      symbol_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    __StableCredit_init(
      _referenceToken: string,
      _accessManager: string,
      name_: string,
      symbol_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    access(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burnFrom(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burnNetworkDebt(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

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

    creditBalanceOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditLimitLeftOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditLimitOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeManager(overrides?: CallOverrides): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    networkDebt(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    referenceToken(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    repayCreditBalance(
      member: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    riskManager(overrides?: CallOverrides): Promise<BigNumber>;

    setFeeManager(
      _feeManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRiskManager(
      _riskManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

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
    __MutualCredit_init(
      name_: string,
      symbol_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    __StableCredit_init(
      _referenceToken: string,
      _accessManager: string,
      name_: string,
      symbol_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    access(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burnFrom(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burnNetworkDebt(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

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

    creditBalanceOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    creditLimitLeftOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    creditLimitOf(
      member: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    networkDebt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    referenceToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    repayCreditBalance(
      member: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    riskManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setFeeManager(
      _feeManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRiskManager(
      _riskManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

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
