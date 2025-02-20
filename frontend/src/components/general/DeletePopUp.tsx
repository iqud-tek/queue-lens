import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface DeletePopUpProps {
  connectionId: string; // Accept the ID of the connection to delete
  itemName: string; // Accept the ID of the connection to delete
  deleteModelOpen: boolean;
  isLoading: boolean;
  setDeleteModelOpen: (open: boolean) => void;
  /** Optional custom trigger component for opening the delete dialog */
  triggerComponent: React.ReactNode;
  handleDelete: () => void;
}

const DeletePopUp = ({
  deleteModelOpen,
  setDeleteModelOpen,
  triggerComponent,
  isLoading,
  handleDelete,
  itemName,
}: DeletePopUpProps) => {
  return (
    <AlertDialog open={deleteModelOpen} onOpenChange={setDeleteModelOpen}>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {itemName} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteModelOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <Button
            className="bg-destructive text-destructive-foreground"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePopUp;
