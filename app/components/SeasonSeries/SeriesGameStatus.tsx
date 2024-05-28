type SeriesGameStatusProps = {
  startTimeUTC: string;
};

export default function SeriesGameStatus({
  startTimeUTC,
}: SeriesGameStatusProps) {
  const time = new Date(startTimeUTC).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
  });

  return (
    <div className="flex justify-between text-xs text-gray-500">
      <span>&nbsp;</span>
      <span>{time}</span>
    </div>
  );
}
