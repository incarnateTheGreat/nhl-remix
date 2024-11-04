import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useNavigation } from "@remix-run/react";
import type {
  Schedule as ScheduleType,
  ScheduleGamesWithIds,
} from "types/schedule";

import Loading from "~/components/Loading";

import Schedule from "../components/Schedule";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const selectedYear = formData.get("selectedYear") as string;
  const selectedMonth = formData.get("selectedMonth") as string;

  return redirect(
    `/team/${params.teamAbbrev}/${selectedYear}/${selectedMonth}`,
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { teamAbbrev } = params;
  let { year, month } = params;

  if (!month && !year) {
    month = new Date().toLocaleString("en-US", {
      month: "2-digit",
    });
    year = new Date().toLocaleString("en-US", {
      year: "numeric",
    });
  } else {
    month = new Date(`${year}-${month}-02`).toLocaleString("en-US", {
      month: "2-digit",
    });
  }

  try {
    const teamSchedule = await fetch(
      `https://api-web.nhle.com/v1/club-schedule/${teamAbbrev}/month/${year}-${month}`,
    );

    const teamScheduleResponse: ScheduleType = await teamSchedule.json();

    const scheduleWithIds = teamScheduleResponse?.games.reduce((acc, game) => {
      acc[game.gameDate] = game;

      return acc;
    }, {}) as ScheduleGamesWithIds;

    teamScheduleResponse["gamesWithIds"] = scheduleWithIds;

    return {
      teamSchedule: teamScheduleResponse,
      month: +month,
      year: +year,
      teamAbbrev,
    };
  } catch (err) {
    return {};
  }
};

export type TeamScheduleData = {
  teamSchedule: ScheduleType;
  month: number;
  year: number;
  teamAbbrev: string;
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
