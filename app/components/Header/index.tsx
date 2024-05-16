import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header>
      <nav className="w-full md:mx-0">
        <ul className="flex w-full items-center lg:mx-auto lg:w-[1280px]">
          <li className="m-0 mr-2.5 flex self-start">
            <Link to="/" className="hover:underline">
              <h1 className="text-xl">NHL Scores</h1>
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/scores" className="mt-1 text-xs hover:underline">
              <span>Scores</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
