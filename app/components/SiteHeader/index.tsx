import { Link, NavLink, useLocation } from "@remix-run/react";

import NHL_Logo from "~/assets/nhl_logo.svg";
import { cn } from "~/utils";

const links = [
  {
    label: "Standings",
    path: "/standings",
  },
  {
    label: "Playoffs",
    path: "/playoffs",
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
                  className={cn("p-4 text-xs hover:underline", {
                    underline: pathname === link.path,
                  })}
                >
                  <NavLink
                    prefetch="intent"
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "border-b border-dashed border-slate-500 font-semibold"
                        : "border-slate-500 hover:border-b hover:border-dashed"
                    }
                  >
                    {link.label}
                  </NavLink>
                </div>
              );
            })}
          </li>
        </ul>
      </nav>
    </header>
  );
}
