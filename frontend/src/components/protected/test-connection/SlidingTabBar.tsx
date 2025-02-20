import { useEffect, useRef, useState } from "react";
import { BellIcon, CheckCircle, Monitor, Settings } from "lucide-react";

const allTabs = [
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
  },
  {
    id: "monitors",
    name: "Monitors",
    icon: Monitor,
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: CheckCircle,
  },
  {
    id: "alerts",
    name: "Alerts",
    icon: BellIcon,
  },
];

type SlidingTabBarProps = {
  activeTabIndex: number;
  onChangeTab: (index: number) => void;
};

export const SlidingTabBar = ({
  activeTabIndex,
  onChangeTab,
}: SlidingTabBarProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    const currentTab = tabsRef.current[activeTabIndex];
    if (currentTab) {
      setTabUnderlineLeft(currentTab.offsetLeft);
      setTabUnderlineWidth(currentTab.clientWidth);
    }
  }, [activeTabIndex]);

  return (
    <div className="relative mx-auto flex h-12 w-full text-foreground">
      {/* Underline highlight */}
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full border-b border-primary" />
      </span>

      {/* Tabs */}
      {allTabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <button
            key={tab.id}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${
              isActive ? "font-medium text-primary" : "hover:bg-muted"
            } my-auto flex cursor-pointer select-none items-center gap-2 rounded-sm px-4 py-2 text-center font-medium text-muted-foreground transition-colors`}
            onClick={() => onChangeTab(index)}
          >
            <tab.icon size={18} />
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
