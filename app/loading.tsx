import Link from "next/link";
import { Spinner } from "../components/Spinner";

export default function Loading(): JSX.Element {
  return (
    <>
      <Link href="/" passHref>
        <h1>Welcome to RedditStories!</h1>
      </Link>
      <Spinner />
    </>
  );
}
