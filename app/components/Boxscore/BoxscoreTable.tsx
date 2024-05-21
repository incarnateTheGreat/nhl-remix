import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type BoxscoreTableProps = {
  data: object[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
};

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

export default function BoxscoreTable({ data, columns }: BoxscoreTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="my-4 w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="flex">
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  className="p-2"
                  style={handleColumnWidth(header.column.id)}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="border-500-slate border-b">
        {table.getRowModel().rows.map((row) => {
          return (
            <tr
              key={row.id}
              className="flex border-b border-b-slate-200/90 last:border-none odd:bg-slate-200/45"
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="p-2 odd:bg-slate-200/45"
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
