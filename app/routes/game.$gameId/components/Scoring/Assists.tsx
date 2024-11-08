import type { Assists } from "types/types";

type AssistsProps = {
  assists: Assists[];
  teamAbbrev: string;
  logo: string;
};

export default function Assists({ assists, teamAbbrev, logo }: AssistsProps) {
  const assistsStr =
    assists
      .map((assist) => {
        return `${assist.name.default} (${assist.assistsToDate})`;
      })
      .join(", ") || "Unassisted";

  return (
    <div className="flex items-center">
      <img width={30} src={logo} alt={teamAbbrev} />
      <span className="mr-1 text-xs text-gray-600">{assistsStr}</span>
    </div>
  );
}
