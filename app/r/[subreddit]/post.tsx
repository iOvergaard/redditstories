import styles from "./Post.module.css";
import DateTime from "./datetime";
import RedditImages from "./RedditImages";
import PostText from "./PostText";

type Props = {
  post: any;
  isFirst: boolean;
};

export default function Post({ post, isFirst }: Props): JSX.Element {
  return (
    <article className={styles.post}>
      <header>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.reddit.com${post.permalink}`}
        >
          <h2>{post.title}</h2>
        </a>
      </header>

      {!!post.video || post.images?.length ? (
        <RedditImages post={post} isFirst={isFirst} />
      ) : (
        <></>
      )}

      {!!post.selftext &&
        <PostText safetext={post.selftext} />
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
