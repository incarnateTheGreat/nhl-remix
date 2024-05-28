import { SeriesStatus } from "~/types";

type RoundStatusProps = {
  seriesStatus: SeriesStatus;
};

export default function RoundStatus({ seriesStatus }: RoundStatusProps) {
  const {
    round,
    gameNumberOfSeries,
    topSeedTeamAbbrev,
    topSeedWins,
    neededToWin,
    bottomSeedTeamAbbrev,
    bottomSeedWins,
  } = seriesStatus;

  const roundStatus = () => {
    if (bottomSeedWins === neededToWin || topSeedWins === neededToWin) {
      if (bottomSeedWins > topSeedWins) {
        return `${bottomSeedTeamAbbrev} wins ${bottomSeedWins}-${topSeedWins}`;
      } else if (topSeedWins > bottomSeedWins) {
        return `${topSeedTeamAbbrev} wins ${topSeedWins}-${bottomSeedWins}`;
      }
    }

    if (bottomSeedWins > topSeedWins) {
      return `${bottomSeedTeamAbbrev} leads ${bottomSeedWins}-${topSeedWins}`;
    } else if (topSeedWins > bottomSeedWins) {
      return `${topSeedTeamAbbrev} leads ${topSeedWins}-${bottomSeedWins}`;
    }

    return `Series tied ${bottomSeedWins}-${topSeedWins}`;
  };

  return (
    <div>
      <div>{`Round ${round}, Gm ${gameNumberOfSeries}`}</div>
      {roundStatus()}
    </div>
  );
}
