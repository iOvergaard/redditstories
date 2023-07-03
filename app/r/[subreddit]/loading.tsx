import Link from "next/link";
import Spinner from "../../../components/Spinner";
import { PlaceholderText } from "../../../components/PlaceholderText";

export default function Loading(): JSX.Element {
  return (
    <>
      <Link href="/" passHref>
        <h1>Loading subreddit</h1>
      </Link>
      <Spinner />
      <PlaceholderText textLength={100} />
    </>
  );
}
