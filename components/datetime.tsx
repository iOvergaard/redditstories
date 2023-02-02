interface Props {
  date: Date;
}

export default function DateTime({ date }: Props): JSX.Element {
  const formatted = Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  }).format(date);
  return <time dateTime={date.toISOString()}>{formatted}</time>;
}
