import "server-only"

import { pick } from "lodash"

export type SubredditOpts = {
  after?: string
  count?: number
  raw?: boolean
}

export async function tryGetSubreddit(name: string, opts?: SubredditOpts) {
  const baseUrl = "https://www.reddit.com/"
  if (!name) {
    throw new Error("No name provided")
  }

  let requestUrl = `${baseUrl}r/${name}.json?raw_json=1`

  if (opts?.after) {
    requestUrl += `&after=${opts.after}`
  }

  if (opts?.count) {
    requestUrl += `&count=${opts.count}`
  }

  console.log("[Reddit] Making a request for", requestUrl)

  try {
    const request = await fetch(requestUrl, { next: { revalidate: 300 } })

    if (!request.ok) {
      throw new Error("Request to Reddit not ok")
    }

    const meta = await request.json()
    if (!meta?.data?.children?.length) {
      throw new Error("No data")
    }

    const after = meta.data.after

    let posts = meta.data.children
      .filter((post: any) => !post.data.stickied)
      .map((post: any) => post.data)

    posts = await Promise.all(
      posts.map(async (post: any, index: number) => {
        console.log(`[Reddit] Processing post ${index + 1}/${posts.length}`)

        if (post.preview?.images?.length) {
          post.images = await Promise.all(
            post.preview.images.map((image: any) => {
              let resolution

              // First check if it has a variants.gif.source property and use that instead
              if (image.variants?.gif?.source) {
                resolution = image.variants.gif.source
              } else {
                resolution = image.source
              }

              return resolution.url
            }),
          )
        }

        if (post.media?.reddit_video) {
          post.video = {
            src: post.media.reddit_video.fallback_url,
            isGif: post.media.reddit_video.is_gif,
          }
        } else if (post.preview?.reddit_video_preview) {
          post.video = {
            src: post.preview.reddit_video_preview.fallback_url,
            isGif: post.preview.reddit_video_preview.is_gif,
          }
        }

        if (!opts?.raw) {
          pick(post, [
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
        }

        return post
      }),
    )
    return { after, posts }
  } catch (e) {
    // throw new Error(`Could not fetch data: ${(e as Error).message}`);
    console.error(`Could not fetch data: ${(e as Error).message}`)
    return null
  }
}
