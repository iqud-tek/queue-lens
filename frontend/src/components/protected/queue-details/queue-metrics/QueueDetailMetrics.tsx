import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchQueueMetricsQuery } from "@/store/apis/queueDetailAPI";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import QueueMetricsLoader from "./QueueMetricsLoader";

const QueueDetailMetrics = () => {
  const { subId } = useParams();

  const {
    data: metrics,
    isLoading,
    isError,
    isFetching,
    error,
  } = useFetchQueueMetricsQuery(subId);

  const calculatePercentage = (value: number, total: number): number => {
    if (total === 0) return 0; // Avoid division by zero
    return Math.round((value / total) * 100 * 100) / 100; // Round to 2 decimal places
  };

  return (
    <>
      {(isLoading || isFetching) && <QueueMetricsLoader />}
      {/* Content Section */}
      {metrics && !isError && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* In Queue */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-800">In Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-4xl font-semibold text-gray-800">
                  Total: {metrics.total}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs font-medium text-purple-600">
                      Waiting
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {metrics.waiting}
                    </p>
                    <p className="text-sm text-gray-500">
                      ({calculatePercentage(metrics.waiting, metrics.total)}%)
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-blue-600">Delayed</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {metrics.delayed}
                    </p>
                    <p className="text-sm text-gray-500">
                      ({calculatePercentage(metrics.delayed, metrics.total)}%)
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-green-600">Active</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {metrics.active}
                    </p>
                    <p className="text-sm text-gray-500">
                      ({calculatePercentage(metrics.active, metrics.total)}%)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processed */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-800">Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around">
                {/* Completed Chart */}
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24">
                    <CircularProgressbar
                      value={calculatePercentage(
                        metrics?.completed,
                        metrics?.total,
                      )}
                      text={`${calculatePercentage(metrics?.completed, metrics?.total)}%`}
                      styles={buildStyles({
                        pathColor: "#10b981", // Green
                        textColor: "#10b981",
                        trailColor: "#d1fae5", // Light green
                      })}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-800">Completed</p>
                  <p className="text-xs text-gray-500">
                    Total: {metrics.completed}
                  </p>
                </div>

                {/* Failed Chart */}
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24">
                    <CircularProgressbar
                      value={calculatePercentage(metrics.failed, metrics.total)}
                      text={`${calculatePercentage(metrics.failed, metrics.total)}%`}
                      styles={buildStyles({
                        pathColor: "#ef4444", // Red
                        textColor: "#ef4444",
                        trailColor: "#fdecea", // Light red
                      })}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-800">Failed</p>
                  <p className="text-xs text-gray-500">
                    Total: {metrics.failed}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* ERROR COMPONENT */}
      {isError && (
        <Card className="grid h-[230px] place-items-center">
          <CardContent className="text-destructive">
            <p className="p-4 text-destructive">
              {error && "status" in error && error.status
                ? `Error: ${error.status}`
                : "Something went wrong"}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default QueueDetailMetrics;
