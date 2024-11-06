import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useNavigation } from "@remix-run/react";
import type {
  AllSeasons,
  Schedule as ScheduleType,
  ScheduleGamesWithIds,
} from "types/schedule";

import Loading from "~/components/Loading";
import { TEAMS } from "~/constants";

import Schedule from "../components/Schedule";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const selectedYear = formData.get("selectedYear") as string;
  const selectedMonth = formData.get("selectedMonth") as string;

  return redirect(
    `/team/schedule/${params.teamAbbrev}/${selectedYear}/${selectedMonth}`,
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { teamAbbrev } = params;
  let { year, month } = params;
  let date;

  if (!month && !year) {
    date = new Date();
  } else {
    date = new Date(`${year}-${month}-02`);
  }

  month = date.toLocaleString("en-US", {
    month: "2-digit",
  });
  year = date.toLocaleString("en-US", {
    year: "numeric",
  });

  try {
    const fetchScheduleDataUrls = [
      fetch(
        `https://api-web.nhle.com/v1/club-schedule/${teamAbbrev}/month/${year}-${month}`,
      ),
      fetch(`https://api-web.nhle.com/v1/season`),
    ];

    const [teamSchedule, allSeasons]: Response[] = await Promise.all(
      fetchScheduleDataUrls,
    );

    const teamScheduleResponse: ScheduleType = await teamSchedule.json();
    const allSeasonsResponse: AllSeasons = await allSeasons.json();

    const seasons = allSeasonsResponse
      .reverse()
      .reduce((acc: string[], season) => {
        acc.push(season.toString().slice(0, 4));

        return acc;
      }, []);

    const teamName = TEAMS.find((team) => team.triCode === teamAbbrev);

    const scheduleWithIds = teamScheduleResponse?.games.reduce(
      (acc: ScheduleGamesWithIds, game) => {
        acc[game.gameDate] = game;

        return acc;
      },
      {},
    ) as ScheduleGamesWithIds;

    teamScheduleResponse["gamesWithIds"] = scheduleWithIds;

    return {
      teamSchedule: teamScheduleResponse,
      teamFullName: teamName?.fullName,
      allSeasons: seasons,
      month: +month,
      year: +year,
      teamAbbrev,
    };
  } catch (err: unknown) {
    return { err };
  }
};

export type TeamScheduleData = {
  teamSchedule: ScheduleType;
  month: number;
  year: number;
  teamAbbrev: string;
  teamFullName: string;
  allSeasons: AllSeasons;
};

export default function Team() {
  const navigation = useNavigation();

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {navigation.state === "loading" ? <Loading /> : null}

      {navigation.state === "idle" ? <Schedule /> : null}
    </div>
  );
}
