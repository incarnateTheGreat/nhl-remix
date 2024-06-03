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
      <tr>
        <th className="w-1/3 text-center text-sm">Period</th>
        <th className="w-1/3 text-center text-sm">{awayTeamAbbrev}</th>
        <th className="w-1/3 text-center text-sm">{homeTeamAbbrev}</th>
      </tr>
    </thead>
  );
}
