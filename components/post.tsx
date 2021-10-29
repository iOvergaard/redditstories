import Image from 'next/image';

import styles from '../styles/Post.module.css';

type Props = {
  post: any;
};

const RedditImages = ({ images }: any): JSX.Element => (
  <>
    {images.length
      ? images.map((image: any) => (
          <Image
            key={image.url}
            alt=""
            src={image.url}
            width={image.width}
            height={image.height}
            layout="responsive"
          />
        ))
      : ""}
  </>
);

export default function Post({ post }: Props) {
  console.log(post.images);
  return (
    <article className={styles.post}>
      <header>
        <h3>{post.title}</h3>
        <p className={styles.byline}>
          Posted {new Date(post.created_utc * 1000).toUTCString()} by{" "}
          {post.author} with {post.ups} upvotes
        </p>
      </header>
      <hr />
      <RedditImages images={post.images} />
      <div dangerouslySetInnerHTML={{ __html: post.selftext }}></div>
      <p>
        <a target="_blank" rel="noopener noreferrer" href={post.url}>
          See comments ({post.num_comments})
        </a>
      </p>
    </article>
  );
}
