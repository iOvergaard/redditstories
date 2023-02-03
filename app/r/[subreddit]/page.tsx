import paths from "../../../lib/links";
import styles from "./Subreddit.module.css";
import Link from "next/link";
import { tryGetSubreddit } from "../../../lib/reddit";
import { notFound } from "next/navigation";
import Post from "./post";

interface Params {
  params: {
    subreddit: string;
  };
  searchParams: {
    after: string;
    count: string;
  };
}

export const revalidate = 300;

export default async function Page({ params, searchParams }: Params) {
  console.log("params", params);
  const subreddit = params.subreddit;
  const after = searchParams.after;
  const count = searchParams.count ? parseInt(searchParams.count) : 0;

  const data = await tryGetSubreddit(subreddit, { after, count });

  if (!data) {
    notFound();
  }

  return (
    <article>
      <Link href="/" passHref>
        <h1 className={styles.title}>{subreddit}</h1>
      </Link>
      {data.posts?.length
        ? data.posts.map((post: any) => <Post key={post.id} post={post} />)
        : "This subreddit has no posts"}

      <Link href={`/r/${subreddit}?after=${data.after}&count=${count + 25}`}>
        Next page
      </Link>
    </article>
  );
}

export function generateStaticParams() {
  return paths.map((subreddit) => ({ subreddit }));
}
