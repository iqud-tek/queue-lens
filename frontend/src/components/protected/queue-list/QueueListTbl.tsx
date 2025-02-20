import { ArrowDownUp } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { QueueTblItem } from "@/types/dashboard.types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import DashboardTblLoader from "../dashboard/DashboardTblLoader";
import { useFetchQueueListQuery } from "@/store/apis/queueListAPI";
import QueueAddEditPopUp from "./QueueAddEditPopUp";
import DeleteQueuePopUp from "./DeleteQueuePopUp";
import QueueListMobileTbl from "./QueueListMobileTbl";

const QueueListTbl = () => {
  const [perPage, setPerPage] = useState("5");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  // Fetch data using RTK Query
  const { data, isLoading, isError, isFetching, error } =
    useFetchQueueListQuery({
      page,
      perPage: parseInt(perPage),
      filter,
    });

  // Calculate total pages
  const totalItems = 16;
  const totalPages = Math.ceil(totalItems / parseInt(perPage, 10));

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <section className="">
      {/* FILTER */}
      <div>
        <Input
          className="max-w-[400px]"
          placeholder="Filter QueName"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          disabled={isError}
        />
      </div>

      {/* TABLE */}
      <div className="hidden w-screen overflow-x-auto md:block md:w-auto">
        <div className="mt-6 w-[1280px] rounded-md border md:w-auto">
          {/* THEAD */}
          <div className="grid grid-cols-11 font-medium">
            <div className="flex items-center justify-center p-2">
              <p>Name</p>
              <Button
                disabled={isError}
                variant={"ghost"}
                className="text-muted-foreground"
              >
                <ArrowDownUp />
              </Button>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Active</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p className="text-center">Completed</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Delayed</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Failed</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Waiting</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p className="text-center">Prioritized</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Total</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Workers</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Paused</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Action</p>
            </div>
          </div>
          {/* TBODY */}
          <div>
            {isLoading || isFetching ? (
              <DashboardTblLoader perPage={parseInt(perPage)} />
            ) : isError ? (
              <div className="grid h-40 place-items-center">
                <p className="p-4 text-destructive">
                  {error && "status" in error && error.status
                    ? `Error: ${error.status}`
                    : "Something went wrong"}
                </p>
              </div>
            ) : data?.length > 0 ? (
              data.map((queue: QueueTblItem) => (
                <div key={queue.id} className="grid grid-cols-11 border-t py-2">
                  <div className="flex items-center justify-center p-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={`${queue.id}`}
                            className="group transition-three-all hover:underline"
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
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.active}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.completed}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.delayed}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.failed}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.waiting}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.prioritized}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.total}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.workers}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p className="w-[50%] text-center">{queue.paused}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <QueueAddEditPopUp editForm={true} formData={queue} />

                    <DeleteQueuePopUp queueId={queue.id} />
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4">No data found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Table */}
      <QueueListMobileTbl
        data={data || []} // Pass the data to the mobile table
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        perPage={parseInt(perPage)}
      />

      {/* PAGINATION */}
      <div className="mt-6 flex flex-col-reverse items-center justify-between gap-y-6 md:flex-row">
        <div className="flex items-center gap-4">
          <p>Per Page:</p>
          <Select
            defaultValue="5"
            onValueChange={(value) => {
              setPerPage(value);
              setPage(1); // Reset to page 1 when changing perPage
            }}
            value={perPage}
            disabled={isError}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">05</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={handlePrevious}
            disabled={page === 1 || isError}
          >
            Previous
          </Button>
          <p>
            Page {page} of {totalPages}
          </p>
          <Button
            variant={"outline"}
            onClick={handleNext}
            disabled={page === totalPages || isError}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QueueListTbl;
