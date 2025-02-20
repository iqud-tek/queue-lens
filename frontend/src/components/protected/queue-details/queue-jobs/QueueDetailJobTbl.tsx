import { ArrowDownUp, Eye } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { JobDetailItem } from "@/types/dashboard.types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QueueDetailJobTblLoader from "./QueueDetailJobTblLoader";
import { useFetchQueryTblJobsQuery } from "@/store/apis/queueDetailAPI";
import DeleteJobPopUp from "./DeleteJobPopup";
import QueueDetailsJobsMobileTbl from "./QueueDetailsJobsMobileTbl";
const QueueDetailJobTbl = () => {
  const [perPage, setPerPage] = useState("5");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  // Fetch data using RTK Query
  const { data, isLoading, isError, isFetching, error } =
    useFetchQueryTblJobsQuery({
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
    <section className="mt-6">
      {/* FILTER */}
      <div>
        <Input
          className="max-w-[400px]"
          placeholder="Filter by Job name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          disabled={isError}
        />
      </div>

      {/* TABLE */}
      <div className="hidden w-screen overflow-x-auto md:block md:w-auto">
        <div className="mt-6 w-[1280px] rounded-md border md:w-auto">
          {/* THEAD */}
          <div className="grid grid-cols-9 font-medium">
            <div className="flex items-center justify-center gap-1 p-2">
              <p>Id</p>
              <Button
                disabled={isError}
                variant={"ghost"}
                className="p-1 text-muted-foreground"
              >
                <ArrowDownUp />
              </Button>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Name</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p className="text-center">Created</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Waited</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Processed</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Finished</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p className="text-center">Run</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Attempts</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p>Action</p>
            </div>
          </div>
          {/* TBODY */}
          <div>
            {isLoading || isFetching ? (
              <QueueDetailJobTblLoader perPage={parseInt(perPage)} />
            ) : isError ? (
              <div className="grid h-40 place-items-center">
                <p className="p-4 text-destructive">
                  {error && "status" in error && error.status
                    ? `Error: ${error.status}`
                    : "Something went wrong"}
                </p>
              </div>
            ) : data?.length > 0 ? (
              data.map((queue: JobDetailItem) => (
                <div key={queue.id} className="grid grid-cols-9 border-t py-2">
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.id}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.name}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.createdAt}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.waited}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.processed}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.finished}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.run}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    <p>{queue.attempts}</p>
                  </div>

                  <div className="flex items-center justify-center p-2">
                    <Button variant={"ghost"}>
                      <Eye />
                    </Button>
                    <DeleteJobPopUp queueId={queue.id} />
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
      <QueueDetailsJobsMobileTbl
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

export default QueueDetailJobTbl;
