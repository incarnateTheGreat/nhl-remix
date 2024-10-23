import { useRouteLoaderData } from "@remix-run/react";
import { StandingsData } from "../..";
import StandingsDivision from "./StandingsDivision";

export default function Division() {
  const { conferences } = useRouteLoaderData(
    "routes/standings",
  ) as StandingsData;

  return (
    <>
      {Object.keys(conferences).map((conference) => {
        return (
          <div className="my-6">
            <h2 className="mb-2 text-lg font-extrabold text-black">
              {conference}
            </h2>
            <div className="grid grid-cols-1 gap-y-6">
              {Object.keys(conferences[conference]).map((division) => {
                return (
                  <div>
                    <h3 className="text-md mb-0.5 font-extrabold text-black">
                      {division}
                    </h3>
                    <StandingsDivision
                      data={conferences[conference][division]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
