import { Skeleton } from "@/components/ui/skeleton";

const QueueDetailJobTblLoader = ({ perPage }: { perPage: number }) => {
  return (
    <>
      {Array.from({ length: perPage }).map((_, i) => (
        <div className="grid grid-cols-9 font-medium" key={i}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center px-2 py-4">
              <Skeleton className="h-2 w-20 rounded-md" />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default QueueDetailJobTblLoader;
