import { useEffect } from "react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useParams,
  useRevalidator,
} from "@remix-run/react";
import { format, parseISO } from "date-fns";

import Games from "./components/Games";

import DatePickerInternal from "~/components/DatePickerInternal";
import Loading from "~/components/Loading";
import { GamesType, GameWeek } from "~/types";

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

  const games = await fetch(`https://api-web.nhle.com/v1/score/${date}`);

  return games.json();
};

export default function Scores() {
  const revalidator = useRevalidator();
  const navigation = useNavigation();
  const { date } = useParams();
  const gamesToRender = useLoaderData<GamesType>();

  const dateToFilter = date ?? format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    revalidator.revalidate();
  }, [date]);

  const gameWeekProcessed = gamesToRender?.gameWeek.reduce(
    (acc: GameWeek[], gameWeek) => {
      const isoDate = parseISO(gameWeek.date);
      const formattedDate = format(isoDate, "MMM d");

      const gameWeekObj = {
        ...gameWeek,
        label: formattedDate,
      };

      acc.push(gameWeekObj);

      return acc;
    },
    [],
  );

  return (
    <div className="flex h-full flex-col bg-white px-4 py-2">
      <DatePickerInternal
        gameWeek={gameWeekProcessed}
        dateToFilter={dateToFilter}
      />

      {navigation.state === "loading" ? <Loading /> : null}

      {navigation.state === "idle" && gamesToRender?.games.length > 0 ? (
        <Games />
      ) : null}

      {navigation.state === "idle" && gamesToRender?.games.length === 0 ? (
        <>No Games.</>
      ) : null}
    </div>
  );
}
