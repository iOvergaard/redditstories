import Link from "next/link";
import Spinner from "../../../components/Spinner";

export default function Loading(): JSX.Element {
  return (
    <>
      <Link href="/" passHref>
        <h1>Loading subreddit</h1>
      </Link>
      <Spinner />
    </>
  );
}
