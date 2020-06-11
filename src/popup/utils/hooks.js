import { useEffect } from "react"

export function useDidMount(cb) {
  useEffect(() => {
    const cleanup = cb()
    return () => {
      cleanup && cleanup()
    }
  }, [])
}