import { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { StandingsResponse, TeamStandings } from "types/standings";

import TabWithNavigate from "~/components/TabLinks";
import { getTodaysDate } from "~/utils";

import Conference from "./components/Conference";
import Division from "./components/Division";
import League from "./components/League";
import WildCard from "./components/Wild Card";

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

type ConferencesType = {
  [k: string]: TeamStandings[];
};

type DivisionsType = {
  [k: string]: {
    [k: string]: TeamStandings[];
  };
};

type WildCardType = {
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
    (acc: DivisionsType, team) => {
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
    (acc: ConferencesType, team) => {
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
    (acc: WildCardType, conferenceName) => {
      if (!(conferenceName in acc)) {
        acc[conferenceName] = {};
      }

      const divisionWildCard = Object.keys(divisions[conferenceName]).reduce(
        (x: ConferencesType, division) => {
          x[division] = [...divisions[conferenceName][division].slice(0, 3)];

          return x;
        },
        {},
      );

      const wildCardTeams = conferences[conferenceName].reduce(
        (acc: TeamStandings[], team) => {
          if (team.wildcardSequence > 0) {
            acc.push(team);
          }

          return acc;
        },
        [],
      );

      acc[conferenceName] = {
        ...divisionWildCard,
        "Wild Card": wildCardTeams,
      };

      return acc;
    },
    {},
  );

  return { divisions, wildcard, conferences, league };
};

export type StandingsData = {
  divisions: DivisionsType;
  wildcard: WildCardType;
  conferences: ConferencesType;
  league: League;
};

const tabData = [
  {
    id: 0,
    title: "Division",
    component: () => <Division />,
    url: "/standings",
  },
  {
    id: 1,
    title: "Wild Card",
    component: () => <WildCard />,
    url: "/standings/wildcard",
  },
  {
    id: 2,
    title: "Conference",
    component: () => <Conference />,
    url: "/standings/conference",
  },
  {
    id: 3,
    title: "League",
    component: () => <League />,
    url: "/standings/league",
  },
];

export default function Standings() {
  const params = useParams();

  const findParam = tabData.find((tab) => {
    return (
      params?.type?.toLowerCase().trim().replaceAll(" ", "") ===
      tab.title.toLowerCase().trim().replaceAll(" ", "")
    );
  });

  return (
    <div className="grid grid-cols-1 gap-y-8 bg-white p-4">
      <TabWithNavigate data={tabData} defaultTab={findParam?.id} />
    </div>
  );
}
