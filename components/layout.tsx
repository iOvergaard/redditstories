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
      <main className={styles.main}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>{props.title}</h1>
          </a>
        </Link>
        {props.children}
      </main>
    </div>
  );
}
