import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

import { cn } from "~/utils";

const tabClasses =
  "min-w-20 px-2 cursor-pointer border-b text-center hover:font-semibold";

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

  if (data.length === 0) return null;

  useEffect(() => {
    setActiveTabId(defaultTab);
  }, [defaultTab]);

  return (
    <div>
      <ul className="flex">
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
      <div>{data[activeTabId].component()}</div>
    </div>
  );
}
