import { useMountedState } from "./useMountedState"
import { useCallback, useState } from "react"
import { useAccessManagerContract } from "./useAccessManagerContract"

export type IsOperator = {
  check: (address: string) => Promise<void>
  isOperator?: boolean
  loading: boolean
}

export const useIsOperator = (): IsOperator => {
  const accessManager = useAccessManagerContract()
  const [loading, setLoading] = useMountedState(false)
  const [isOperator, setIsOperator] = useState(false)

  const check = useCallback(async (address: string) => {
    setLoading(true)

    try {
      if (!accessManager) {
        setLoading(false)
        return setIsOperator(false)
      }
      setIsOperator(await accessManager.isOperator(address))
      return setLoading(false)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    check,
    isOperator,
    get loading() {
      return loading
    },
  }
}
