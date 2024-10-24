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

type WildCard = {
  [k: string]: {
    [k: string]: TeamStandings[] | Conferences;
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

  const wildcard = Object.keys(divisions).reduce(
    (acc: WildCard, conferenceName) => {
      if (!(conferenceName in acc)) {
        acc[conferenceName] = {};
      }

      const divisionWildCard = Object.keys(divisions[conferenceName]).reduce(
        (x: Conferences, division) => {
          x[division] = [...divisions[conferenceName][division].slice(0, 3)];

          return x;
        },
        {},
      );

      const wildCardTeams = conferences[conferenceName].slice(
        6,
        conferences[conferenceName].length,
      );

      acc[conferenceName] = { Division: divisionWildCard };
      acc[conferenceName] = { ...acc[conferenceName], WildCard: wildCardTeams };

      // acc[conferenceName].push(divisionWildCard);
      // acc[conferenceName].push(wildCardTeams);

      return acc;
    },
    {},
  );

  console.log(wildcard);

  // const atlantic = divisions["Eastern"]["Atlantic"].slice(0, 3);
  // const metropolitan = divisions["Eastern"]["Metropolitan"].slice(0, 3);
  // const eastern_wildCard = conferences["Eastern"].slice(
  //   6,
  //   conferences["Eastern"].length,
  // );

  // const central = divisions["Western"]["Central"].slice(0, 3);
  // const pacific = divisions["Western"]["Pacific"].slice(0, 3);
  // const western_wildCard = conferences["Western"].slice(
  //   6,
  //   conferences["Western"].length,
  // );

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
