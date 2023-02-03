export const revalidate = 300;
export default function SubredditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article>{children}</article>;
}
