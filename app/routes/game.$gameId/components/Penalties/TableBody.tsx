import { PenaltiesType } from "~/types";
import { getLogo } from "~/utils";

function penaltyStr(str: string) {
  let amendedStr;

  if (str.includes("delaying-game")) {
    let delayOfGameName = "Delay of Game";
    const delayOfGameAction = str.split("-").slice(2, str.length);

    const delayOfGameActionStr = delayOfGameAction
      .map((e) => {
        return e.charAt(0).toUpperCase() + e.slice(1);
      })
      .join(" ");

    return (amendedStr = `${delayOfGameName} (${delayOfGameActionStr})`);
  } else {
    return (amendedStr = str
      .split("-")
      .map((e) => {
        return e.charAt(0).toUpperCase() + e.slice(1);
      })
      .join("-"));
  }
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
            <td className="w-16 border-r border-gray-400 p-2">
              {timeInPeriod}
            </td>
            <td className="w-48 border-r border-gray-400 p-2">
              {committedByPlayer ? `${committedByPlayer}` : null}{" "}
            </td>
            <td className="p-2">
              {amendedPenaltyStr} {servedBy ? `(Served by ${servedBy})` : null}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
