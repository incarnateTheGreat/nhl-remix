type TableHeaderProps = {
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
};

export default function TableHeader({
  awayTeamAbbrev,
  homeTeamAbbrev,
}: TableHeaderProps) {
  return (
    <thead>
      <tr className="text-xs">
        <th className="w-1/3 pb-2 text-center">Period</th>
        <th className="w-1/3 pb-2 text-center">{awayTeamAbbrev}</th>
        <th className="w-1/3 pb-2 text-center">{homeTeamAbbrev}</th>
      </tr>
    </thead>
  );
}
