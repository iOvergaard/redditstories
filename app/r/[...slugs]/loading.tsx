import Spinner from "@/components/Spinner"
import Link from "next/link"

export default function Loading(): JSX.Element {
  return (
    <>
      <Link href="/" passHref>
        <h1>Loading subreddit</h1>
      </Link>
      <Spinner />
    </>
  )
}
