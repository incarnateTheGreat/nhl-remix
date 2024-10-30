import { createColumnHelper } from "@tanstack/react-table";
import { GoalieStats } from "types/types";

const columnHelper = createColumnHelper<GoalieStats>();

const goalieActiveGame = [
  columnHelper.accessor("name", {
    header: () => <span>Goaltenders</span>,
    cell: (info) => info.cell.getValue().default,
    sortUndefined: "last",
  }),
  columnHelper.accessor("sweaterNumber", {
    header: () => <span>#</span>,
    cell: (info) => info.getValue(),
    sortUndefined: "last",
  }),
  columnHelper.accessor("evenStrengthShotsAgainst", {
    header: () => <span>EV</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("powerPlayShotsAgainst", {
    header: () => <span>PP</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("shorthandedShotsAgainst", {
    header: () => <span>SH</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
  columnHelper.accessor("saveShotsAgainst", {
    header: () => <span>Saves-Shots</span>,
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
  columnHelper.accessor("toi", {
    header: () => <span>TOI</span>,
    cell: (info) => info.getValue() ?? "--",
    sortUndefined: "last",
  }),
];

export default goalieActiveGame;
