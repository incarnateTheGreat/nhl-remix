import type { Assists } from "~/types";
import { getLogo } from "~/utils";

type AssistsProps = {
  assists: Assists[];
  teamAbbrev: string;
};

export default function Assists({ assists, teamAbbrev }: AssistsProps) {
  return (
    <div className="flex items-center">
      <img width={30} src={getLogo(teamAbbrev)} alt={teamAbbrev} />
      {assists.length > 0 ? (
        assists.map((assist) => {
          return (
            <span key={assist.playerId} className="mr-1 text-sm text-gray-600">
              {assist.firstName.default} {assist.lastName.default}
            </span>
          );
        })
      ) : (
        <span className="mr-1 text-sm text-gray-600">Unassisted</span>
      )}
    </div>
  );
}
