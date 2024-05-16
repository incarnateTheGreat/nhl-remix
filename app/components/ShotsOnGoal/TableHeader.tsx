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
        <th className="text-center w-1/3">Period</th>
        <th className="text-center w-1/3">{awayTeamAbbrev}</th>
        <th className="text-center w-1/3">{homeTeamAbbrev}</th>
      </tr>
    </thead>
  );
}
