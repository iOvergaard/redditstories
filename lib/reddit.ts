import { pick } from 'lodash';
import { getPlaiceholder } from 'plaiceholder';

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

  posts = await Promise.all(
    posts.map(async (post: any) => {
      post.images = [];
      if (post.preview?.images?.length) {
        post.images = await Promise.all(
          post.preview.images.map(async (image: any) => {
            const resolution = image.resolutions[image.resolutions.length - 1];
            const url = resolution.url.replace(/&amp;/g, "&");
            const { base64, img } = await getPlaiceholder(url);
            return { ...img, blurDataURL: base64, placeholder: "blur" };
          })
        );
        // post.images = post.preview.images.map(
        //   (image: any) => image.resolutions[image.resolutions.length - 1]
        // );
        // await Promise.all(
        //   post.images.map(async (image: any) => {
        //     const url = image.url.replace(/&amp;/g, "&");
        //     const { base64, img } = await getPlaiceholder(url);
        //     return { ...img, blurDataURL: base64 };
        //   })
        // );
      }

      return post;
    })
  );

  posts = posts.map((post: any) =>
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
