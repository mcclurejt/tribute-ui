/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface ERC20Extension extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): ERC20Extension;
  clone(): ERC20Extension;
  methods: {
    dao(): NonPayableTransactionObject<string>;

    initialized(): NonPayableTransactionObject<boolean>;

    tokenAddress(): NonPayableTransactionObject<string>;

    tokenDecimals(): NonPayableTransactionObject<string>;

    tokenName(): NonPayableTransactionObject<string>;

    tokenSymbol(): NonPayableTransactionObject<string>;

    initialize(
      _dao: string,
      creator: string
    ): NonPayableTransactionObject<void>;

    token(): NonPayableTransactionObject<string>;

    setToken(_tokenAddress: string): NonPayableTransactionObject<void>;

    name(): NonPayableTransactionObject<string>;

    setName(_name: string): NonPayableTransactionObject<void>;

    symbol(): NonPayableTransactionObject<string>;

    setSymbol(_symbol: string): NonPayableTransactionObject<void>;

    decimals(): NonPayableTransactionObject<string>;

    setDecimals(
      _decimals: number | string | BN
    ): NonPayableTransactionObject<void>;

    totalSupply(): NonPayableTransactionObject<string>;

    balanceOf(account: string): NonPayableTransactionObject<string>;

    allowance(
      owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    approve(
      spender: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transfer(
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
