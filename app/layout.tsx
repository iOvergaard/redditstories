import "./global.css";
import React from "react";
import styles from "./Layout.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | RedditStories',
    default: 'RedditStories',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
