import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { StandingsResponse, TeamName, TeamStandings } from "types/standings";

import { getTodaysDate } from "~/utils";

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
    <div className="flex h-full flex-col bg-white px-8 py-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ol className="list-decimal">
          <h2 className="font-bold">Atlantic</h2>
          {conferences["Eastern"]["Atlantic"].map((team) => {
            return <li>{team.teamName.default}</li>;
          })}
        </ol>
        <ol className="list-decimal">
          <h2 className="font-bold">Metropolitan</h2>
          {conferences["Eastern"]["Metropolitan"].map((team) => {
            return <li>{team.teamName.default}</li>;
          })}
        </ol>
        <ol className="list-decimal">
          <h2 className="font-bold">Central</h2>
          {conferences["Western"]["Central"].map((team) => {
            return <li>{team.teamName.default}</li>;
          })}
        </ol>
        <ol className="list-decimal">
          <h2 className="font-bold">Pacific</h2>
          {conferences["Western"]["Pacific"].map((team) => {
            return <li>{team.teamName.default}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}
