import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSigner } from "wagmi"
import { StableCredit__factory } from "../types/factories/StableCredit__factory"
import { StableCredit } from "../types/StableCredit"

export interface NetworkContracts {
  stableCredit?: string
  accessManager?: string
  feeManager?: string
  feeToken?: string
  reservePool?: string
}

export const useNetworkAddresses = () => {
  const router = useRouter()
  const network = router.query.network as string
  const { data: signer } = useSigner()
  let stableCredit: StableCredit
  if (network && signer)
    stableCredit = StableCredit__factory.connect(network, signer)
  const [data, setData] = useState<NetworkContracts>({})
  const [loading, setLoading] = useState(false)

  const valid =
    ethers.utils.isAddress(network) &&
    !!(
      data.stableCredit &&
      data.reservePool &&
      data.feeToken &&
      data.feeManager &&
      data.accessManager
    )

  useEffect(() => {
    if (
      !network ||
      !ethers.utils.isAddress(network) ||
      !signer ||
      data.stableCredit == network
    )
      return
    const handler = async () => {
      setLoading(true)
      let addresses = {} as NetworkContracts
      addresses.stableCredit = network
      try {
        addresses.accessManager = await stableCredit.access()
        addresses.feeManager = await stableCredit.feeManager()
        addresses.feeToken = await stableCredit.feeToken()
        addresses.reservePool = await stableCredit.reservePool()
      } catch {
        setData({})
        setLoading(false)
        console.log(data)
        return
      }
      setData(addresses)
      setLoading(false)
    }
    handler()
  }, [network, signer])

  return { networkAddresses: data, loading, valid }
}
