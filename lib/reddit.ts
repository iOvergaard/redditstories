import { pick } from "lodash";
import { marked } from "marked";
import { getPlaiceholder } from "plaiceholder";
import sanitizeHtml from "sanitize-html";

export type SubredditOpts = {
  after?: string;
  count?: number;
  raw?: boolean;
};

async function getPlaiceholderImage(url: string, hasPriority = false) {
  url = url.replace(/&amp;/g, "&");
  const { base64, img } = await getPlaiceholder(url);
  return {
    ...img,
    blurDataURL: base64,
    placeholder: "blur",
    priority: hasPriority,
  };
}

export async function tryGetSubreddit(name: string, opts?: SubredditOpts) {
  const baseUrl = "https://www.reddit.com/";
  if (!name) {
    throw new Error("No name provided");
  }

  let requestUrl = `${baseUrl}r/${name}.json?raw_json=1`;

  if (opts?.after) {
    requestUrl += `&after=${opts.after}`;
  }

  if (opts?.count) {
    requestUrl += `&count=${opts.count}`;
  }

  console.log("[Reddit] Making a request for", requestUrl);

  const meta = await fetch(requestUrl)
    .then((r) => r.json())
    .catch(() => undefined);

  if (!meta?.data?.children?.length) {
    throw new Error("No data");
  }

  const after = meta.data.after;

  let posts = meta.data.children
    .filter((post: any) => !post.data.stickied)
    .map((post: any) => post.data);

  posts = await Promise.all(
    posts.map(async (post: any, i: number) => {
      if (post.preview?.images?.length) {
        post.images = await Promise.all(
          post.preview.images.map(async (image: any) => {
            try {
              const resolution = image.source;
              const plaiceholder = await getPlaiceholderImage(
                resolution.url,
                i === 0
              );
              return {
                ...resolution,
                priority: i === 0,
                blurDataURL: plaiceholder.blurDataURL,
              };
            } catch (e) {
              console.error("Something went wrong", e);
              return null;
            }
          })
        );
      }

      if (post.media?.reddit_video) {
        post.video = {
          src: post.media.reddit_video.fallback_url,
          isGif: post.media.reddit_video.is_gif,
        };
      }

      return post;
    })
  );

  posts = posts
    .map((post: any) => {
      try {
        post.selftext = marked(post.selftext, { mangle: true });
        post.selftext = sanitizeHtml(post.selftext);
      } catch (e) {
        console.error("Could not parse selftext", e);
      }
      return post;
    })
    .map((post: any) =>
      opts?.raw
        ? post
        : pick(post, [
            "id",
            "title",
            "selftext",
            "author",
            "created_utc",
            "url",
            "permalink",
            "ups",
            "num_comments",
            "images",
            "video",
          ])
    );
  return { after, posts };
}
