import { useRouteLoaderData } from "@remix-run/react";

import { getRandomKey } from "~/utils";

import { StandingsData } from "../..";
import { STANDING_TYPES } from "../../columns";
import StandingsTable from "../StandingsTable";

export default function WildCard() {
  const { wildcard } = useRouteLoaderData(
    "routes/standings.($type)",
  ) as StandingsData;

  return (
    <>
      {Object.keys(wildcard).map((conferenceName) => {
        return (
          <div key={getRandomKey()}>
            <h2 className="mb-2 text-lg font-extrabold text-black">
              {conferenceName}
            </h2>
            <div className="grid grid-cols-1 gap-y-6">
              {Object.entries(wildcard[conferenceName]).map((teamData) => {
                const [divisionName, divisionData] = teamData;

                return (
                  <div key={getRandomKey()}>
                    <h3 className="text-md mb-0.5 font-extrabold text-black">
                      {divisionName}
                    </h3>
                    <StandingsTable
                      data={divisionData}
                      standingsColumnType={STANDING_TYPES.Wild_Card}
                      divisionName={divisionName}
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
