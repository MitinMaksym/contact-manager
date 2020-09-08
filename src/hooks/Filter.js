import React, { useState, useRef, useCallback } from 'react'
import usePostSearch from './hooks/usePostSearch'
import Contact from './Contacts/Contact/Contact'

export default function Filter() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, error, contacts, hasMore } = usePostSearch(query, pageNumber)
  const observer = useRef()
  const lastContactElement = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('1')
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        name="name"
        id="name"
      />
      {contacts.map((c, idx) => {
        if (contacts.length === idx + 1) {
          return <Contact contact={c} key={c.id} myRef={lastContactElement} />
        }
        return <Contact contact={c} key={idx + c.id} />
      })}
      {loading && <div>loading...</div>}
      {error && <div>error</div>}
    </>
  )
}
