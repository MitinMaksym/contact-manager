import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePostSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [contacts, setContacts] = useState([])
  const [hasMore, setHasMore] = useState(false)
  let cancel
  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
      method: 'GET',
      url: 'http://localhost:9000/users/',
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      params: {
        name: query ? query : undefined,
        page: pageNumber,
        limit: 10
      }
    })
      .then((data) => {
        if (data.data.length) {
          setContacts((prev) => {
            return [...prev, ...data.data]
          })
        }
        setHasMore(data.data.length > 0)
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(cancel)) return
        setError(true)
      })

    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, contacts, hasMore }
}
