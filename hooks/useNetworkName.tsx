import { useEffect, useState } from "react"
import { useStableCreditContract } from "./useStableCreditContract"

export const useNetworkName = () => {
  const stableCredit = useStableCreditContract()
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!stableCredit) return setData("")
    const handler = async () => {
      setLoading(true)
      setData(await stableCredit.name())
      setLoading(false)
    }
    handler()
  }, [stableCredit])

  return { name: data, loading }
}
