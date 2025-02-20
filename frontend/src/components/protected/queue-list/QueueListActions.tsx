import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DashboardTblItem } from "@/types/dashboard.types";
import { useState } from "react";

// import EditConnectionPopUp from "./EditConnectionPopUp";
import DeletePopUp from "@/components/general/DeletePopUp";
import { useDeleteDashboardEntryMutation } from "@/store/apis/dashboardAPI";
import { errorToast, successToast } from "@/utils/toasts";

// Constrain TData so that it extends DashboardTblItem.
interface QueueListActionsProps<TData extends DashboardTblItem> {
  row: Row<TData>;
}

const QueueListActions = <TData extends DashboardTblItem>({
  row,
}: QueueListActionsProps<TData>) => {
  const rowData = row.original;
  const [editModelOpen, setEditModelOpen] = useState(false);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);

  const [deleteConnectionAPI, { isLoading }] =
    useDeleteDashboardEntryMutation();

  const handleDelete = async () => {
    try {
      const sanitizedID = encodeURIComponent(
        JSON.stringify(rowData.id).replace(/"/g, ""),
      );
      await deleteConnectionAPI(sanitizedID).unwrap();
      setDeleteModelOpen(false); // Close the dialog after successful deletion
      successToast("Connection deleted successfully");
    } catch (error) {
      console.error("Failed to delete the connection:", error);
      errorToast("Something went wrong");
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* 
          Remove onClick from DropdownMenuItem so that the dialog's click handler 
          can control opening and stopping propagation.
        */}
          <DropdownMenuItem onClick={() => setEditModelOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Copy", rowData)}>
            Make a copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Favorite", rowData)}>
            Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Actions</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => console.log("Restart", rowData)}>
                Restart Server
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Shutdown", rowData)}
              >
                Shutdown
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteModelOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog Overlay */}
      {/* <EditConnectionPopUp
        editForm={true}
        modelOpen={editModelOpen}
        formData={rowData}
        setModelOpen={setEditModelOpen}
        triggerComponent={null}
      /> */}

      <DeletePopUp
        deleteModelOpen={deleteModelOpen}
        setDeleteModelOpen={setDeleteModelOpen}
        connectionId={JSON.stringify(rowData.id)}
        triggerComponent={null}
        handleDelete={handleDelete}
        isLoading={isLoading}
        itemName={"Connection"}
      />
    </>
  );
};

export default QueueListActions;
