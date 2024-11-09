type SeriesGameStatusProps = {
  startTimeUTC: string;
};

export default function SeriesGameStatus({
  startTimeUTC,
}: SeriesGameStatusProps) {
  const gameTime = new Date(startTimeUTC).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Toronto",
  });

  const gameDate = new Date(startTimeUTC).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mt-2 flex justify-between text-xs text-gray-500">
      <span>{gameDate}</span>
      <span>{gameTime} EDT</span>
    </div>
  );
}
