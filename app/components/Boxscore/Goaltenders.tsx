import { GoalieStats } from "~/types";
import { cn, GOALTENDERS } from "~/utils";

type GoaltendersProps = {
  goaltenders: GoalieStats[];
};

export default function Goaltenders({ goaltenders }: GoaltendersProps) {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr>
          {GOALTENDERS.map((skater) => {
            const key = Object.keys(skater)[0];

            let valueToPrint;

            if (key === "Skater") {
              valueToPrint = "Goaltenders";
            } else {
              valueToPrint = key;
            }

            return (
              <th
                className={cn("w-18 p-2 text-left", {
                  "text-center": key !== "Skater",
                })}
                key={key}
              >
                {valueToPrint}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {goaltenders.map((goalie) => {
          return (
            <tr
              key={goalie.playerId}
              className="border-b border-b-slate-200/90 odd:bg-slate-200/45"
            >
              {GOALTENDERS.map((skater) => {
                const [key, value] = Object.entries(skater)[0];

                let valueToPrint;

                if (key === "Skater") {
                  valueToPrint = goalie.name.default;
                } else if (key === "FO%") {
                  valueToPrint = (goalie[value] * 100).toFixed(1);
                } else {
                  valueToPrint = goalie[value];
                }

                return (
                  <th
                    className={cn("w-18 p-2 text-left font-normal", {
                      "text-center": key !== "Skater",
                      "border-r border-slate-300": key === "Skater",
                    })}
                    key={key}
                  >
                    {valueToPrint ?? "--"}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
