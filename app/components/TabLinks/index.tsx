import { useNavigate } from "@remix-run/react";
import { JSX, useEffect, useState } from "react";

import { cn } from "~/utils";

const tabClasses =
  "min-w-20 px-2 cursor-pointer border-b text-center hover:font-semibold text-xs md:text-sm whitespace-nowrap ";

type TabWithNavigateProps = {
  data: {
    id: number;
    title: string;
    component: () => JSX.Element;
    url: string;
  }[];
  defaultTab?: number;
};

export default function TabWithNavigate({
  data,
  defaultTab = 0,
}: TabWithNavigateProps) {
  const navigate = useNavigate();

  const [activeTabId, setActiveTabId] = useState<number>(defaultTab);

  useEffect(() => {
    setActiveTabId(defaultTab);
  }, [defaultTab]);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <ul className="flex overflow-x-scroll">
        {data.map((tab) => {
          return (
            <li
              role="menuitem"
              key={tab.id}
              className={cn(tabClasses, {
                "border-b-2 border-black font-semibold": activeTabId === tab.id,
              })}
              onClick={() => {
                setActiveTabId(data[tab.id].id);
                navigate(data[tab.id].url);
              }}
              onKeyDown={() => {
                setActiveTabId(data[tab.id].id);
                navigate(data[tab.id].url);
              }}
            >
              {tab.title}
            </li>
          );
        })}
      </ul>
      <div className="p-3">{data[activeTabId].component()}</div>
    </div>
  );
}
