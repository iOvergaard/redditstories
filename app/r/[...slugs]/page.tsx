import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import styles from "./Subreddit.module.css"
import Post from "./post"
import { tryGetSubreddit } from "@/lib/reddit"

type Props = {
  params: {
    slugs: string[]
  }
}

export const revalidate = 10

export function generateMetadata({ params: { slugs } }: Props): Metadata {
  const subreddit = slugs[0]

  return {
    title: `r/${subreddit}`,
    description: `r/${subreddit} on reddit`,
  }
}

export default async function Page({ params: { slugs } }: Props) {
  const subreddit = slugs[0]
  const after = slugs[1]
  const count = slugs[2] ? parseInt(slugs[2]) : undefined

  const data = await tryGetSubreddit(subreddit, { after, count })

  if (!data) {
    notFound()
  }

  const renderNextPageLink = () => {
    if (!data.after) {
      return null
    }

    const nextCount = count ?? 0 + data.posts.length

    return (
      <Link href={`/r/${subreddit}/${data.after}/${nextCount}`}>
        Next page →
      </Link>
    )
  }

  const renderRefreshLink = () => (
    <Link href={`/r/${subreddit}`}>Refresh 🔃</Link>
  )

  return (
    <article>
      <Link href="/" passHref>
        <h1 className={styles.title}>{subreddit}</h1>
      </Link>
      {data.posts?.length
        ? data.posts.map((post: any, index: number) => (
            <Post key={post.id} post={post} isFirst={index === 0} />
          ))
        : "This subreddit has no posts"}
      <footer>
        {renderRefreshLink()}
        &nbsp;|&nbsp;
        {renderNextPageLink()}
      </footer>
    </article>
  )
}
