import { useState, useEffect } from "react"
const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  // this is for update the options
  const setPostData = (data) => {
    setOptions({
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async (fetchOptions) => {
      const errorMessage = method === 'GET' ? 'Can not get recipes' : 'Can not add recipe'
      setError(null)
      setIsPending(true)
      try {
        const res = await fetch(url, {...fetchOptions, signal: controller.signal})
        if (!res.ok) throw new Error(res.statusText)

        const json = await res.json()
        await sleep(500)
        setData(json)
      } catch (err) {
        await sleep(500)
        console.log(err.message)
        err.name === 'AbortError'
          ? console.log('Abort the request')
          : setError(errorMessage)
        } finally {
        setIsPending(false)
      }
    }

    // send request depend on method 
    switch (method) {
      case 'GET':
        fetchData()
        break
      case 'POST':
        options && fetchData(options)
        break
      default:
        console.log('How do you get in?')
    }

    // clean function
    return () => controller.abort()
  }, [url, options, method])

  return { data, isPending, error, setPostData }
}