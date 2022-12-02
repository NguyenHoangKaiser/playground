import { parseISO, formatDistanceToNow } from "date-fns";

export default function TimeAgo({ timestamp }: { timestamp: string }) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span className="text-end" title={timestamp}>
      <i>{timeAgo}</i>
    </span>
  );
}
