"use client"

import React from "react"
import styles from "./Search.module.css"
import { useRouter } from "next/navigation"

export default function Search() {
  const router = useRouter()

  const onSearchSubmit = (event: any) => {
    event.preventDefault()
    const subreddit = encodeURIComponent(event.target.search.value)
    const formattedPath = `/r/${subreddit}`
    router.push(formattedPath, { forceOptimisticNavigation: true })
    //window.location.pathname = formattedPath;
  }

  return (
    <form className={styles.form} onSubmit={onSearchSubmit}>
      <input
        className={styles.search}
        type="search"
        name="search"
        placeholder="Type subreddit..."
      />
      <button>Go</button>
    </form>
  )
}
