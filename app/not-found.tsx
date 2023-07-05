import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <Link href="/" passHref>
        <h1>Not Found</h1>
      </Link>
      <p>Could not find requested resource</p>
    </>
  )
}
