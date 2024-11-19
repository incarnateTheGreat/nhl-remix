import { deepMerge } from "~/utils";

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

    const gameData = await gameDataResponse.json();
    const boxscoreData = await boxscoreDataResponse.json();
    const rightRail = await rightRailResponse.json();

    return deepMerge(gameData, boxscoreData, rightRail);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return [];
    }
  }
}
