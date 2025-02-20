import { Skeleton } from "../ui/skeleton";
import clsx from "clsx"; // Optional utility for merging classes

type MobileCardLoader = {
  perPage: number;
  className?: string;
  skeletonClassName?: string;
};
const MobileCardLoader = ({
  perPage,
  className = "",
  skeletonClassName = "",
}: MobileCardLoader) => {
  return (
    <div className={clsx("mt-6 space-y-4", className)}>
      {/* Card Skeletons */}
      {[...Array(perPage)].map((_, index) => (
        <Skeleton
          key={index}
          className={clsx("h-[190px]", skeletonClassName)}
        />
      ))}
    </div>
  );
};

export default MobileCardLoader;
