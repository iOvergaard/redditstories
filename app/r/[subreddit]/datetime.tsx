"use client";

interface Props {
  date: number;
}

export default function DateTime({ date }: Props): JSX.Element {
  const dateObj = new Date(date);
  const formatted = Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  }).format(dateObj);
  return <time dateTime={dateObj.toISOString()}>{formatted}</time>;
}
