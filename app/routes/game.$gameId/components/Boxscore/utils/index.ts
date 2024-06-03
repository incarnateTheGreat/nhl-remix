import { Game, GoalieStats, PlayerByGameStats } from "~/types";

const preGameData = (
  gameDataToRender: Game,
  awayTeamId: number,
  homeTeamId: number,
) => {
  const {
    matchup: { skaterSeasonStats, goalieSeasonStats },
  } = gameDataToRender;

  const preGameSkaters = skaterSeasonStats.reduce(
    (acc: PlayerByGameStats, elem) => {
      if (awayTeamId === elem.teamId) {
        if (elem.position === "D") {
          acc.awayTeam.defense.push(elem);
        } else if (
          elem.position === "C" ||
          elem.position === "L" ||
          elem.position === "R"
        ) {
          acc.awayTeam.forwards.push(elem);
        }
      } else if (homeTeamId === elem.teamId) {
        if (elem.position === "D") {
          acc.homeTeam.defense.push(elem);
        } else if (
          elem.position === "C" ||
          elem.position === "L" ||
          elem.position === "R"
        ) {
          acc.homeTeam.forwards.push(elem);
        }
      }

      return acc;
    },
    {
      awayTeam: {
        forwards: [],
        defense: [],
        goalies: [],
      },
      homeTeam: {
        forwards: [],
        defense: [],
        goalies: [],
      },
    },
  );

  const preGameGoaltenders = goalieSeasonStats.reduce(
    (acc, elem) => {
      if (awayTeamId === elem.teamId) {
        acc.awayTeam.goalies.push(elem);
      } else if (homeTeamId === elem.teamId) {
        acc.homeTeam.goalies.push(elem);
      }

      return acc;
    },
    {
      awayTeam: {
        goalies: [] as GoalieStats[],
      },
      homeTeam: {
        goalies: [] as GoalieStats[],
      },
    },
  );

  const preGamePlayers = { ...preGameSkaters };
  preGamePlayers.awayTeam.goalies = preGameGoaltenders.awayTeam.goalies;
  preGamePlayers.homeTeam.goalies = preGameGoaltenders.homeTeam.goalies;

  return preGamePlayers;
};

const reorderGoalies = (goalies: GoalieStats[]) => {
  return goalies.sort((a, b) => {
    if (a.starter === b.starter) return 0;

    if (a.starter) return -1;

    return 1;
  });
};

export { preGameData, reorderGoalies };
