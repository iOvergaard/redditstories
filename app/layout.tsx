import "./global.css"
import React from "react"
import styles from "./Layout.module.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | RedditStories",
    default: "RedditStories",
  },
  description: "Load textual subreddits very fast even on slow connections!",
  manifest: "/manifest.json",
  themeColor: "#fff",
  appleWebApp: {
    statusBarStyle: "default",
    title: "RedditStories",
    startupImage: "/images/icons/icon-512x512.png",
  },
  viewport: "width=device-width, initial-scale=1.0",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  )
}
