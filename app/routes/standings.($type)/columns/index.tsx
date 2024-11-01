import { createColumnHelper } from "@tanstack/react-table";
import { TeamStandings } from "types/standings";

const columnHelper = createColumnHelper<TeamStandings>();

export const STANDING_TYPES = {
  Division: "DIVISION",
  Conference: "CONFERENCE",
  Wild_Card: "WILD_CARD",
  League: "LEAGUE",
};

export default function getStandingsColumns(type: string) {
  return [
    columnHelper.accessor("teamName.default", {
      header: () => <span>Team</span>,
      cell: (info) => {
        const {
          divisionSequence,
          teamLogo,
          teamName,
          conferenceSequence,
          leagueSequence,
        } = info.row.original;

        let rankSequence;

        switch (type) {
          case STANDING_TYPES.Division:
            rankSequence = divisionSequence;
            break;
          case STANDING_TYPES.Wild_Card:
            rankSequence = +info.cell.row.id + 1;
            break;
          case STANDING_TYPES.Conference:
            rankSequence = conferenceSequence;
            break;
          case STANDING_TYPES.League:
          default:
            rankSequence = leagueSequence;
        }

        return (
          <div className="flex items-center">
            <span className="ml-2 mr-1 font-semibold">{rankSequence}.</span>
            <img src={teamLogo} alt={teamName.default} width={30} />
            <span className="ml-1">{teamName.default}</span>
          </div>
        );
      },
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
    columnHelper.accessor("points", {
      header: () => <span>PTS</span>,
      cell: (info) => info.getValue() ?? "--",
      sortUndefined: "last",
    }),
    columnHelper.accessor("pointPctg", {
      header: () => <span>P%</span>,
      cell: (info) => {
        if (!info.getValue()) {
          return "--";
        }

        return info.getValue().toFixed(3);
      },
      sortUndefined: "last",
    }),
    columnHelper.accessor("regulationWins", {
      header: () => <span>RW</span>,
      cell: (info) => info.getValue() ?? "--",
      sortUndefined: "last",
    }),
    columnHelper.accessor("regulationPlusOtWins", {
      header: () => <span>ROW</span>,
      cell: (info) => info.getValue() ?? "--",
      sortUndefined: "last",
    }),
    columnHelper.accessor("goalFor", {
      header: () => <span>GF</span>,
      cell: (info) => info.getValue() ?? "--",
      sortUndefined: "last",
    }),
    columnHelper.accessor("goalAgainst", {
      header: () => <span>GA</span>,
      cell: (info) => info.getValue() ?? "--",
      sortUndefined: "last",
    }),
    columnHelper.accessor("goalDifferential", {
      header: () => <span>DIFF</span>,
      cell: (info) => {
        if (info.getValue() > 0) {
          return <span className="text-green-600">+{info.getValue()}</span>;
        } else if (info.getValue() < 0) {
          return <span className="text-red-600">{info.getValue()}</span>;
        }

        return info.getValue() ?? "--";
      },
      sortUndefined: "last",
    }),
    columnHelper.accessor("homeWins", {
      header: () => <span>HOME</span>,
      cell: (info) => {
        const { homeWins, homeLosses, homeOtLosses } = info.row.original;

        return `${homeWins}-${homeLosses}-${homeOtLosses}`;
      },
      sortUndefined: "last",
    }),
    columnHelper.accessor("roadWins", {
      header: () => <span>AWAY</span>,
      cell: (info) => {
        const { roadWins, roadLosses, roadOtLosses } = info.row.original;

        return `${roadWins}-${roadLosses}-${roadOtLosses}`;
      },
      sortUndefined: "last",
    }),
    columnHelper.accessor("shootoutWins", {
      header: () => <span>S/O</span>,
      cell: (info) => {
        const { shootoutWins, shootoutLosses } = info.row.original;

        return `${shootoutWins}-${shootoutLosses}`;
      },
      sortUndefined: "last",
    }),
    columnHelper.accessor("date", {
      header: () => <span>L10</span>,
      cell: (info) => {
        const { l10Wins, l10Losses, l10OtLosses } = info.row.original;

        return `${l10Wins}-${l10Losses}-${l10OtLosses}`;
      },
      sortUndefined: "last",
    }),
    columnHelper.accessor("streakCode", {
      header: () => <span>STRK</span>,
      cell: (info) => {
        const { streakCode, streakCount } = info.row.original;

        return `${streakCode}${streakCount}`;
      },
      sortUndefined: "last",
    }),
  ];
}
