type SeriesGameStatusProps = {
  startTimeUTC: string;
};

export default function SeriesGameStatus({
  startTimeUTC,
}: SeriesGameStatusProps) {
  const time = new Date(startTimeUTC).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-1 flex justify-between text-xs text-gray-500">
      <span>&nbsp;</span>
      <span>{time}</span>
    </div>
  );
}
