import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { TeamStandings } from "types/standings";

import { cn } from "~/utils";

import getStandingsColumns, { STANDING_TYPES } from "../../columns";

type StandingsTableProps = {
  data: TeamStandings[];
  standingsColumnType: string;
  divisionName?: string;
};

const handleSortArrow = (
  headerId: string,
  sortId: string,
  direction: boolean,
) => {
  if (headerId === sortId) {
    if (direction) {
      return <div>&#9662;</div>;
    }

    return <div className="rotate-180">&#9662;</div>;
  }

  return <div>&nbsp;</div>;
};

export default function StandingsTable({
  data,
  standingsColumnType,
  divisionName,
}: StandingsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "points",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns: getStandingsColumns(standingsColumnType),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-scroll md:overflow-auto">
      <table className="w-full border-b border-t border-slate-300 bg-white text-xs">
        <thead>
          <tr className="border-b border-slate-300">
            {table.getHeaderGroups().map((headerGroup) => {
              return headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={cn("cursor-pointer text-sm hover:bg-blue-100", {
                    "bg-blue-100": header.id === sorting[0]?.id,
                    "pointer-events-none sticky left-0 bg-white pl-3 text-left":
                      idx === 0,
                  })}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="mt-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                  <div className="text-xs">
                    {handleSortArrow(
                      header.id,
                      sorting[0]?.id,
                      sorting[0]?.desc,
                    )}
                  </div>
                </th>
              ));
            })}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIdx) => {
            return (
              <tr
                key={row.id}
                className={cn("border-b border-slate-300", {
                  "border-b border-dashed border-black":
                    (standingsColumnType === STANDING_TYPES.Conference &&
                      rowIdx === 7) ||
                    (standingsColumnType === STANDING_TYPES.Wild_Card &&
                      divisionName === "Wild Card" &&
                      rowIdx === 1),
                })}
              >
                {row.getVisibleCells().map((cell, idx) => {
                  return (
                    <td
                      key={cell.id}
                      className={cn(
                        "p-2 text-center",
                        {
                          "sticky left-0 w-60 min-w-60 bg-white text-left":
                            idx === 0,
                        },
                        { "border-l border-slate-400/40": idx === 1 },
                        {
                          "min-w-16 border-r border-slate-300/50 last:border-none md:w-4":
                            idx > 0,
                        },
                        { "bg-blue-100": cell.column.id === sorting[0]?.id },
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
