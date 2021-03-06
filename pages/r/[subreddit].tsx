import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import Layout from '../../components/layout';
import Post from '../../components/post';
import paths from '../../lib/links';
import { tryGetSubreddit } from '../../lib/reddit';
import styles from '../../styles/Subreddit.module.css';


type Props = {
  subredditName: string;
  subreddit: any;
};

const Subreddit: NextPage<Props> = (props: Props) => {
  const [after, setAfter] = useState<string>(props.subreddit.after);
  const [count, setCount] = useState(25);
  const [posts, setPosts] = useState<any>(props.subreddit.posts);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [posts]);

  const onLoadMore = async () => {
    setIsLoading(true);
    const requestUrl = `/api/subreddit?subreddit=${props.subredditName}&after=${after}&count=${count}`;
    const response = await fetch(requestUrl).then((r) => r.json());

    if (response) {
      setAfter(response.after);
      setCount(oldCount => oldCount + 25);
      setPosts((oldPosts: any) => [...oldPosts, ...response.posts]);
    }

    setIsLoading(false);
  };

  return (
    <Layout title={props.subredditName}>
      <Head>
        <title>RedditStories - {props.subredditName}</title>
        <meta
          name="description"
          content="Load textual subreddits very fast even on slow connections!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {posts?.length
        ? posts.map((post: any) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))
        : "No posts found"}
      <button type="button" onClick={onLoadMore}>
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </Layout>
  );
};

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<Props>
): Promise<GetStaticPropsResult<Props>> {
  const subredditName = context.params?.subreddit;

  if (!subredditName) {
    return {
      notFound: true,
    };
  }

  try {
    let subreddit = await tryGetSubreddit(subredditName);

    if (!subreddit) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        subredditName,
        subreddit,
      },
      revalidate: 300,
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default Subreddit;
