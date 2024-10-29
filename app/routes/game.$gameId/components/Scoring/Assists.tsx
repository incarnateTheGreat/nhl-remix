import type { Assists } from "types/types";

import { getLogo } from "~/utils";

type AssistsProps = {
  assists: Assists[];
  teamAbbrev: string;
};

export default function Assists({ assists, teamAbbrev }: AssistsProps) {
  const assistsStr =
    assists
      .map((assist) => {
        return `${assist.name.default} (${assist.assistsToDate})`;
      })
      .join(", ") || "Unassisted";

  return (
    <div className="flex items-center">
      <img width={30} src={getLogo(teamAbbrev)} alt={teamAbbrev} />
      <span className="mr-1 text-sm text-gray-600">{assistsStr}</span>
    </div>
  );
}
