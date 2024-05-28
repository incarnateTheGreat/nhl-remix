import { TEAM_COLOURS_UTILS } from "tailwind.config";

type GetTeamColourProps = {
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
};

const getTeamColour = ({
  awayTeamAbbrev,
  homeTeamAbbrev,
}: GetTeamColourProps): Record<string, unknown> => {
  const awayColour = Object.values(TEAM_COLOURS_UTILS[awayTeamAbbrev])[0];
  const homeColour = Object.values(TEAM_COLOURS_UTILS[homeTeamAbbrev])[0];

  const homeColourStr = `${homeTeamAbbrev}-${Object.keys(TEAM_COLOURS_UTILS[homeTeamAbbrev])[0]}`;
  let awayColourStr = `${awayTeamAbbrev}-${Object.keys(TEAM_COLOURS_UTILS[awayTeamAbbrev])[0]}`;

  if (awayColour === homeColour) {
    awayColourStr = `${awayTeamAbbrev}-${Object.keys(TEAM_COLOURS_UTILS[awayTeamAbbrev])[1]}`;
  }

  return { homeColourStr, awayColourStr };
};

export { getTeamColour };
