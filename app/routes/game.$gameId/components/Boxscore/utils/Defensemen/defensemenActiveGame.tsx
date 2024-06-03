import { createColumnHelper } from "@tanstack/react-table";

import { SkaterStats } from "~/types";

const columnHelper = createColumnHelper<SkaterStats>();

const defensemenActiveGame = [
  columnHelper.accessor("sweaterNumber", {
    header: () => <span>#</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("name", {
    header: () => <span>Defensemen</span>,
    cell: (info) => info.cell.getValue().default,
    sortUndefined: "last",
  }),
  columnHelper.accessor("goals", {
    header: () => <span>G</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("assists", {
    header: () => <span>A</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("points", {
    header: () => <span>P</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("plusMinus", {
    header: () => <span>+/-</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("pim", {
    header: () => <span>POM</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("shots", {
    header: () => <span>S</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("powerPlayGoals", {
    header: () => <span>PPG</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("hits", {
    header: () => <span>H</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("toi", {
    header: () => <span>TOI</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
];

export default defensemenActiveGame;