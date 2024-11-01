import { cn } from "~/utils";

type SeriesTeamRowProps = {
  team: {
    id: number;
    abbrev: string;
    logo: string;
    score: number;
  };
  classNames?: string;
};

export default function SeriesTeamRow({
  team,
  classNames = "",
}: SeriesTeamRowProps) {
  const { logo, abbrev, score } = team;
  return (
    <div
      className={cn(
        "flex items-center justify-between text-sm last:mt-1",
        classNames,
      )}
    >
      <div className="flex">
        <img src={logo} alt={abbrev} width={35} className="mr-1" />
        <span className="font-semibold">{abbrev}</span>
      </div>
      <span>{score}</span>
    </div>
  );
}
