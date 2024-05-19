import { SkaterStats } from "~/types";
import { cn, SKATERS } from "~/utils";

type ForwardsProps = {
  forwards: SkaterStats[];
};

export default function Forwards({ forwards }: ForwardsProps) {
  return (
    <table className="my-2 w-full">
      <thead>
        <tr>
          {SKATERS.map((skater) => {
            const key = Object.keys(skater)[0];

            let valueToPrint;

            if (key === "Skater") {
              valueToPrint = "Forwards";
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
        {forwards.map((forward) => {
          return (
            <tr
              key={forward.playerId}
              className="border-b border-b-slate-200/90 odd:bg-slate-200/45"
            >
              {SKATERS.map((skater) => {
                const [key, value] = Object.entries(skater)[0];
                let valueToPrint;

                if (key === "Skater") {
                  valueToPrint = forward.name.default;
                } else if (key === "FO%") {
                  valueToPrint = (forward[value] * 100).toFixed(1);
                } else {
                  valueToPrint = forward[value];
                }

                return (
                  <th
                    className={cn("w-18 p-2 text-left font-normal", {
                      "text-center": key !== "Skater",
                      "border-r border-slate-300": key === "Skater",
                    })}
                    key={key}
                  >
                    {valueToPrint}
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
