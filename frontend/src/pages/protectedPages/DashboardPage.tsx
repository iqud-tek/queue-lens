import { AddConnectionPopUp } from "@/components";
import DashboardTable from "@/components/protected/dashboard/DashboardTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Connections List
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <AddConnectionPopUp
          triggerComponent={
            <div className="mt-4 flex flex-col md:mt-0 md:block">
              <Button>
                <Plus className="scale-125" />
                Add Connections
              </Button>
              <p className="mt-2 text-sm text-muted-foreground/80">
                Used 14 of 21 Connections
              </p>
            </div>
          }
          editForm={false}
        />
      </div>
      <DashboardTable />
    </div>
  );
};

export default DashboardPage;
