import { createColumnHelper } from "@tanstack/react-table";
import { GoalieStats } from "types/types";

const columnHelper = createColumnHelper<GoalieStats>();

const goaliePreGame = [
  columnHelper.accessor("sweaterNumber", {
    header: () => <span>#</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("name", {
    header: () => <span>Goaltenders</span>,
    cell: (info) => info.cell.getValue().default,
    sortUndefined: "last",
  }),
  columnHelper.accessor("gamesPlayed", {
    header: () => <span>GP</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("wins", {
    header: () => <span>W</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("losses", {
    header: () => <span>L</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("otLosses", {
    header: () => <span>OT</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("goalsAgainst", {
    header: () => <span>GA</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("goalsAgainstAvg", {
    header: () => <span>GAA</span>,
    sortUndefined: "last",
    cell: (info) => {
      if (!info.getValue()) {
        return "--";
      }

      return info.getValue().toFixed(2);
    },
  }),
  columnHelper.accessor("shotsAgainst", {
    header: () => <span>SA</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("savePctg", {
    header: () => <span>SV%</span>,
    sortUndefined: "last",
    cell: (info) => {
      if (!info.getValue()) {
        return "--";
      }

      return ((info.getValue() * 100) / 100).toFixed(3).substring(1);
    },
  }),
  columnHelper.accessor("min", {
    header: () => <span>TOI</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
];

export default goaliePreGame;
