import { Link, useLocation } from "@remix-run/react";

import NHL_Logo from "~/assets/nhl_logo.svg";
import { cn } from "~/utils";

const links = [
  {
    path: "/standings",
  },
];

export default function SiteHeader() {
  const { pathname } = useLocation();

  return (
    <header>
      <nav className="w-full md:mx-0">
        <ul className="flex w-full items-center lg:mx-auto lg:w-[1280px]">
          <li className="m-0 mr-2.5 flex self-start">
            <Link to="/" className="hover:underline">
              <img src={NHL_Logo} alt="NHL Logo" width={50} />
            </Link>
          </li>
          <li className="flex items-center text-sm">
            {links.map((link) => {
              return (
                <div
                  key={link.path}
                  className={cn("ml-2 p-4 text-xs hover:underline", {
                    underline: pathname === link.path,
                  })}
                >
                  <Link prefetch="intent" to={link.path}>
                    Standings
                  </Link>
                </div>
              );
            })}
          </li>
        </ul>
      </nav>
    </header>
  );
}
