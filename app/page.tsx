import Link from "next/link";
import React from "react";
import styles from "./Home.module.css";
import links from "../lib/links";
import { Search } from "./Search";

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return (
    <>
      <h1>Welcome to RedditStories!</h1>

      <Search />

      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link} className={styles.card}>
            <Link href={`/r/${encodeURIComponent(link)}`}>{`/r/${link}`}→</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
