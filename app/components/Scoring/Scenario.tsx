type ScenarioProps = {
  scoreSituation: string;
  timeInPeriod: string;
  shotType: string;
};

export default function Scenario({
  scoreSituation,
  timeInPeriod,
  shotType,
}: ScenarioProps) {
  return (
    <div className="flex flex-1 justify-end">
      <div className="mr-2 flex w-24 flex-col items-center bg-slate-500 p-2 text-white">
        <div className="font-bold capitalize">{scoreSituation}</div>
        <div>Score</div>
      </div>
      <div className="mr-2 flex w-24 flex-col items-center bg-slate-500 p-2 text-white">
        <div className="font-bold">{timeInPeriod}</div>
        <div>Time</div>
      </div>
      <div className="mr-0 flex w-24 flex-col items-center bg-slate-500 p-2 text-white">
        <div className="font-bold capitalize">{shotType}</div>
        <div>Shot</div>
      </div>
    </div>
  );
}
