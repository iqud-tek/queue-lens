"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Import the separate component
import MonitorTypeDetails from "./MonitorTypeDetails";

const MonitorScreen = () => {
  const [monitorType, setMonitorType] = React.useState("Connection");

  const selectOptions = [
    { value: "Connection", label: "Connection" },
    { value: "FailJobs", label: "FailJobs" },
    { value: "MissingWorkers", label: "MissingWorkers" },
    { value: "Backlog", label: "Backlog" },
    { value: "MaxMemory", label: "MaxMemory" },
  ];

  return (
    <div className="mx-auto">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Monitor Configuration</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Configure the monitor type and activation status below.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Top row: Type Select & Active Switch side by side */}
          <div className="flex items-center justify-between gap-4">
            {/* Monitor Type */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="type" className="mb-1">
                Type
              </Label>
              <Select
                value={monitorType}
                onValueChange={(val) => setMonitorType(val)}
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select monitor type" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Switch */}
            <div className="mt-6 flex min-w-[90px] items-center space-x-2">
              <Switch id="active" />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          {/* Render MonitorTypeDetails based on monitorType */}
          <MonitorTypeDetails monitorType={monitorType} />

          {/* Documentation link */}
          <p className="text-sm text-muted-foreground">
            You can find the complete documentation for alerts and monitors{" "}
            <a href="#" className="text-primary underline hover:no-underline">
              here
            </a>
            .
          </p>
        </CardContent>

        {/* Footer buttons */}
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Close</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MonitorScreen;
