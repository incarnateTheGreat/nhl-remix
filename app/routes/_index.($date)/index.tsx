import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useParams,
  useRevalidator,
} from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { GamesType, GameWeek } from "types/types";

import DatePickerInternal from "~/components/DatePickerInternal";
import Loading from "~/components/Loading";
import {
  deepMerge,
  getTodaysDate,
  isGameActive,
  isPreGame,
  Timer,
} from "~/utils";

import Games from "./components/Games";

export const meta: MetaFunction = (e) => {
  const { currentDate } = e.data as GamesType;
  const date = format(currentDate, "MMM d, yyyy");

  const title = `Games for ${date}`;

  return [
    {
      title,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      name: "description",
      content: `This is the Games page for ${date}`,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const date = params.date ?? "now";

  const gamesResponse = await fetch(
    `https://api-web.nhle.com/v1/score/${date}`,
  );

  const games: GamesType = await gamesResponse.json();

  const incompleteGames = games.games.reduce(
    (acc, elem) => {
      if (isPreGame(elem.gameState)) {
        acc.preGames += 1;
      } else if (isGameActive(elem.gameState)) {
        acc.activeGames += 1;
      }

      return acc;
    },
    {
      preGames: 0,
      activeGames: 0,
    },
  );

  return deepMerge(games, {
    incompleteGames,
  });
};

export default function Scores() {
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const { date } = useParams();
  const {
    gameWeek,
    games,
    incompleteGames: { preGames, activeGames },
  } = useLoaderData<GamesType>();

  const dateToFilter = date ?? format(new Date(), "yyyy-MM-dd");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const timerToUse = new Timer();

  useEffect(() => {
    let dateVal = date;

    if (!dateVal) {
      dateVal = getTodaysDate();
    }

    if (getTodaysDate() === dateVal) {
      if (activeGames > 0) {
        timerToUse.start(() => {
          revalidator.revalidate();
        }, 15000);
      } else if (preGames > 0 && activeGames === 0) {
        timerToUse.start(() => {
          revalidator.revalidate();
        }, 300000);
      }

      if (timerToUse.running && preGames === 0 && activeGames === 0) {
        timerToUse.stop();
      }
    }

    return () => timerToUse.stop();
  }, [preGames, activeGames]);

  useEffect(() => {
    revalidator.revalidate();
  }, [date]);

  const gameWeekProcessed = gameWeek?.reduce((acc: GameWeek[], gameWeek) => {
    const isoDate = parseISO(gameWeek.date);
    const formattedDate = format(isoDate, "MMM d");

    const gameWeekObj = {
      ...gameWeek,
      label: formattedDate,
    };

    acc.push(gameWeekObj);

    return acc;
  }, []);

  return (
    <div className="flex h-full flex-col bg-white px-4 py-2">
      <h1 className="text-4xl font-black tracking-tight">Scores</h1>
      <DatePickerInternal
        gameWeek={gameWeekProcessed}
        dateToFilter={dateToFilter}
      />

      {navigation.state === "loading" ? <Loading /> : null}

      {navigation.state === "idle" && games?.length > 0 ? <Games /> : null}

      {navigation.state === "idle" && games?.length === 0 ? (
        <>No Games.</>
      ) : null}
    </div>
  );
}
