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
  conference: TeamStandings[][];
};

const ConferencePlayoff = ({ conference }: ConferencePlayoffProps) => {
  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-extrabold text-black">Eastern</h3>
      <table className="w-full md:w-3/4">
        <tbody>
          {conference.map((match) => {
            const [firstTeam, secondTeam] = match;

            const firstTeamPositionAbbreviation =
              getPositionAbbevition(firstTeam);
            const secondTeamPositionAbbreviation =
              getPositionAbbevition(secondTeam);

            return (
              <tr key={getRandomKey()}>
                <td className="w-7">{firstTeamPositionAbbreviation}</td>
                <td className="w-36">{firstTeam.teamName.default}</td>
                <td className="w-12 text-center">vs. </td>
                <td className="w-7">{secondTeamPositionAbbreviation}</td>
                <td className="w-40">{secondTeam.teamName.default}</td>
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

  const [eastern, western] = playoffPicture;

  return (
    <section>
      <div className="my-6">
        <h2 className="mb-2 text-lg font-extrabold text-black">
          Playoff Picture
        </h2>
        <div className="grid gap-x-24 gap-y-4 text-sm md:grid-cols-2">
          <ConferencePlayoff conference={eastern} />
          <ConferencePlayoff conference={western} />
        </div>
      </div>
    </section>
  );
}
