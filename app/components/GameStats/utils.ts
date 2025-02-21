import { TEAM_COLOURS_UTILS } from "tailwind.config";

type GetTeamColourProps = {
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
};

const getTeamColour = ({
  awayTeamAbbrev,
  homeTeamAbbrev,
}: GetTeamColourProps): Record<string, string> => {
  const isAwayTeamKey = awayTeamAbbrev in TEAM_COLOURS_UTILS;
  const isHomeTeamKey = homeTeamAbbrev in TEAM_COLOURS_UTILS;

  const awayColour = isAwayTeamKey
    ? Object.values(TEAM_COLOURS_UTILS?.[awayTeamAbbrev])?.[0]
    : "#ccc";
  const homeColour = isHomeTeamKey
    ? Object.values(TEAM_COLOURS_UTILS?.[homeTeamAbbrev])?.[0]
    : "#ccc";

  const homeColourStr = `${homeTeamAbbrev}-${isHomeTeamKey ? Object.keys(TEAM_COLOURS_UTILS[homeTeamAbbrev])[0] : 0}`;
  let awayColourStr = `${awayTeamAbbrev}-${isAwayTeamKey ? Object.keys(TEAM_COLOURS_UTILS[awayTeamAbbrev])[0] : 0}`;

  if (awayColour === homeColour) {
    // awayColourStr = `${awayTeamAbbrev}-${Object.keys(TEAM_COLOURS_UTILS?.[awayTeamAbbrev])?.[1]}`;
    awayColourStr = "#CCC";
  }

  return { homeColourStr, awayColourStr };
};

export { getTeamColour };
