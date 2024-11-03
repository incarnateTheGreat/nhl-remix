import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type {
  Schedule as ScheduleType,
  ScheduleGamesWithIds,
} from "types/schedule";

import Schedule from "~/components/Schedule";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const selectedYear = formData.get("selectedYear") as string;
  const selectedMonth = formData.get("selectedMonth") as string;

  let month = +selectedMonth + 1;
  let year = +selectedYear;

  if (month > 12) {
    month = 1;
    year += 1;
  }

  return redirect(`/team/${params.teamName}/${year}/${month}`);
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
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

  // console.log({ year, month });
  // console.log(
  //   `https://api-web.nhle.com/v1/club-schedule/${params.teamName}/month/${year}-${month}`,
  // );

  try {
    const teamSchedule = await fetch(
      `https://api-web.nhle.com/v1/club-schedule/${params.teamName}/month/${year}-${month}`,
    );

    const teamScheduleResponse: ScheduleType = await teamSchedule.json();

    const scheduleWithIds = teamScheduleResponse?.games.reduce((acc, game) => {
      acc[game.gameDate] = game;

      return acc;
    }, {}) as ScheduleGamesWithIds;

    teamScheduleResponse["gamesWithIds"] = scheduleWithIds;

    return { schedule: teamScheduleResponse };
  } catch (err) {
    return {};
  }
};

type TeamScheduleData = {
  schedule: ScheduleType;
};

export default function Team() {
  const { schedule } = useLoaderData<TeamScheduleData>();

  return (
    <div className="flex h-full w-full flex-col">
      <Schedule teamAbbrev="TOR" games={schedule.gamesWithIds} />
    </div>
  );
}
