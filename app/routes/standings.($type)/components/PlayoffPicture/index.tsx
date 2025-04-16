import { useRouteLoaderData } from "@remix-run/react";
import { TeamStandings } from "types/standings";

import { getRandomKey } from "~/utils";

import { StandingsData } from "../..";

function getPositionAbbevition(team: TeamStandings) {
  if (team.wildcardSequence) {
    return `WC${team.wildcardSequence}`;
  }

  return `${team.divisionAbbrev}${team.divisionSequence}`;
}

type ConferencePlayoffProps = {
  conference: [string, TeamStandings[][]];
};

const ConferencePlayoff = ({ conference }: ConferencePlayoffProps) => {
  const [conferenceName, conferenceData] = conference;

  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-extrabold text-black">
        {conferenceName}
      </h3>
      <table className="md:text-sm">
        <tbody>
          {conferenceData.map((match) => {
            const [firstTeam, secondTeam] = match;

            const firstTeamPositionAbbreviation =
              getPositionAbbevition(firstTeam);
            const secondTeamPositionAbbreviation =
              getPositionAbbevition(secondTeam);

            return (
              <tr key={getRandomKey()}>
                <td className="pr-1">{firstTeamPositionAbbreviation}</td>
                <td className="pr-1">{firstTeam.teamName.default}</td>
                <td className="px-1 text-center">vs. </td>
                <td className="pr-1">{secondTeamPositionAbbreviation}</td>
                <td className="pr-1">{secondTeam.teamName.default}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default function PlayoffPicture() {
  const { playoffPicture } = useRouteLoaderData(
    "routes/standings.($type)",
  ) as StandingsData;

  return (
    <section>
      <div>
        <h2 className="mb-2 text-lg font-extrabold text-black">
          Playoff Picture
        </h2>
        <div className="grid gap-x-24 gap-y-4 text-sm md:gap-x-12 lg:grid-cols-2">
          {Object.entries(playoffPicture).map((conference) => {
            return (
              <ConferencePlayoff key={getRandomKey()} conference={conference} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
