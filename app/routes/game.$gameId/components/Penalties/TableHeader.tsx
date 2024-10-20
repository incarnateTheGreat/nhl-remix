export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="p-2 text-left text-sm">Team</th>
        <th className="border-r border-gray-400 p-2 text-left text-sm">Time</th>
        <th className="border-r border-gray-400 p-2 text-left text-sm">
          Player
        </th>
        <th className="p-2 text-left text-sm">Penalty</th>
      </tr>
    </thead>
  );
}
