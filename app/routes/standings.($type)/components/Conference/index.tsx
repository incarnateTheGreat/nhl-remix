import { useRouteLoaderData } from "@remix-run/react";

import { getRandomKey } from "~/utils";

import { StandingsData } from "../..";
import { STANDING_TYPES } from "../../columns";
import StandingsTable from "../StandingsTable";

export default function Conference() {
  const { conferences } = useRouteLoaderData(
    "routes/standings.($type)",
  ) as StandingsData;

  return (
    <>
      {Object.keys(conferences).map((conferenceName) => {
        return (
          <div className="my-6" key={getRandomKey()}>
            <h2 className="mb-2 text-lg font-extrabold text-black">
              {conferenceName}
            </h2>
            <div className="grid grid-cols-1 gap-y-6">
              <StandingsTable
                data={conferences[conferenceName]}
                standingsColumnType={STANDING_TYPES.Conference}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
