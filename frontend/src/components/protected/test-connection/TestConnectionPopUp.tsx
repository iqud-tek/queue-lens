"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SlidingTabBar } from "./SlidingTabBar";
import TestConnectionSettingsForm from "./TestConnectionSettingsForm";
import MonitorScreen from "./MonitorScreen";
// (Optional) If you have actual Notifications/Alerts components, import them here:
// import NotificationsScreen from "./NotificationsScreen";
// import AlertsScreen from "./AlertsScreen";

import { DashboardTblItem } from "@/types/dashboard.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationSettingsForm from "./NotificationSettingsForm";
import AlertTable from "./AlertTable";

type TestConnectionPopUpProps = {
  triggerComponent: React.ReactNode;
  formData: DashboardTblItem;
  refetch: () => void;
};

const TestConnectionPopUp = ({
  triggerComponent,
  formData,
  refetch,
}: TestConnectionPopUpProps) => {
  // 1) Keep track of which tab is active
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="min-h-[460px] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Connection test</DialogTitle>
          <DialogDescription>
            Configure access to your Redis instance
          </DialogDescription>
        </DialogHeader>

        {/* 2) The tab bar with underline animation */}
        <SlidingTabBar
          activeTabIndex={activeTabIndex}
          onChangeTab={(index) => setActiveTabIndex(index)}
        />

        {/* 3) Sliding container for tab content */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${activeTabIndex * 100}%)`,
            }}
          >
            {/* Tab 1: Settings */}
            <div className="w-full flex-shrink-0 px-2">
              <TestConnectionSettingsForm
                refetch={refetch}
                editForm={true}
                formData={formData}
              />
            </div>

            {/* Tab 2: Monitors */}
            <ScrollArea className="max-h-[400px] w-full flex-shrink-0 overflow-y-auto px-2">
              <MonitorScreen />
            </ScrollArea>

            {/* Tab 3: Notifications (placeholder or real component) */}
            <div className="w-full flex-shrink-0 px-2">
              <NotificationSettingsForm />
            </div>

            {/* Tab 3: Alerts (placeholder or real component) */}
            <div className="w-full flex-shrink-0 px-2">
              <AlertTable />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestConnectionPopUp;
