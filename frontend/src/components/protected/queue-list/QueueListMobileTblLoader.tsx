import { Skeleton } from "@/components/ui/skeleton";

const QueueListMobileTblLoader = ({ perPage }: { perPage: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: perPage }).map((_, i) => (
        <Skeleton className="h-[202px] w-full" key={i} />
      ))}
    </div>
  );
};

export default QueueListMobileTblLoader;
