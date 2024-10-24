import { useRouteLoaderData } from "@remix-run/react";
import { StandingsData } from "../..";
import { STANDING_TYPES } from "../../columns";
import StandingsTable from "../StandingsTable";

export default function League() {
  const { league } = useRouteLoaderData("routes/standings") as StandingsData;

  return (
    <div className="my-6">
      <h2 className="mb-2 text-lg font-extrabold text-black">League</h2>
      <div className="grid grid-cols-1 gap-y-6">
        <StandingsTable
          data={league}
          standingsColumnType={STANDING_TYPES.League}
        />
      </div>
    </div>
  );
}
