import { NextApiRequest, NextApiResponse } from "next";
import { SubredditOpts, tryGetSubreddit } from "../../lib/reddit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { subreddit, after, count, raw } = req.query;

    if (!subreddit) {
      res.status(400).json({ error: "Subreddit is required" });
      return;
    }

    const opts: SubredditOpts = {};

    if (after) {
      opts.after = Array.isArray(after) ? after[0] : after;
    }

    if (count) {
      opts.count = +(Array.isArray(count) ? count[0] : count);
    }

    if (raw) {
      opts.raw = true;
    }

    const subredditData = await tryGetSubreddit(
      Array.isArray(subreddit) ? subreddit[0] : subreddit,
      opts
    );
    res.status(200).json(subredditData);
  } catch {
    res
      .status(400)
      .json({ error: "Something went wrong, could not reach Reddit" });
  }
}
