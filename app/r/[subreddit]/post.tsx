import styles from "./Post.module.css";
import DateTime from "./datetime";
import { lazy, Suspense } from "react";

type Props = {
  post: any;
};

const RedditImages = lazy(() => import("./RedditImages"));

export default function Post({ post }: Props): JSX.Element {
  return (
    <article className={styles.post}>
      <header>
        <h2>{post.title}</h2>
        <p className={styles.byline}>
          Posted <DateTime date={post.created_utc * 1000} /> by {post.author}{" "}
          with {post.ups} upvotes
        </p>
      </header>
      <hr />
      {post.video || post.images?.length ? (
        <Suspense fallback={<p>Rendering media</p>}>
          <RedditImages post={post} />
        </Suspense>
      ) : (
        <></>
      )}
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: post.selftext }}
      ></div>
      <p>
        <a target="_blank" rel="noopener noreferrer" href={post.url}>
          Go to post
        </a>
        &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.reddit.com${post.permalink}`}
        >
          See comments ({post.num_comments})
        </a>
      </p>
    </article>
  );
}
