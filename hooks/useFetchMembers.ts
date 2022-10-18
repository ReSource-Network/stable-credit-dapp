import { GraphQLClient } from "graphql-request"
import { config } from "../config"
import { useNetworkQuery } from "../graphql/generated"

const subgraphClient = new GraphQLClient(config.SUBGRAPH_URL, { headers: {} })

type Props = { address: string; page: number; limit: number }

export const useFetchMembers = (props: Props) => {
  const { page, limit, address } = props

  const network = useNetworkQuery(subgraphClient, {
    id: address.toLowerCase(),
    skip: (page - 1) * limit,
    first: limit,
  })

  return { network: network.data?.network, refetch: network.refetch }
}
