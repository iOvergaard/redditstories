import styles from "./Post.module.css";
import DateTime from "./datetime";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { PlaceholderText } from "../../../components/PlaceholderText";

type Props = {
  post: any;
  isFirst: boolean;
};

const ComponentImages = dynamic(() => import('./RedditImages'));
const ComponentText = dynamic(() => import('./PostText'))

export default function Post({ post, isFirst }: Props): JSX.Element {
  return (
    <article className={styles.post}>
      <header>
        <h2>{post.title}</h2>
      </header>

      <hr />

      {!!post.video || post.images?.length ? (
        <Suspense>
          <ComponentImages post={post} isFirst={isFirst} />
        </Suspense>
      ) : (
        <></>
      )}

      {!!post.selftext &&
        <Suspense fallback={<PlaceholderText textLength={post.selftext.length} />}>
          <ComponentText safetext={post.selftext} />
        </Suspense>
      }

      <footer>
        <p className={styles.byline}>
          <strong>{post.author}</strong>
          &nbsp;|&nbsp;
          <DateTime date={post.created_utc * 1000} />
          &nbsp;|&nbsp;
          <a target="_blank" rel="noopener noreferrer" href={post.url}>
            Link
          </a>
          &nbsp;|&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.reddit.com${post.permalink}`}
          >
            Comments ({post.num_comments})
          </a>
          &nbsp;|&nbsp;
          <strong>⬆️ {post.ups}</strong>
        </p>
      </footer>
    </article>
  );
}
