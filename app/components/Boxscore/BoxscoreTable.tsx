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
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-left">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr
              key={row.id}
              className="border-b border-b-slate-200/90 odd:bg-slate-200/45"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-r border-b-slate-200/90">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
