export default function Head({ params }: { params: { subreddit: string } }) {
  return (
    <>
      <title>{params.subreddit}</title>
    </>
  );
}
