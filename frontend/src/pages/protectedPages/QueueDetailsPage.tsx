import {
  QueueDetailBreadcrumb,
  QueueDetailJob,
  QueueDetailMetrics,
  QueueDetailNavbar,
} from "@/components";
import { QueueNavLinks } from "@/types/dashboard.types";
import { useState } from "react";
import { QueueJobsActiveFilterTabs } from "@/types/dashboard.types";

const QueueDetailsPage = () => {
  const [activeTab, setActiveTab] = useState<QueueNavLinks>("metrics");
  const [activeFilterTab, setActiveFilterTab] =
    useState<QueueJobsActiveFilterTabs>("waiting");
  return (
    <main className="main">
      <section className="mb-8 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Queue Name</h1>
            <QueueDetailBreadcrumb />
          </div>
        </div>
        <QueueDetailNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>
      <div>
        {activeTab === "metrics" && <QueueDetailMetrics />}
        {activeTab === "jobs" && (
          <QueueDetailJob
            activeFilterTab={activeFilterTab}
            setActiveFilterTab={setActiveFilterTab}
          />
        )}
      </div>
    </main>
  );
};

export default QueueDetailsPage;
