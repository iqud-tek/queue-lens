import { QueueJobsActiveFilterTabs } from "@/types/dashboard.types";
import QueueDetailJobFilter from "./QueueDetailJobFilter";
import QueueDetailJobTbl from "./QueueDetailJobTbl";

type QueueDetailJobProps = {
  activeFilterTab: QueueJobsActiveFilterTabs;
  setActiveFilterTab: (value: QueueJobsActiveFilterTabs) => void;
};

const QueueDetailJob = ({
  activeFilterTab,
  setActiveFilterTab,
}: QueueDetailJobProps) => {
  return (
    <div>
      {/* Filter buttons */}
      <QueueDetailJobFilter
        activeFilterTab={activeFilterTab}
        setActiveFilterTab={setActiveFilterTab}
      />
      <QueueDetailJobTbl />
    </div>
  );
};

export default QueueDetailJob;
