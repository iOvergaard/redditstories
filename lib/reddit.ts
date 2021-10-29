import { pick } from 'lodash';

export async function tryGetSubreddit(name: string) {
  const baseUrl = "https://www.reddit.com/";
  if (!name) {
    throw new Error("No name provided");
  }

  const meta = await fetch(`${baseUrl}r/${name}.json`)
    .then((r) => r.json())
    .catch(() => undefined);

  if (!meta) {
    throw new Error("No data");
  }

  let posts = meta.data.children
    .filter((post: any) => !post.data.stickied)
    .map((post: any) => post.data);
  posts = posts
    .map((post: any) => {
      post.images = [];
      if (post.preview?.images?.length) {
        post.images = post.preview.images.map(
          (image: any) => image.resolutions[image.resolutions.length - 1]
        );
        post.images.forEach(
          (image: any) => (image.url = image.url.replace(/&amp;/g, "&"))
        );
      }

      return post;
    })
    .map((post: any) =>
      pick(post, [
        "id",
        "title",
        "selftext",
        "author",
        "created_utc",
        "url",
        "ups",
        "num_comments",
        "images",
      ])
    );
  return posts;
}
