import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/Layout.module.css";

type Props = {
  title: string;
  children: any;
};

export default function Layout(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{props.title}</title>
        <meta
          name="description"
          content="Load textual subreddits very fast even on slow connections!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Link href="/" passHref>
          <h1 className={styles.title}>{props.title}</h1>
        </Link>
        {props.children}
      </main>
    </div>
  );
}
