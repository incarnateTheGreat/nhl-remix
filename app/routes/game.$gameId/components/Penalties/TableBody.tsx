import { useRouteLoaderData } from "@remix-run/react";
import { Game, PenaltiesType } from "types/types";

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
  const { awayTeam, homeTeam } = useRouteLoaderData(
    "routes/game.$gameId",
  ) as Game;

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

        const logo =
          penalty.teamAbbrev.default === homeTeam.abbrev
            ? homeTeam.logo
            : awayTeam.logo;

        const amendedPenaltyStr = penaltyStr(descKey);

        return (
          <tr
            key={idx}
            className="border-b border-b-slate-200/90 text-xs odd:bg-slate-200/45 md:text-sm"
          >
            <td className="w-12 p-2">
              <img width={40} src={logo} alt={`${teamAbbrev.default} Logo`} />
            </td>
            <td className="w-16 border-r border-gray-400 p-2 md:w-16">
              {timeInPeriod}
            </td>
            <td className="w-28 border-r border-gray-400 p-2 md:w-44">
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
