import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { cn } from "~/utils";

const sweaterNumberCol = {
  minWidth: "38px",
  width: "38px",
  textAlign: "center",
};

const playerNameCol = {
  flex: "160px",
  maxWidth: "160px",
  minWidth: "160px",
  width: "160px",
  textAlign: "left",
};

const defaultCol = {
  minWidth: "48px",
  width: "48px",
  flex: "48",
  textAlign: "center",
};

const handleColumnWidth = (id: string): object => {
  if (id === "sweaterNumber") {
    return sweaterNumberCol;
  } else if (id === "name") {
    return playerNameCol;
  }

  return defaultCol;
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

type BoxscoreTableProps = {
  data: object[];
  initSortById: string;
  initSortDirection?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
};

export default function BoxscoreTable({
  data,
  columns,
  initSortById,
  initSortDirection = "desc",
}: BoxscoreTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: initSortById,
      desc: initSortDirection === "desc" ? true : false,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="my-4 w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="flex">
            {headerGroup.headers.map((header, idx) => {
              return (
                <th
                  key={header.id}
                  className={cn("cursor-pointer text-xs hover:bg-blue-100", {
                    "bg-blue-100": header.id === sorting[0]?.id,
                    "sticky left-0 bg-white pl-2 text-left": idx === 0,
                  })}
                  style={handleColumnWidth(header.column.id)}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="mt-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="border-500-slate border-b">
        {table.getRowModel().rows.map((row, rowIdx) => {
          return (
            <tr
              key={row.id}
              className="flex border-b border-b-slate-200/90 last:border-none odd:bg-slate-100"
            >
              {row.getVisibleCells().map((cell, idx) => {
                return (
                  <td
                    key={cell.id}
                    className={cn("p-2 text-xs", {
                      "sticky left-0 w-56 min-w-56 text-left": idx === 0,
                      "bg-slate-100": rowIdx % 2 === 0,
                      "bg-white": rowIdx % 2 !== 0,
                      "bg-blue-100": cell.column.id === sorting[0]?.id,
                    })}
                    style={handleColumnWidth(cell.column.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
