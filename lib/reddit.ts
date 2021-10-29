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
  posts = posts.map((post: any) =>
    pick(post, [
      "id",
      "title",
      "selftext",
      "selftext_html",
      "author_fullname",
      "created_utc",
      "url",
    ])
  );
  return posts;
}
