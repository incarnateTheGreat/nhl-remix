import { cn } from "~/utils";

type StatsBarProps = {
  label: string;
  awayValueToDisplay: string | number | undefined;
  homeValueToDisplay: string | number | undefined;
  awayBar: number;
  homeBar: number;
  awayBorderStyle: string;
  homeBorderStyle: string;
  subText?: {
    awayValue: string | number | undefined;
    homeValue: string | number | undefined;
  };
};

export default function StatsBar(props: StatsBarProps) {
  const {
    label,
    awayValueToDisplay,
    homeValueToDisplay,
    awayBar,
    homeBar,
    awayBorderStyle,
    homeBorderStyle,
    subText,
  } = props;

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between">
        <span className="text-sm font-bold">{awayValueToDisplay}</span>
        <span className="text-sm">{label}</span>
        <span className="text-sm font-bold">{homeValueToDisplay}</span>
      </div>
      <div className="flex gap-2">
        <div
          className={cn("flex", {
            hidden: awayBar === 0,
          })}
          style={{
            flexGrow: awayBar,
          }}
        >
          <div
            className={cn("h-2 w-full", {
              [awayBorderStyle]: awayBar,
            })}
          />
        </div>
        <div
          className="flex"
          style={{
            flexGrow: homeBar,
          }}
        >
          <div
            className={cn("h-2 w-full", {
              [homeBorderStyle]: homeBar,
            })}
          />
        </div>
      </div>
      {subText ? (
        <div className="mt-0.5 flex justify-between text-xs text-gray-800">
          <span>{subText?.awayValue}</span>
          <span>{subText?.homeValue}</span>
        </div>
      ) : null}
    </div>
  );
}
