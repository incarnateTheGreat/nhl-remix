import type { Assists } from "~/types";

type AssistsProps = {
  assists: Assists[];
  teamAbbrev?: string;
};

export default function Assists({ assists, teamAbbrev }: AssistsProps) {
  return (
    <div>
      {assists.length > 0 ? (
        <div className="flex items-center">
          <img
            width={30}
            src={`https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`}
            alt={teamAbbrev}
          />
          {assists.map((assist) => {
            return (
              <span
                key={assist.playerId}
                className="mr-1 text-sm text-gray-600"
              >
                {assist.firstName.default} {assist.lastName.default}
              </span>
            );
          })}
        </div>
      ) : (
        <span className="mr-1 text-sm text-gray-600">Unassisted</span>
      )}
    </div>
  );
}
