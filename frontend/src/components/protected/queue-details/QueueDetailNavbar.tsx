import { Button } from "@/components/ui/button";
import { queueNavLinks } from "@/constants";
import { QueueNavLinks } from "@/types/dashboard.types";
import { PauseCircle, PlayCircle, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import QueueDetailMobileNavbar from "./QueueDetailMobileNavbar";
import DeleteQueuePopUp from "../queue-list/DeleteQueuePopUp";

interface QueueDetailNavbarProps {
  activeTab: QueueNavLinks;
  setActiveTab: Dispatch<SetStateAction<QueueNavLinks>>;
}
const QueueDetailNavbar = ({
  activeTab,
  setActiveTab,
}: QueueDetailNavbarProps) => {
  return (
    <nav className="mt-6 flex justify-between gap-4 md:mt-0">
      {/* Dashboard nav links */}
      <ul className="hidden items-center gap-4 md:flex">
        {queueNavLinks.map((link, i) => (
          <li key={i}>
            <Button
              variant={"ghost"}
              className={`text-muted-foreground hover:bg-transparent hover:underline ${activeTab === link.link && "font-medium text-foreground underline"}`}
              onClick={() => setActiveTab(link.link)}
            >
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
      {/* Mobile Nav links */}
      <div className="flex gap-2">
        <div className="flex">
          <Button variant={"ghost"} className="rounded-none border">
            <PauseCircle />
          </Button>
          <Button
            variant={"ghost"}
            className="rounded-none border bg-[#D7FCC5] hover:bg-success hover:text-white"
          >
            <PlayCircle />
          </Button>
        </div>
        {/* Need to work on it */}
        {activeTab === "jobs" && (
          <Button className="" variant={"outline"}>
            <Plus />
          </Button>
        )}

        <DeleteQueuePopUp queueId={"queue.id"} />
      </div>
      <QueueDetailMobileNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </nav>
  );
};

export default QueueDetailNavbar;
