import { SkaterStats } from "~/types";
import { cn, SKATERS } from "~/utils";

type DefensemenProps = {
  defensemen: SkaterStats[];
};

export default function Defensemen({ defensemen }: DefensemenProps) {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr>
          {SKATERS.map((skater) => {
            const key = Object.keys(skater)[0];

            if (key === "FO%") return;

            let valueToPrint;

            if (key === "Skater") {
              valueToPrint = "Defenders";
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
        {defensemen.map((defender) => {
          return (
            <tr
              key={defender.playerId}
              className="border-b border-b-slate-200/90 odd:bg-slate-200/45"
            >
              {SKATERS.map((skater) => {
                const [key, value] = Object.entries(skater)[0];

                if (key === "FO%") return;

                let valueToPrint;

                if (key === "Skater") {
                  valueToPrint = defender.name.default;
                } else if (key === "FO%") {
                  valueToPrint = (defender[value] * 100).toFixed(1);
                } else {
                  valueToPrint = defender[value];
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
