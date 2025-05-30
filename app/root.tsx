import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import appStylesHref from "./app.css?url";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const meta: MetaFunction = () => {
  return [
    { title: "NHL Scores" },
    {
      property: "og:title",
      content: "NHL Scores",
    },
    {
      name: "description",
      content: "This is an app that details NHL Scores using Remix",
    },
  ];
};

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
        <SiteHeader />
        <main>
          <section
            id="detail"
            className="flex w-full flex-col overflow-y-auto lg:mx-auto lg:max-w-[1280px]"
          >
            <Outlet />
          </section>
        </main>
        <SiteFooter />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
