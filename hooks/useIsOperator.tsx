import { useMountedState } from "./useMountedState"
import { useCallback, useState, useEffect } from "react"
import { useAccessManagerContract } from "./useAccessManagerContract"
import { useAccount } from "wagmi"

export type IsOperator = {
  verifyRole: (address: string) => Promise<void>
  isOperator?: boolean
  loading: boolean
}

export const useIsOperator = (): IsOperator => {
  const { address } = useAccount()
  const accessManager = useAccessManagerContract()
  const [loading, setLoading] = useMountedState(false)
  const [isOperator, setIsOperator] = useState(false)

  const verifyRole = useCallback(async () => {
    const check = async (address: string) => {
      setLoading(true)

      try {
        if (!accessManager) {
          setLoading(false)
          return setIsOperator(false)
        }
        const validOperator = await accessManager.isOperator(address)
        setIsOperator(validOperator)
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    check(address || "")
  }, [accessManager, address])

  return {
    verifyRole,
    isOperator,
    get loading() {
      return loading
    },
  }
}
