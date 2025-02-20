import { Skeleton } from "@/components/ui/skeleton";

const QueueMetricsLoader = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <Skeleton className="h-[230px]" />
      <Skeleton className="h-[230px]" />
    </div>
  );
};

export default QueueMetricsLoader;
