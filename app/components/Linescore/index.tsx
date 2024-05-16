import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

import { LinescoreByPeriod, LinescoreTotals } from "~/types";

export type LinescoreProps = {
  byPeriod: LinescoreByPeriod;
  totals: LinescoreTotals;
  awayTeamAbbrev: string;
  awayTeamLogo: string;
  homeTeamAbbrev: string;
  homeTeamLogo: string;
};

export default function Linescore(props: LinescoreProps) {
  const { byPeriod } = props;

  return (
    <div className="flex w-96 flex-col overflow-x-auto border p-4">
      <h3 className="font-bold">Linescore</h3>
      <table>
        <TableHeader byPeriod={byPeriod} />
        <TableBody {...props} />
      </table>
    </div>
  );
}
