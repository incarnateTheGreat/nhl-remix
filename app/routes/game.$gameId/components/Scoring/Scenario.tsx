import { cn } from "~/utils";

type ScenarioProps = {
  scoreSituation: string;
  timeInPeriod: string;
  shotType: string;
};

const scoreSituationClasses =
  "flex w-full lg:w-24 flex-col items-center bg-gray-100 p-1 text-black h-14 text-xs justify-center";

export default function Scenario({
  scoreSituation,
  timeInPeriod,
  shotType,
}: ScenarioProps) {
  return (
    <div className="my-2 flex flex-1 lg:m-0 lg:justify-end">
      <div className={cn("mr-2", scoreSituationClasses)}>
        <div className="font-bold capitalize">{scoreSituation}</div>
        <div>Score</div>
      </div>
      <div className={cn("mr-2", scoreSituationClasses)}>
        <div className="font-bold">{timeInPeriod}</div>
        <div>Time</div>
      </div>
      <div className={cn("mr-0", scoreSituationClasses)}>
        <div className="font-bold capitalize">{shotType}</div>
        <div>Shot</div>
      </div>
    </div>
  );
}
