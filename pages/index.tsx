import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import links from "../lib/links";

const Home: NextPage = () => {
  const router = useRouter();

  const navigateToSubreddit = (subreddit: string): void => {
    const url = `/r/${subreddit}`;
    router.push(url, url);
  };

  const onSearchSubmit = (event: any) => {
    event.preventDefault();
    navigateToSubreddit(event.target.search.value);
  };

  return (
    <Layout title="Welcome to RedditStories!">
      <form className={styles.form} onSubmit={onSearchSubmit}>
        <input
          className={styles.search}
          type="search"
          name="search"
          placeholder="Type subreddit..."
        />
        <button>Go</button>
      </form>

      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link} className={styles.card}>
            <Link href={link}>{link}→</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
