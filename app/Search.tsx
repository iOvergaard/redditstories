"use client";

import React from "react";
import styles from "./Search.module.css";

export function Search() {
  const onSearchSubmit = (event: any) => {
    event.preventDefault();
    const subreddit = encodeURIComponent(event.target.search.value);
    window.location.href = `/r/${subreddit}`
  };

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
  );
}
