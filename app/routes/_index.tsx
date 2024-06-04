import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex h-full flex-col bg-white px-4 py-2">
      <Link to="/scores">Games</Link>
    </div>
  );
}
