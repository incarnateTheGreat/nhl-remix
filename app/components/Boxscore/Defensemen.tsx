import { createColumnHelper } from "@tanstack/react-table";

import BoxscoreTable from "./BoxscoreTable";

import { SkaterStats } from "~/types";

const columnHelper = createColumnHelper<SkaterStats>();

const columns = [
  columnHelper.accessor("sweaterNumber", {
    header: () => <span>#</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => <span>Forwards</span>,
    cell: (info) => info.cell.getValue().default,
  }),
  columnHelper.accessor("goals", {
    header: () => <span>G</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("assists", {
    header: () => <span>A</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("points", {
    header: () => <span>P</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("plusMinus", {
    header: () => <span>+/-</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("pim", {
    header: () => <span>POM</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("shots", {
    header: () => <span>S</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("powerPlayGoals", {
    header: () => <span>PPG</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hits", {
    header: () => <span>H</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("toi", {
    header: () => <span>TOI</span>,
    cell: (info) => info.getValue(),
  }),
];

type DefensemenProps = {
  defensemen: SkaterStats[];
};

export default function Defensemen({ defensemen }: DefensemenProps) {
  return <BoxscoreTable data={defensemen} columns={columns} />;
}
