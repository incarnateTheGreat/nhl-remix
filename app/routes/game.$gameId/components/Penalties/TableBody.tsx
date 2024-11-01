import { PenaltiesType } from "types/types";

import { getLogo } from "~/utils";

function penaltyStr(str: string) {
  let amendedStr;

  if (str.includes("delaying-game") || str.includes("too-many-men")) {
    const delayOfGameName = "Delay of Game";
    const delayOfGameAction = str.split("-").slice(2, str.length);

    const delayOfGameActionStr = delayOfGameAction
      .map((e) => {
        return e.charAt(0).toUpperCase() + e.slice(1);
      })
      .join(" ");

    amendedStr = `${delayOfGameName} (${delayOfGameActionStr})`;
  } else {
    const strLength = str.split("-").length;

    if (strLength > 2) {
      amendedStr = str.replaceAll("-", " ");
    } else {
      amendedStr = str
        .split("-")
        .map((e) => {
          return e.charAt(0).toUpperCase() + e.slice(1);
        })
        .join("-");
    }
  }

  return amendedStr;
}

type PenaltiesTableBodyProps = {
  penalties: PenaltiesType[];
};

export default function TableBody({ penalties }: PenaltiesTableBodyProps) {
  return (
    <tbody>
      {penalties.map((penalty, idx) => {
        const {
          teamAbbrev,
          committedByPlayer,
          descKey,
          timeInPeriod,
          servedBy,
        } = penalty;

        const amendedPenaltyStr = penaltyStr(descKey);

        return (
          <tr
            key={idx}
            className="border-b border-b-slate-200/90 odd:bg-slate-200/45"
          >
            <td className="w-12 p-2">
              <img
                width={40}
                src={getLogo(teamAbbrev.default)}
                alt={`${teamAbbrev.default} Logo`}
              />
            </td>
            <td className="border-r border-gray-400 p-2 md:w-16">
              {timeInPeriod}
            </td>
            <td className="border-r border-gray-400 p-2 md:w-48">
              {committedByPlayer ? `${committedByPlayer}` : "Team"}{" "}
            </td>
            <td className="p-2 capitalize">
              {amendedPenaltyStr} {servedBy ? `(Served by ${servedBy})` : null}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
