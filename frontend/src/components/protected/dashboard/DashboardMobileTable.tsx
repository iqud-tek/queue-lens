import {
  DashboardMobileTableProps,
  DashboardTblItem,
} from "@/types/dashboard.types";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import MobileCardLoader from "@/components/general/MobileCardLoader";
import { useState } from "react";
import EditConnectionPopUp from "./EditConnectionPopUp";
import { PenBox, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeletePopUp from "@/components/general/DeletePopUp";
import { useDeleteDashboardEntryMutation } from "@/store/apis/dashboardAPI";
import { errorToast, successToast } from "@/utils/toasts";

const DashboardMobileTable = ({
  isLoading,
  isFetching,
  error,
  data,
  perPage,
}: DashboardMobileTableProps) => {
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [editModelOpen, setEditModelOpen] = useState(false);
  const [formData, setFormData] = useState<null | DashboardTblItem>(null);
  const [deleteConnectionAPI, { isLoading: isDeleting }] =
    useDeleteDashboardEntryMutation();

  const handleDelete = async (id: string) => {
    try {
      const sanitizedID = id;

      await deleteConnectionAPI(sanitizedID).unwrap();
      setDeleteModelOpen(false); // Close the dialog after successful deletion
      successToast("Connection deleted successfully");
    } catch (error) {
      console.error("Failed to delete the connection:", error);
      errorToast("Something went wrong");
    }
  };

  console.log("formData", formData);

  return (
    <div className="mt-6 block space-y-4 md:hidden">
      {/* Loading or Error State */}
      {isLoading || isFetching ? (
        <MobileCardLoader perPage={perPage} />
      ) : error ? (
        <div className="grid h-40 place-items-center">
          <p className="p-4 text-destructive">
            {error && typeof error === "object" && "status" in error
              ? `Error: ${error.status}`
              : "Something went wrong"}
          </p>
        </div>
      ) : data?.length > 0 ? (
        <>
          {data.map((item) => (
            <div
              key={item.id}
              className="space-y-2 rounded-md border bg-white p-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <Link
                  to={`${item.id}`}
                  className="text-lg font-medium text-foreground"
                >
                  {item.aliasName}
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                Host: {item.host}
              </div>
              <div className="text-sm text-muted-foreground">
                Port: {item.port}
              </div>
              <div className="text-sm text-muted-foreground">
                Database: {item.database}
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  className={
                    "flex items-center justify-center gap-2 border border-border bg-transparent font-normal text-foreground shadow-none hover:bg-transparent"
                  }
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.status === "active" ? "bg-success" : "bg-destructive"
                    }`}
                  />
                  {item.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setFormData(item);
                      setEditModelOpen(true);
                    }}
                  >
                    <PenBox />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setDeleteModelOpen(true);
                      setFormData(item);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {formData && (
            <>
              <EditConnectionPopUp
                editForm={true}
                modelOpen={editModelOpen}
                setModelOpen={setEditModelOpen}
                triggerComponent={null}
                formData={formData}
              />
              <DeletePopUp
                itemName="connection"
                isLoading={isDeleting}
                deleteModelOpen={deleteModelOpen}
                setDeleteModelOpen={setDeleteModelOpen}
                connectionId={JSON.stringify(formData.id)}
                handleDelete={() => handleDelete(JSON.stringify(formData.id))}
                triggerComponent={null}
              />
            </>
          )}
        </>
      ) : (
        <p className="text-center text-muted-foreground">No data found.</p>
      )}
    </div>
  );
};

export default DashboardMobileTable;
