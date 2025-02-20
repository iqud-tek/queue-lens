"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MonitorTypeDetailsProps {
  monitorType: string;
}

const MonitorTypeDetails: React.FC<MonitorTypeDetailsProps> = ({
  monitorType,
}) => {
  return (
    <div className="space-y-3">
      {/* Connection */}
      {monitorType === "Connection" && (
        <div>
          <p className="text-sm font-medium text-foreground">
            Connection Monitor
          </p>
          <p className="text-sm text-muted-foreground">
            This monitor checks that the connection is accessible from
            Taskforce. If an alert is triggered, it could mean the Redis
            instance is down, or the connectivity between Taskforce and Redis is
            broken.
          </p>
          <div className="mt-2 rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              If an alert is triggered, you will not get a new alert for this
              connection unless you manually acknowledge the alert. If your
              connection is not accessible by Taskforce, your other monitors
              will not produce any alerts until the connection is online again.
            </p>
          </div>
        </div>
      )}

      {/* FailJobs */}
      {monitorType === "FailJobs" && (
        <div>
          <p className="text-sm font-medium text-foreground">
            FailJobs Monitor
          </p>
          <p className="text-sm text-muted-foreground">
            This monitor checks if there are new failed jobs in any of the
            queues in this Redis connection. The monitor will check every 5
            minutes if there are failed jobs.
          </p>
          <div className="mt-2 rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              If you already have an alert for a failed job in a given queue, no
              new alerts will be triggered for that queue until you manually
              acknowledge the alert <strong>OR</strong> until a full day has
              passed since the last alert.
            </p>
          </div>
        </div>
      )}

      {/* MaxMemory */}
      {monitorType === "MaxMemory" && (
        <div>
          <p className="text-sm font-medium text-foreground">
            MaxMemory Monitor
          </p>
          <p className="text-sm text-muted-foreground">
            This monitor checks if the memory usage of the Redis instance has
            exceeded the given threshold. If the threshold is reached, an alert
            is triggered. As long as there is a triggered alert for this
            monitor, no new alerts will be triggered until the next day.
          </p>
          <div className="mt-4">
            <Label htmlFor="threshold" className="mb-2 block">
              Threshold (MB)
            </Label>
            <Input
              id="threshold"
              type="number"
              placeholder="512"
              className="w-full"
            />
          </div>
          <div className="mt-2 rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              It is recommended to set the threshold to max 80% of the total
              memory, as Redis will become unresponsive if it reaches 100%.
            </p>
          </div>
        </div>
      )}

      {/* MissingWorkers */}
      {monitorType === "MissingWorkers" && (
        <div>
          <div className="mt-4">
            <Label htmlFor="minWorkers" className="mb-2 block">
              Minimum workers
            </Label>
            <Input
              id="minWorkers"
              type="number"
              placeholder="1"
              className="w-full"
            />
          </div>
          <div className="mt-2 rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              This monitor checks if the amount of running workers has gone
              below the given threshold for any of the queues. If the threshold
              is reached, an alert is triggered. As long as there is a triggered
              alert for a given queue, no new alerts for that same queue will be
              triggered until the next day.
            </p>
          </div>
        </div>
      )}

      {/* Backlog */}
      {monitorType === "Backlog" && (
        <div>
          <p className="text-sm font-medium text-foreground">Backlog Monitor</p>
          <p className="text-sm text-muted-foreground">
            Monitor the backlog of jobs in your queues. Configure the maximum
            number of jobs in the backlog and get alerts if that number is
            exceeded.
          </p>
          <div className="mt-4">
            <Label htmlFor="maxBacklog" className="mb-2 block">
              Maximum number of jobs in the backlog
            </Label>
            <Input
              id="maxBacklog"
              type="number"
              placeholder="100"
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorTypeDetails;
