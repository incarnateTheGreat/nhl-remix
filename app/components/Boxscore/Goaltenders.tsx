import { createColumnHelper } from "@tanstack/react-table";

import BoxscoreTable from "./BoxscoreTable";

import { GoalieStats } from "~/types";

const columnHelper = createColumnHelper<GoalieStats>();

const columns = [
  columnHelper.accessor("sweaterNumber", {
    header: () => <span>#</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => <span>Forwards</span>,
    cell: (info) => info.cell.getValue().default,
  }),
  columnHelper.accessor("evenStrengthShotsAgainst", {
    header: () => <span>EV</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("powerPlayShotsAgainst", {
    header: () => <span>PP</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("shorthandedShotsAgainst", {
    header: () => <span>SH</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("saveShotsAgainst", {
    header: () => <span>Saves-Shots</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("savePctg", {
    header: () => <span>SV%</span>,
    cell: (info) => info.getValue() ?? "--",
  }),
  columnHelper.accessor("toi", {
    header: () => <span>TOI</span>,
    cell: (info) => info.getValue(),
  }),
];

type GoaltendersProps = {
  goaltenders: GoalieStats[];
};

export default function Goaltenders({ goaltenders }: GoaltendersProps) {
  return <BoxscoreTable data={goaltenders} columns={columns} />;
}
