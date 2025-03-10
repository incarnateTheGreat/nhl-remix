import { createColumnHelper } from "@tanstack/react-table";
import { SkaterStats } from "types/types";

const columnHelper = createColumnHelper<SkaterStats>();

const forwardActiveGame = [
  columnHelper.accessor("name", {
    header: () => <span>Forwards</span>,
    cell: (info) => info.cell.getValue().default,
    sortUndefined: "last",
  }),
  columnHelper.accessor("sweaterNumber", {
    header: () => <span>#</span>,
    cell: (info) => info.getValue(),
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
  columnHelper.accessor("shifts", {
    header: () => <span>Shf.</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("plusMinus", {
    header: () => <span>+/-</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("pim", {
    header: () => <span>PIM</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("sog", {
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
  columnHelper.accessor("faceoffWinningPctg", {
    header: () => <span>FO%</span>,
    cell: (info) => {
      if (!info.getValue()) {
        return "--";
      }

      return (info.getValue() * 100).toFixed(1);
    },
    sortUndefined: "last",
  }),
];

export default forwardActiveGame;
