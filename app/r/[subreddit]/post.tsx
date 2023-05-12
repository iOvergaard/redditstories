import styles from "./Post.module.css";
import DateTime from "./datetime";
import { Suspense } from "react";
import dynamic from "next/dynamic";

type Props = {
  post: any;
};

const ComponentImages = dynamic(() => import('./RedditImages'));
const ComponentText = dynamic(() => import('./PostText'))

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

      {!!post.video || post.images?.length ? (
        <Suspense fallback={<p>Rendering media</p>}>
          <ComponentImages post={post} />
        </Suspense>
      ) : (
        <></>
      )}

      {!!post.selftext &&
        <Suspense fallback={''}>
          <ComponentText safetext={post.selftext} />
        </Suspense>
      }

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
