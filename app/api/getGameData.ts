import { Game, Summary } from "types/types";

import { brightcoveApi, deepMerge } from "~/utils";

export default async function getGameData(gameId: string) {
  try {
    const fetchGameDataUrls = [
      fetch(`https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`),
      fetch(`https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`),
      fetch(`https://api-web.nhle.com/v1/gamecenter/${gameId}/right-rail`),
    ];

    const [
      gameDataResponse,
      boxscoreDataResponse,
      rightRailResponse,
    ]: Response[] = await Promise.all(fetchGameDataUrls);

    const gameData: Game = await gameDataResponse.json();
    const boxscoreData = await boxscoreDataResponse.json();
    const rightRail: Summary = await rightRailResponse.json();

    if (rightRail?.gameVideo) {
      const { data: threeMinRecapData } = await brightcoveApi.get(
        `/playback/v1/accounts/6415718365001/videos/${rightRail.gameVideo.threeMinRecap}`,
      );

      rightRail.gameVideo.threeMinRecapVideoObject = {
        poster: threeMinRecapData.poster,
        videoUrl:
          threeMinRecapData.sources[threeMinRecapData.sources.length - 1].src,
      };

      const { data: condensedGameData } = await brightcoveApi.get(
        `/playback/v1/accounts/6415718365001/videos/${rightRail.gameVideo.condensedGame}`,
      );

      rightRail.gameVideo.condensedGameVideoObject = {
        poster: condensedGameData.poster,
        videoUrl:
          condensedGameData.sources[condensedGameData.sources.length - 1].src,
      };
    }

    const data = deepMerge(gameData, boxscoreData, rightRail) as Game & Summary;

    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return [];
    }
  }
}
