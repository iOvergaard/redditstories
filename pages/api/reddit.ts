import { NextApiRequest, NextApiResponse } from "next";
import { tryGetSubreddit } from "../../lib/reddit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { subreddit } = req.query;
    const subredditData = await tryGetSubreddit(
      Array.isArray(subreddit) ? subreddit[0] : subreddit
    );
    res.status(200).json(subredditData);
  } catch {
    res
      .status(400)
      .json({ error: "Something went wrong, could not reach Reddit" });
  }
}
