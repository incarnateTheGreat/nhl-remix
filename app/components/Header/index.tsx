import { Link } from "@remix-run/react";

import NHL_Logo from "~/assets/nhl_logo.svg";

export default function Header() {
  return (
    <header>
      <nav className="w-full md:mx-0">
        <ul className="flex w-full items-center lg:mx-auto lg:w-[1280px]">
          <li className="m-0 mr-2.5 flex self-start">
            <Link to="/" className="hover:underline">
              <img src={NHL_Logo} alt="NHL Logo" width={50} />
            </Link>
          </li>
          <li className="ml-2 flex items-center">
            <Link
              to="/scores"
              className="text-md mt-1 hover:font-semibold hover:underline"
            >
              <span>Scores</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
