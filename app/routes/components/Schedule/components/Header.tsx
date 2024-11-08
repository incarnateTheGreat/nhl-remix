import { useRouteLoaderData } from "@remix-run/react";
import React from "react";

import { TeamScheduleData } from "~/routes/team.schedule.($teamAbbrev).($year).($month)";
import { getLogo } from "~/utils";

export default function Header() {
  const { teamAbbrev, teamFullName } = useRouteLoaderData(
    "routes/team.schedule.($teamAbbrev).($year).($month)",
  ) as TeamScheduleData;

  return (
    <div className="flex items-center border-b border-dashed pb-4 pl-4 pt-4">
      <img
        src={getLogo(teamAbbrev)}
        alt={`${teamAbbrev} Logo}`}
        className="w-16"
      />
      <h1 className="pl-2 text-2xl font-black tracking-tight md:text-4xl">
        {teamFullName}
      </h1>
    </div>
  );
}
