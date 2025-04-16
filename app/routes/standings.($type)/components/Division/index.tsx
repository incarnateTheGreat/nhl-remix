import { useRouteLoaderData } from "@remix-run/react";

import { getRandomKey } from "~/utils";

import { StandingsData } from "../..";
import { STANDING_TYPES } from "../../columns";
import StandingsTable from "../StandingsTable";

export default function Division() {
  const { divisions } = useRouteLoaderData(
    "routes/standings.($type)",
  ) as StandingsData;

  return (
    <>
      {Object.keys(divisions).map((conferenceName) => {
        return (
          <div key={getRandomKey()}>
            <h2 className="mb-2 text-lg font-extrabold text-black">
              {conferenceName}
            </h2>
            <div className="grid grid-cols-1 gap-y-6">
              {Object.keys(divisions[conferenceName]).map((divisionName) => {
                return (
                  <div key={getRandomKey()}>
                    <h3 className="text-md mb-0.5 font-extrabold text-black">
                      {divisionName}
                    </h3>
                    <StandingsTable
                      data={divisions[conferenceName][divisionName]}
                      standingsColumnType={STANDING_TYPES.Division}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
