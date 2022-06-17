import { useState, useEffect, useRef } from "react"
const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const options = useRef(_options).current

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setError(null)
      setIsPending(true)
      try {
        const res = await fetch(url, {signal: controller.signal})
        if (!res.ok) throw new Error(res.statusText)

        const json = await res.json()
        await sleep(500)
        setData(json)
      } catch (err) {
        console.log(err.message)
        err.name === 'AbortError'
          ? console.log('Abort the request')
          : setError('Can not get recipes')
        } finally {
        setIsPending(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [url, options])

  return { data, isPending, error }
}