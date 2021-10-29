import styles from '../styles/Post.module.css';

type Props = {
  post: any;
};

export default function Post({ post }: Props) {
  return (
    <article>
      <header>
        <h3 className={styles.title}>{post.title}</h3>
        <p>By: {post.author_fullname}</p>
        <p>Posted: {new Date(post.created_utc * 1000).toUTCString()}</p>
      </header>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: post.selftext }}
      ></div>
      <p>
        <a target="_blank" rel="noopener noreferrer" href={post.url}>
          Read thread
        </a>
      </p>
    </article>
  );
}
