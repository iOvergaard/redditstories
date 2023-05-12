"use client";

import { useRouter } from "next/navigation";
import styles from "./Search.module.css";

export function Search(): JSX.Element {
  const router = useRouter();

  const onSearchSubmit = (event: any) => {
    event.preventDefault();
    const subreddit = event.target.search.value;
    router.push(`/r/${subreddit}`);
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
