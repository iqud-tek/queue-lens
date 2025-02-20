import { Trash } from "lucide-react";
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
import { useDeleteQueueMutation } from "@/store/apis/queueListAPI";

interface DeleteQueuePopUpProps {
  queueId: string; // Accept the ID of the queue to delete
}

const DeleteQueuePopUp: React.FC<DeleteQueuePopUpProps> = ({ queueId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteQueueAPI, { isLoading }] = useDeleteQueueMutation();

  const handleDelete = async () => {
    try {
      await deleteQueueAPI(queueId).unwrap();
      setIsOpen(false); // Close the dialog after successful deletion
      successToast("Queue delete successfully");
    } catch (error) {
      console.error("Failed to delete the queue:", error);
      errorToast("Something went wrong");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} onClick={() => setIsOpen(true)}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            queue and remove your data from our servers.
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

export default DeleteQueuePopUp;
