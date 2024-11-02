import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type {
  Schedule as ScheduleType,
  ScheduleGamesWithIds,
} from "types/schedule";

import Schedule from "~/components/Schedule";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const teamSchedule = await fetch(
      `https://api-web.nhle.com/v1/club-schedule/${params.teamName}/month/2024-11`,
    );

    const teamScheduleResponse: ScheduleType = await teamSchedule.json();

    const scheduleWithIds = teamScheduleResponse.games.reduce((acc, game) => {
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
      <Schedule
        date="2024-11-01"
        teamAbbrev="TOR"
        games={schedule.gamesWithIds}
      />
    </div>
  );
}
