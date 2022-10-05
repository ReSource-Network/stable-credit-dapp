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

interface ReservePoolInterface extends ethers.utils.Interface {
  functions: {
    "LTV(address)": FunctionFragment;
    "collateral(address)": FunctionFragment;
    "depositCollateral(address,uint256)": FunctionFragment;
    "depositFees(address,uint256)": FunctionFragment;
    "getNeededCollateral(address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "minLTV(address)": FunctionFragment;
    "operatorBalance(address)": FunctionFragment;
    "operatorPercent(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "paused()": FunctionFragment;
    "poolFee()": FunctionFragment;
    "recoverERC20(address,uint256)": FunctionFragment;
    "reimburseMember(address,address,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setMinLTV(address,uint256)": FunctionFragment;
    "setOperatorPercent(address,uint256)": FunctionFragment;
    "setPoolFee(uint24)": FunctionFragment;
    "setSource(address)": FunctionFragment;
    "swapRouter()": FunctionFragment;
    "swapSink(address)": FunctionFragment;
    "swapSinkPercent(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawOperator(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "LTV", values: [string]): string;
  encodeFunctionData(functionFragment: "collateral", values: [string]): string;
  encodeFunctionData(
    functionFragment: "depositCollateral",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositFees",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getNeededCollateral",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "minLTV", values: [string]): string;
  encodeFunctionData(
    functionFragment: "operatorBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "operatorPercent",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "poolFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "recoverERC20",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "reimburseMember",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setMinLTV",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setOperatorPercent",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPoolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setSource", values: [string]): string;
  encodeFunctionData(
    functionFragment: "swapRouter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "swapSink", values: [string]): string;
  encodeFunctionData(
    functionFragment: "swapSinkPercent",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawOperator",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "LTV", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "collateral", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNeededCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minLTV", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "operatorBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "operatorPercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "recoverERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reimburseMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setMinLTV", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setOperatorPercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setPoolFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setSource", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapRouter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapSink", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapSinkPercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawOperator",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Recovered(address,uint256)": EventFragment;
    "Staked(address,uint256)": EventFragment;
    "Unpaused(address)": EventFragment;
    "Withdrawn(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Recovered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Staked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type PausedEvent = TypedEvent<[string] & { account: string }>;

export type RecoveredEvent = TypedEvent<
  [string, BigNumber] & { token: string; amount: BigNumber }
>;

export type StakedEvent = TypedEvent<
  [string, BigNumber] & { user: string; amount: BigNumber }
>;

export type UnpausedEvent = TypedEvent<[string] & { account: string }>;

export type WithdrawnEvent = TypedEvent<
  [string, BigNumber] & { user: string; amount: BigNumber }
>;

export class ReservePool extends BaseContract {
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

  interface: ReservePoolInterface;

  functions: {
    LTV(network: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    collateral(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    depositCollateral(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositFees(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getNeededCollateral(
      network: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initialize(
      _sourceAddress: string,
      _swapRouter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    minLTV(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    operatorBalance(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    operatorPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    poolFee(overrides?: CallOverrides): Promise<[number]>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reimburseMember(
      network: string,
      member: string,
      credits: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinLTV(
      network: string,
      _minLTV: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOperatorPercent(
      network: string,
      _operatorPercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPoolFee(
      _poolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSource(
      _sourceAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapRouter(overrides?: CallOverrides): Promise<[string]>;

    swapSink(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    swapSinkPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawOperator(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  LTV(network: string, overrides?: CallOverrides): Promise<BigNumber>;

  collateral(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  depositCollateral(
    network: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositFees(
    network: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getNeededCollateral(
    network: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initialize(
    _sourceAddress: string,
    _swapRouter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  minLTV(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  operatorBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  operatorPercent(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  poolFee(overrides?: CallOverrides): Promise<number>;

  recoverERC20(
    tokenAddress: string,
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reimburseMember(
    network: string,
    member: string,
    credits: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinLTV(
    network: string,
    _minLTV: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOperatorPercent(
    network: string,
    _operatorPercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPoolFee(
    _poolFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSource(
    _sourceAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapRouter(overrides?: CallOverrides): Promise<string>;

  swapSink(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  swapSinkPercent(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawOperator(
    network: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    LTV(network: string, overrides?: CallOverrides): Promise<BigNumber>;

    collateral(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    depositCollateral(
      network: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositFees(
      network: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getNeededCollateral(
      network: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _sourceAddress: string,
      _swapRouter: string,
      overrides?: CallOverrides
    ): Promise<void>;

    minLTV(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    operatorBalance(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    operatorPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    poolFee(overrides?: CallOverrides): Promise<number>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    reimburseMember(
      network: string,
      member: string,
      credits: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setMinLTV(
      network: string,
      _minLTV: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setOperatorPercent(
      network: string,
      _operatorPercent: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setPoolFee(
      _poolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setSource(_sourceAddress: string, overrides?: CallOverrides): Promise<void>;

    swapRouter(overrides?: CallOverrides): Promise<string>;

    swapSink(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    swapSinkPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawOperator(
      network: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
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

    "Paused(address)"(
      account?: null
    ): TypedEventFilter<[string], { account: string }>;

    Paused(account?: null): TypedEventFilter<[string], { account: string }>;

    "Recovered(address,uint256)"(
      token?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { token: string; amount: BigNumber }
    >;

    Recovered(
      token?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { token: string; amount: BigNumber }
    >;

    "Staked(address,uint256)"(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    Staked(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    "Unpaused(address)"(
      account?: null
    ): TypedEventFilter<[string], { account: string }>;

    Unpaused(account?: null): TypedEventFilter<[string], { account: string }>;

    "Withdrawn(address,uint256)"(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;

    Withdrawn(
      user?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { user: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    LTV(network: string, overrides?: CallOverrides): Promise<BigNumber>;

    collateral(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    depositCollateral(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositFees(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getNeededCollateral(
      network: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _sourceAddress: string,
      _swapRouter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    minLTV(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    operatorBalance(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    operatorPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    poolFee(overrides?: CallOverrides): Promise<BigNumber>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reimburseMember(
      network: string,
      member: string,
      credits: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinLTV(
      network: string,
      _minLTV: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOperatorPercent(
      network: string,
      _operatorPercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPoolFee(
      _poolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSource(
      _sourceAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapRouter(overrides?: CallOverrides): Promise<BigNumber>;

    swapSink(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    swapSinkPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawOperator(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    LTV(
      network: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    collateral(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    depositCollateral(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositFees(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getNeededCollateral(
      network: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _sourceAddress: string,
      _swapRouter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    minLTV(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    operatorBalance(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    operatorPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reimburseMember(
      network: string,
      member: string,
      credits: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinLTV(
      network: string,
      _minLTV: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOperatorPercent(
      network: string,
      _operatorPercent: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPoolFee(
      _poolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSource(
      _sourceAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapRouter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swapSink(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapSinkPercent(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawOperator(
      network: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
