import { QueueJobsActiveFilterTabs } from "@/types/dashboard.types";

const QueueDetailJobFilter = ({
  activeFilterTab,
  setActiveFilterTab,
}: {
  activeFilterTab: QueueJobsActiveFilterTabs;
  setActiveFilterTab: (value: QueueJobsActiveFilterTabs) => void;
}) => {
  const handleTabFilter = (status: QueueJobsActiveFilterTabs) => {
    setActiveFilterTab(status);
  };
  return (
    <div>
      <div className="border-b pl-4">
        <ul
          className="flex gap-2 overflow-x-auto text-center text-sm font-medium md:gap-6"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {/* Waiting */}
          <li className="group min-w-[100px]" role="presentation">
            <button
              className={`text-black-3 mt-2 inline-block px-1 pb-2 font-semibold ${
                activeFilterTab === "waiting"
                  ? "border-b-2 border-gray-600"
                  : ""
              } group-hover:border-gray-600`}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => handleTabFilter("waiting")}
            >
              Waiting
              <span
                className={`ml-2 inline-block rounded-md px-2 py-[2px] text-white ${
                  activeFilterTab === "waiting"
                    ? "bg-gray-600"
                    : "bg-gray-400 group-hover:bg-gray-500"
                }`}
              >
                12
              </span>
            </button>
          </li>

          {/* Delayed */}
          <li className="group me-2 min-w-[120px]" role="presentation">
            <button
              className={`text-black-3 mt-2 inline-block px-1 pb-2 font-semibold ${
                activeFilterTab === "delayed"
                  ? "border-b-2 border-destructive"
                  : ""
              } group-hover:border-destructive`}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => handleTabFilter("delayed")}
            >
              Delayed
              <span
                className={`ml-2 inline-block rounded-md px-2 py-[2px] ${
                  activeFilterTab === "delayed"
                    ? "bg-destructive text-white"
                    : "bg-red-100 text-red-600 group-hover:bg-red-200"
                }`}
              >
                10
              </span>
            </button>
          </li>

          {/* Active */}
          <li className="group me-2 min-w-[120px]" role="presentation">
            <button
              className={`text-black-3 mt-2 inline-block px-1 pb-2 font-semibold ${
                activeFilterTab === "active"
                  ? "border-b-2 border-yellow-600"
                  : ""
              } group-hover:border-yellow-600`}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => handleTabFilter("active")}
            >
              Active
              <span
                className={`ml-2 inline-block rounded-md px-2 py-[2px] ${
                  activeFilterTab === "active"
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200"
                }`}
              >
                7
              </span>
            </button>
          </li>

          {/* Completed */}
          <li className="group me-2 min-w-[130px]" role="presentation">
            <button
              className={`text-black-3 mt-2 inline-block px-1 pb-2 font-semibold ${
                activeFilterTab === "completed"
                  ? "border-b-2 border-green-600"
                  : ""
              } group-hover:border-green-600`}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => handleTabFilter("completed")}
            >
              Completed
              <span
                className={`ml-2 inline-block rounded-md px-2 py-[2px] ${
                  activeFilterTab === "completed"
                    ? "bg-green-500 text-white"
                    : "bg-green-100 text-green-600 group-hover:bg-green-200"
                }`}
              >
                200
              </span>
            </button>
          </li>

          {/* Failed */}
          <li className="group min-w-[100px]" role="presentation">
            <button
              className={`text-black-3 mt-2 inline-block px-1 pb-2 font-semibold ${
                activeFilterTab === "failed" ? "border-b-2 border-red-700" : ""
              } group-hover:border-red-700`}
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => handleTabFilter("failed")}
            >
              Failed
              <span
                className={`ml-2 inline-block rounded-md px-2 py-[2px] text-white ${
                  activeFilterTab === "failed"
                    ? "bg-red-700"
                    : "bg-destructive group-hover:bg-red-600"
                }`}
              >
                2
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QueueDetailJobFilter;
