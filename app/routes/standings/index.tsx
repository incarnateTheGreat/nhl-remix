import { MetaFunction } from "@remix-run/node";

import { StandingsResponse, TeamStandings } from "types/standings";

import { getTodaysDate } from "~/utils";

import Tabs from "~/components/Tabs";
import Division from "./components/Division";

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

export type StandingsData = {
  conferences: Conferences;
};

const tabData = [
  {
    id: 0,
    title: "Division",
    component: () => <Division />,
  },
  {
    id: 1,
    title: "Conference",
    component: () => <div>Conference</div>,
  },
];

export default function Standings() {
  return (
    <div className="grid grid-cols-1 gap-y-8 bg-white p-4">
      <Tabs data={tabData} />
    </div>
  );
}
