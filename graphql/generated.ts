import { GraphQLClient } from "graphql-request"
import { RequestInit } from "graphql-request/dist/types.dom"
import { useQuery, UseQueryOptions } from "react-query"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"],
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers)
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
}

/** The block at which the query should be executed. */
export type Block_Height = {
  /** Value containing a block hash */
  hash?: InputMaybe<Scalars["Bytes"]>
  /** Value containing a block number */
  number?: InputMaybe<Scalars["Int"]>
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   *
   */
  number_gte?: InputMaybe<Scalars["Int"]>
}

export type Member = {
  __typename?: "Member"
  address: Scalars["Bytes"]
  balance: Scalars["BigInt"]
  creditLimit: Scalars["BigInt"]
  id: Scalars["ID"]
  network: Network
}

export type Member_Filter = {
  address?: InputMaybe<Scalars["Bytes"]>
  address_contains?: InputMaybe<Scalars["Bytes"]>
  address_in?: InputMaybe<Array<Scalars["Bytes"]>>
  address_not?: InputMaybe<Scalars["Bytes"]>
  address_not_contains?: InputMaybe<Scalars["Bytes"]>
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]>>
  balance?: InputMaybe<Scalars["BigInt"]>
  balance_gt?: InputMaybe<Scalars["BigInt"]>
  balance_gte?: InputMaybe<Scalars["BigInt"]>
  balance_in?: InputMaybe<Array<Scalars["BigInt"]>>
  balance_lt?: InputMaybe<Scalars["BigInt"]>
  balance_lte?: InputMaybe<Scalars["BigInt"]>
  balance_not?: InputMaybe<Scalars["BigInt"]>
  balance_not_in?: InputMaybe<Array<Scalars["BigInt"]>>
  creditLimit?: InputMaybe<Scalars["BigInt"]>
  creditLimit_gt?: InputMaybe<Scalars["BigInt"]>
  creditLimit_gte?: InputMaybe<Scalars["BigInt"]>
  creditLimit_in?: InputMaybe<Array<Scalars["BigInt"]>>
  creditLimit_lt?: InputMaybe<Scalars["BigInt"]>
  creditLimit_lte?: InputMaybe<Scalars["BigInt"]>
  creditLimit_not?: InputMaybe<Scalars["BigInt"]>
  creditLimit_not_in?: InputMaybe<Array<Scalars["BigInt"]>>
  id?: InputMaybe<Scalars["ID"]>
  id_gt?: InputMaybe<Scalars["ID"]>
  id_gte?: InputMaybe<Scalars["ID"]>
  id_in?: InputMaybe<Array<Scalars["ID"]>>
  id_lt?: InputMaybe<Scalars["ID"]>
  id_lte?: InputMaybe<Scalars["ID"]>
  id_not?: InputMaybe<Scalars["ID"]>
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>
  network?: InputMaybe<Scalars["String"]>
  network_contains?: InputMaybe<Scalars["String"]>
  network_contains_nocase?: InputMaybe<Scalars["String"]>
  network_ends_with?: InputMaybe<Scalars["String"]>
  network_ends_with_nocase?: InputMaybe<Scalars["String"]>
  network_gt?: InputMaybe<Scalars["String"]>
  network_gte?: InputMaybe<Scalars["String"]>
  network_in?: InputMaybe<Array<Scalars["String"]>>
  network_lt?: InputMaybe<Scalars["String"]>
  network_lte?: InputMaybe<Scalars["String"]>
  network_not?: InputMaybe<Scalars["String"]>
  network_not_contains?: InputMaybe<Scalars["String"]>
  network_not_contains_nocase?: InputMaybe<Scalars["String"]>
  network_not_ends_with?: InputMaybe<Scalars["String"]>
  network_not_ends_with_nocase?: InputMaybe<Scalars["String"]>
  network_not_in?: InputMaybe<Array<Scalars["String"]>>
  network_not_starts_with?: InputMaybe<Scalars["String"]>
  network_not_starts_with_nocase?: InputMaybe<Scalars["String"]>
  network_starts_with?: InputMaybe<Scalars["String"]>
  network_starts_with_nocase?: InputMaybe<Scalars["String"]>
}

export enum Member_OrderBy {
  Address = "address",
  Balance = "balance",
  CreditLimit = "creditLimit",
  Id = "id",
  Network = "network",
}

export type Network = {
  __typename?: "Network"
  id: Scalars["ID"]
  members?: Maybe<Array<Member>>
  totalMembers: Scalars["BigInt"]
}

export type NetworkMembersArgs = {
  first?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<Member_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars["Int"]>
  where?: InputMaybe<Member_Filter>
}

export type Network_Filter = {
  id?: InputMaybe<Scalars["ID"]>
  id_gt?: InputMaybe<Scalars["ID"]>
  id_gte?: InputMaybe<Scalars["ID"]>
  id_in?: InputMaybe<Array<Scalars["ID"]>>
  id_lt?: InputMaybe<Scalars["ID"]>
  id_lte?: InputMaybe<Scalars["ID"]>
  id_not?: InputMaybe<Scalars["ID"]>
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>
  totalMembers?: InputMaybe<Scalars["BigInt"]>
  totalMembers_gt?: InputMaybe<Scalars["BigInt"]>
  totalMembers_gte?: InputMaybe<Scalars["BigInt"]>
  totalMembers_in?: InputMaybe<Array<Scalars["BigInt"]>>
  totalMembers_lt?: InputMaybe<Scalars["BigInt"]>
  totalMembers_lte?: InputMaybe<Scalars["BigInt"]>
  totalMembers_not?: InputMaybe<Scalars["BigInt"]>
  totalMembers_not_in?: InputMaybe<Array<Scalars["BigInt"]>>
}

export enum Network_OrderBy {
  Id = "id",
  Members = "members",
  TotalMembers = "totalMembers",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Query = {
  __typename?: "Query"
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  member?: Maybe<Member>
  members: Array<Member>
  network?: Maybe<Network>
  networks: Array<Network>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryMemberArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars["ID"]
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryMembersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<Member_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars["Int"]>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Member_Filter>
}

export type QueryNetworkArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars["ID"]
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryNetworksArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<Network_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars["Int"]>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Network_Filter>
}

export type Subscription = {
  __typename?: "Subscription"
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  member?: Maybe<Member>
  members: Array<Member>
  network?: Maybe<Network>
  networks: Array<Network>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionMemberArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars["ID"]
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionMembersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<Member_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars["Int"]>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Member_Filter>
}

export type SubscriptionNetworkArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars["ID"]
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionNetworksArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars["Int"]>
  orderBy?: InputMaybe<Network_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars["Int"]>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Network_Filter>
}

export type _Block_ = {
  __typename?: "_Block_"
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]>
  /** The block number */
  number: Scalars["Int"]
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_"
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars["String"]
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type NetworkQueryVariables = Exact<{
  id: Scalars["ID"]
  skip?: InputMaybe<Scalars["Int"]>
  first?: InputMaybe<Scalars["Int"]>
}>

export type NetworkQuery = {
  __typename?: "Query"
  network?: {
    __typename?: "Network"
    id: string
    totalMembers: any
    members?: Array<{
      __typename?: "Member"
      address: any
      creditLimit: any
      balance: any
    }> | null
  } | null
}

export const NetworkDocument = `
    query network($id: ID!, $skip: Int, $first: Int) {
  network(id: $id) {
    id
    totalMembers
    members(skip: $skip, first: $first) {
      address
      creditLimit
      balance
    }
  }
}
    `
export const useNetworkQuery = <TData = NetworkQuery, TError = unknown>(
  client: GraphQLClient,
  variables: NetworkQueryVariables,
  options?: UseQueryOptions<NetworkQuery, TError, TData>,
  headers?: RequestInit["headers"],
) =>
  useQuery<NetworkQuery, TError, TData>(
    ["network", variables],
    fetcher<NetworkQuery, NetworkQueryVariables>(
      client,
      NetworkDocument,
      variables,
      headers,
    ),
    options,
  )
