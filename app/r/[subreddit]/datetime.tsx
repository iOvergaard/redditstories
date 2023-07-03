"use client";

interface Props {
  date: number;
}

export default function DateTime({ date }: Props): JSX.Element {
  const dateObj = new Date(date);
  const formatted = Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(dateObj);
  return <time dateTime={dateObj.toISOString()} style={{display:"inline-block"}}>{formatted}</time>;
}
