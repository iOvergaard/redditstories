import Image from "next/image";

import styles from "../styles/Post.module.css";

type Props = {
  post: any;
};

const RedditImages = ({ images }: any): JSX.Element => (
  <>
    {images.length
      ? images.map((image: any) => (
          <Image
            key={image.src}
            alt=""
            layout="responsive"
            sizes="756px"
            {...image}
          />
        ))
      : ""}
  </>
);

export default function Post({ post }: Props) {
  return (
    <article className={styles.post}>
      <header>
        <h2>{post.title}</h2>
        <p className={styles.byline}>
          Posted {new Date(post.created_utc * 1000).toUTCString()} by{" "}
          {post.author} with {post.ups} upvotes
        </p>
      </header>
      <hr />
      <RedditImages images={post.images} />
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: post.selftext }}
      ></div>
      <p>
        <a target="_blank" rel="noopener noreferrer" href={post.url}>
          See comments ({post.num_comments})
        </a>
      </p>
    </article>
  );
}
