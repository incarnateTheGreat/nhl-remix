import type { Assists } from "~/types";

type AssistsProps = {
  assists: Assists[];
};

export default function Assists({ assists }: AssistsProps) {
  return (
    <div>
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
