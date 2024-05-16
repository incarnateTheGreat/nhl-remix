import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <nav className="p-0">
            <ul className="bg-red-500items-center flex">
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
        <main className="flex flex-col overflow-y-auto">
          <section id="detail">
            <Outlet />
          </section>
        </main>
        <footer>
          <span className="font-semibold">
            &copy; {new Date().getFullYear()} NHL Scores Inc.
          </span>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
