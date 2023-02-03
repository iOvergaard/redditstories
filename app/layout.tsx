import "./global.css";
import React from "react";
import styles from "./Layout.module.css";

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
