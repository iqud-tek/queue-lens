export interface DashboardTblItem {
  id: number | string;
  aliasName: string;
  host: string;
  port: number;
  database: string;
  status: "active" | "inactive";
}

// Define types for form values
export interface FormValues {
  id?: number;
  aliasName: string;
  host: string;
  port: string;
  database: string;
  status: "active" | "inactive";
}

export type ConnectionsSortValue =
  | "newest"
  | "alias-ascending"
  | "alias-descending";

export interface DashboardMobileTableProps {
  isLoading: boolean;
  isFetching: boolean;
  error: FetchBaseQueryError | SerializedError | string;
  data: DashboardTblItem[];
  perPage: number;
}

// ! QUEUE LIST PAGE

// DashboardTblItem type for the table data
export interface QueueTblItem {
  id: string; // Unique identifier for the queue
  name: string; // Name of the queue
  host: string; // Host information
  active: number; // Number of active items
  completed: number; // Number of completed items
  delayed: number; // Number of delayed items
  failed: number; // Number of failed items
  waiting: number; // Number of waiting items
  prioritized: number; // Number of prioritized items
  total: number; // Total number of items
  workers: number; // Number of workers
  paused: number; // Number of paused items
}

// Form values used in the QueueForm
export interface QueueFormValue {
  name: string; // Name of the queue
  delayed: string; // Delay time as a string for form input
}

// !QUEUE DETAILS PAGE

export type QueueNavLinks = "metrics" | "jobs" | "scheduled" | "workers";

export type QueueJobsActiveFilterTabs =
  | "waiting"
  | "delayed"
  | "active"
  | "completed"
  | "failed";

// ! Queue details JOb Details

export interface JobDetailItem {
  id: string;
  name: string;
  createdAt: string;
  waited: number;
  processed: number;
  finished: number;
  run: number;
  attempts: number;
}
