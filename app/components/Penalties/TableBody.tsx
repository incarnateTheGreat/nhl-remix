import { PenaltiesType } from "~/types";

type PenaltiesTableBodyProps = {
  penalties: PenaltiesType[];
};

export default function TableBody({ penalties }: PenaltiesTableBodyProps) {
  return (
    <tbody>
      {penalties.map((penalty, idx) => {
        const { teamAbbrev, committedByPlayer, descKey, timeInPeriod } =
          penalty;

        return (
          <tr
            key={idx}
            className="border-b border-b-slate-200/90 odd:bg-slate-200/45"
          >
            <td className="w-12 p-2">
              <img
                width={40}
                src={`https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`}
                alt={`${committedByPlayer} - ${descKey}`}
              />
            </td>
            <td className="w-16 p-2">{timeInPeriod}</td>
            <td className="p-2">
              {committedByPlayer} - {descKey}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
