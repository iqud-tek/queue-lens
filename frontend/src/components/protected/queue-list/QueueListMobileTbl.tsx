import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import QueueListMobileTblLoader from "./QueueListMobileTblLoader";

// Define the type for a single queue item
interface QueueItem {
  id: string | number; // Adjust based on actual data type
  name: string;
  active: number;
  completed: number;
  delayed: number;
  failed: number;
  waiting: number;
  prioritized: number;
  total: number;
  workers: number;
  paused: number;
}

interface QueueListMobileTblProps {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: { status?: number; message?: string } | null | unknown; // Define error shape
  data: QueueItem[] | null;
  perPage: number;
}

const QueueListMobileTbl: React.FC<QueueListMobileTblProps> = ({
  isLoading,
  isFetching,
  isError,
  error,
  data,
  perPage,
}) => {
  function isErrorWithStatus(error: unknown): error is { status: number } {
    return typeof error === "object" && error !== null && "status" in error;
  }
  return (
    <div className="mt-6 block space-y-4 md:hidden">
      {/* Loading or Error State */}
      {isLoading || isFetching ? (
        <QueueListMobileTblLoader perPage={Number(perPage)} />
      ) : isError ? (
        <div className="grid h-40 place-items-center">
          <p className="p-4 text-destructive">
            {isErrorWithStatus(error)
              ? `Error: ${error.status}`
              : "Something went wrong"}
          </p>
        </div>
      ) : data && data?.length > 0 ? (
        data.map((queue) => (
          <div
            key={queue.id}
            className="space-y-2 rounded-md border bg-white p-4 shadow-sm"
          >
            {/* Queue Name */}
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={`${queue.id}`}
                      className="text-lg font-medium text-primary hover:underline"
                    >
                      {queue.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Queue Name</p>
                    <p>{queue.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <p>
                  Active: <span className="font-semibold">{queue.active}</span>
                </p>
              </div>
              <div>
                <p>
                  Completed:{" "}
                  <span className="font-semibold">{queue.completed}</span>
                </p>
              </div>
              <div>
                <p>
                  Delayed:{" "}
                  <span className="font-semibold">{queue.delayed}</span>
                </p>
              </div>
              <div>
                <p>
                  Failed: <span className="font-semibold">{queue.failed}</span>
                </p>
              </div>
              <div>
                <p>
                  Waiting:{" "}
                  <span className="font-semibold">{queue.waiting}</span>
                </p>
              </div>
              <div>
                <p>
                  Prioritized:{" "}
                  <span className="font-semibold">{queue.prioritized}</span>
                </p>
              </div>
              <div>
                <p>
                  Total: <span className="font-semibold">{queue.total}</span>
                </p>
              </div>
              <div>
                <p>
                  Workers:{" "}
                  <span className="font-semibold">{queue.workers}</span>
                </p>
              </div>
              <div>
                <p>
                  Paused: <span className="font-semibold">{queue.paused}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            {/* <div className="flex items-center justify-end space-x-2">
                <QueueAddEditPopUp editForm={true} formData={queue} />
                <DeleteQueuePopUp queueId={queue.id} />
              </div> */}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No data found.</p>
      )}
    </div>
  );
};

export default QueueListMobileTbl;
