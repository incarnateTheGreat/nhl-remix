import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { StandingsResponse, TeamStandings } from "types/standings";

import { getTodaysDate } from "~/utils";

import StandingsTable from "./components/StandingsTable";

export const meta: MetaFunction = () => {
  const title = `NHL Standings`;

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
      content: `This is the NHL Standings`,
    },
  ];
};

type Conferences = {
  [k: string]: {
    [k: string]: TeamStandings[];
  };
};

export const loader = async () => {
  const date = getTodaysDate();

  const standings = await fetch(
    `https://api-web.nhle.com/v1/standings/${date}`,
  );

  const standingsResponse: StandingsResponse = await standings.json();

  const conferences = standingsResponse.standings.reduce(
    (acc: Conferences, team) => {
      const { conferenceName, divisionName } = team;

      if (!(conferenceName in acc)) {
        acc[conferenceName] = {};
      }

      if (!acc[conferenceName][divisionName]) {
        acc[conferenceName][divisionName] = [];
      }

      acc[conferenceName][divisionName].push(team);

      return acc;
    },
    {},
  ) as Conferences;

  return { conferences };
};

type StandingsData = {
  conferences: Conferences;
};

export default function Standings() {
  const { conferences } = useLoaderData<StandingsData>();

  return (
    <div className="grid grid-cols-1 gap-y-8">
      {Object.keys(conferences).map((conference) => {
        return (
          <div>
            <h2 className="mb-4 border-b border-gray-300 text-lg font-extrabold text-white">
              {conference}
            </h2>
            <div className="grid grid-cols-1 gap-y-4">
              {Object.keys(conferences[conference]).map((division) => {
                return (
                  <div>
                    <h3 className="text-md mb-0.5 font-extrabold text-white">
                      {division}
                    </h3>
                    <StandingsTable data={conferences[conference][division]} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
