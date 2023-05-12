import paths from "../../../lib/links";
import styles from "./Subreddit.module.css";
import Link from "next/link";
import { tryGetSubreddit } from "../../../lib/reddit";
import { notFound } from "next/navigation";
import Post from "./post";
import { Metadata } from "next";

type Props = {
  params: {
    subreddit: string;
  };
};

export const revalidate = 300;

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `r/${params.subreddit}`,
    description: `r/${params.subreddit} on reddit`,
  };
}

export default async function Page({ params }: Props) {
  const subreddit = params.subreddit;

  const data = await tryGetSubreddit(subreddit);

  if (!data) {
    notFound();
  }

  return (
    <article>
      <Link href="/" passHref>
        <h1 className={styles.title}>{subreddit}</h1>
      </Link>
      {data.posts?.length
        ? data.posts.map((post: any, index: number) => <Post key={post.id} post={post} isFirst={index === 0} />)
        : "This subreddit has no posts"}
    </article>
  );
}

export function generateStaticParams() {
  return paths.map((subreddit) => ({ subreddit }));
}
