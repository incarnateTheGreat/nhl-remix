import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import standingsColumns from "../columns";
import { cn } from "~/utils";

import { TeamStandings } from "types/standings";

type StandingsTableProps = {
  data: TeamStandings[];
};

export default function StandingsTable({ data }: StandingsTableProps) {
  const table = useReactTable({
    data,
    columns: standingsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-scroll md:overflow-auto">
      <table className="w-full bg-white text-xs">
        <thead>
          <tr>
            {table.getHeaderGroups().map((headerGroup) => {
              return headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={cn("border-b border-t border-[#263340] p-2", {
                    "sticky left-0 bg-white text-left": idx === 0,
                  })}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ));
            })}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-b border-slate-300">
                {row.getVisibleCells().map((cell, idx) => {
                  return (
                    <td
                      key={cell.id}
                      className={cn(
                        "p-2 text-center",
                        {
                          "sticky left-0 w-52 min-w-52 bg-white text-left":
                            idx === 0,
                        },
                        { "border-l border-slate-400/40": idx === 1 },
                        {
                          "min-w-16 border-r border-slate-300/50 last:border-none md:w-4":
                            idx > 0,
                        },
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
