import { useState } from "react";

import { cn } from "~/utils";

const tabClasses =
  "min-w-20 px-2 cursor-pointer border-b text-center hover:font-semibold";

type TabsProps = {
  data: {
    id: number;
    title: string;
    component: () => JSX.Element;
  }[];
};

export default function Tabs({ data }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState<number>(data?.[0]?.id);

  if (data.length === 0) {
    return null;
  }

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
              }}
              onKeyDown={() => {
                setActiveTabId(data[tab.id].id);
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
