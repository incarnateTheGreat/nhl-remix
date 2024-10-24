import { MetaFunction } from "@remix-run/node";

import { StandingsResponse, TeamStandings } from "types/standings";

import { getTodaysDate } from "~/utils";

import Tabs from "~/components/Tabs";
import Division from "./components/Division";
import Conference from "./components/Conference";
import League from "./components/League";

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

type League = TeamStandings[];

type Conferences = {
  [k: string]: TeamStandings[];
};

type Divisions = {
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

  const divisions = standingsResponse.standings.reduce(
    (acc: Divisions, team) => {
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
  );

  const conferences = standingsResponse.standings.reduce(
    (acc: Conferences, team) => {
      const { conferenceName } = team;

      if (!(conferenceName in acc)) {
        acc[conferenceName] = [];
      }

      acc[conferenceName].push(team);

      return acc;
    },
    {},
  );

  const league = standingsResponse.standings.reduce((acc: League, team) => {
    acc.push(team);

    return acc;
  }, []);

  return { divisions, conferences, league };
};

export type StandingsData = {
  divisions: Divisions;
  conferences: Conferences;
  league: League;
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
    component: () => <Conference />,
  },
  {
    id: 2,
    title: "League",
    component: () => <League />,
  },
];

export default function Standings() {
  return (
    <div className="grid grid-cols-1 gap-y-8 bg-white p-4">
      <Tabs data={tabData} />
    </div>
  );
}
