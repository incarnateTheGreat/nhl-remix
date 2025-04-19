import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PlayoffBracket, SeedTeam } from "types/types";

import { cn, getRandomKey } from "~/utils";

export const meta: MetaFunction = () => {
  const title = `2025 NHL Playoff Bracket`;

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
      content: `This is the 2025 NHL Playoff Bracket`,
    },
  ];
};

export const loader = async () => {
  const playoffBracketResponse = await fetch(
    "https://api-web.nhle.com/v1/playoff-bracket/2025",
  );

  const playoffBracket: PlayoffBracket = await playoffBracketResponse.json();

  return playoffBracket;
};

const justifySelfEnd = ["I", "J", "N"];
const justifySelfCenter = ["O"];

function getPlayoffStyle(seriesLetter: string) {
  return {
    "justify-self-center": justifySelfCenter.includes(seriesLetter),
    "justify-self-start":
      !justifySelfCenter.includes(seriesLetter) &&
      !justifySelfEnd.includes(seriesLetter),
    "justify-self-end": justifySelfEnd.includes(seriesLetter),
  };
}

type TeamRowProps = {
  seedTeam: SeedTeam;
  teamWins: number;
};

const TeamRow = ({ seedTeam, teamWins }: TeamRowProps) => {
  const { abbrev, darkLogo, name } = seedTeam;

  return (
    <div className="grid h-full grid-cols-2 items-center justify-between px-2 first:border-b first:border-gray-300 md:grid-cols-3">
      <img
        src={darkLogo}
        alt={name.default}
        width={25}
        className="flex justify-self-center"
      />
      <span className="hidden md:flex">{abbrev} </span>
      <span className="flex justify-self-center">{teamWins}</span>
    </div>
  );
};

export default function Playoffs() {
  const { series } = useLoaderData<PlayoffBracket>();

  return (
    <div className="flex h-full flex-col bg-white px-4 py-2">
      <h1 className="text-4xl font-black tracking-tight">Playoffs</h1>
      <div className="playoff-bracket m-auto mt-6 grid w-full items-center justify-between gap-x-1 gap-y-8">
        {series.map((playoffSeries) => {
          const {
            topSeedTeam,
            topSeedWins,
            bottomSeedTeam,
            bottomSeedWins,
            seriesLetter,
          } = playoffSeries;

          if (!topSeedTeam && !bottomSeedTeam) {
            return (
              <div
                key={getRandomKey()}
                className={cn(getPlayoffStyle(seriesLetter))}
                style={{
                  gridArea: `series${seriesLetter}`,
                }}
              >
                <div className="flex h-20 w-20 flex-col rounded-lg bg-[#2C2C2C] text-white md:w-32" />
              </div>
            );
          }

          return (
            <div
              key={getRandomKey()}
              className={cn(getPlayoffStyle(seriesLetter))}
              style={{
                gridArea: `series${seriesLetter}`,
              }}
            >
              <a className="flex h-20 w-20 flex-col rounded-lg bg-[#2C2C2C] text-sm font-semibold text-white md:w-32">
                <TeamRow seedTeam={topSeedTeam} teamWins={topSeedWins} />
                <TeamRow seedTeam={bottomSeedTeam} teamWins={bottomSeedWins} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
