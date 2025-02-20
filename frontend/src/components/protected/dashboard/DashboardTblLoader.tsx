const DashboardTblLoader = ({ perPage }: { perPage: number }) => {
  return (
    <>
      {Array.from({ length: perPage }).map((_, i) => (
        <div key={i} className="grid grid-cols-8 border-t py-2">
          <div className="col-span-2 flex items-center px-2 py-4">
            <div className="h-2 w-20 animate-pulse rounded-md bg-muted-foreground" />
          </div>
          <div className="col-span-2 flex items-center px-2 py-4">
            <div className="h-2 w-20 animate-pulse rounded-md bg-muted-foreground" />
          </div>
          <div className="flex items-center px-2 py-4">
            <div className="h-2 w-20 animate-pulse rounded-md bg-muted-foreground" />
          </div>
          <div className="flex items-center px-2 py-4">
            <div className="h-2 w-20 animate-pulse rounded-md bg-muted-foreground" />
          </div>
          <div className="flex items-center px-2 py-4">
            <div className="h-2 w-20 animate-pulse rounded-md bg-muted-foreground" />
          </div>
          <div className="flex items-center px-2 py-4">
            <div className="h-2 w-20 animate-pulse rounded-md bg-muted-foreground" />
          </div>
        </div>
      ))}
    </>
  );
};

export default DashboardTblLoader;
