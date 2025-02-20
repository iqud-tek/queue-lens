import { Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { errorToast, successToast } from "@/utils/toasts";
import { useDeleteJobMutation } from "@/store/apis/queueDetailAPI";

interface DeleteJobPopUpProps {
  queueId: string; // Accept the ID of the queue to delete
}

const DeleteJobPopUp: React.FC<DeleteJobPopUpProps> = ({ queueId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteJobAPI, { isLoading }] = useDeleteJobMutation();

  const handleDelete = async () => {
    try {
      await deleteJobAPI(queueId).unwrap();
      setIsOpen(false); // Close the dialog after successful deletion
      successToast("Job delete successfully");
    } catch (error) {
      console.error("Failed to delete the queue:", error);
      errorToast("Something went wrong");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="bg-destructive/20 text-destructive md:bg-transparent"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
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

export default DeleteJobPopUp;
