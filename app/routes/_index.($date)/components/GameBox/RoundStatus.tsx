import { SeriesStatus } from "types/types";

type RoundStatusProps = {
  seriesStatus: SeriesStatus;
};

export default function RoundStatus({ seriesStatus }: RoundStatusProps) {
  const {
    gameNumberOfSeries,
    topSeedTeamAbbrev,
    topSeedWins,
    neededToWin,
    bottomSeedTeamAbbrev,
    bottomSeedWins,
    seriesTitle,
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
    <div className="flex flex-col items-center justify-center rounded bg-slate-200 p-1 text-sm">
      <div className="font-semibold">{`${seriesTitle}, Game ${gameNumberOfSeries}`}</div>
      {roundStatus()}
    </div>
  );
}
