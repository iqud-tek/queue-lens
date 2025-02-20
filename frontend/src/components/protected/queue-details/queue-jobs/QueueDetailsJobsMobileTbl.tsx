import { JobDetailItem } from "@/types/dashboard.types";
import QueueDetailsJobMobileTblLoader from "./QueueDetailsJobMobileTblLoader";
import DeleteJobPopUp from "./DeleteJobPopup";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QueueListMobileTblProps {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: { status?: number; message?: string } | null | unknown; // Define error shape
  data: JobDetailItem[] | null;
  perPage: number;
}

const QueueDetailsJobsMobileTbl: React.FC<QueueListMobileTblProps> = ({
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
        <QueueDetailsJobMobileTblLoader perPage={Number(perPage)} />
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
              <p className="text-lg font-medium text-primary hover:underline">
                {queue.name}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <p>
                  id: <span className="font-semibold">{queue.id}</span>
                </p>
              </div>
              <div>
                <p>
                  Waited: <span className="font-semibold">{queue.waited}</span>
                </p>
              </div>
              <div>
                <p>
                  Processed:{" "}
                  <span className="font-semibold">{queue.processed}</span>
                </p>
              </div>
              <div>
                <p>
                  Finished:{" "}
                  <span className="font-semibold">{queue.finished}</span>
                </p>
              </div>
              <div>
                <p>
                  Run: <span className="font-semibold">{queue.run}</span>
                </p>
              </div>
              <div>
                <p>
                  Attempts:{" "}
                  <span className="font-semibold">{queue.attempts}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="!mt-6 flex items-center justify-end space-x-2">
              <Button variant={"secondary"}>
                <Eye />
              </Button>
              <DeleteJobPopUp queueId={queue.id} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No data found.</p>
      )}
    </div>
  );
};

export default QueueDetailsJobsMobileTbl;
