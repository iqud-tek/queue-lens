import React from "react";
import ConnectionForm from "./ConnectionForm";
import { DashboardTblItem } from "@/types/dashboard.types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EditConnectionPopUpProps {
  editForm: boolean;
  modelOpen: boolean;
  formData?: DashboardTblItem;
  setModelOpen: (value: boolean) => void;
  /** Optional custom trigger component for opening the edit dialog */
  triggerComponent?: React.ReactNode;
}

const EditConnectionPopUp: React.FC<EditConnectionPopUpProps> = ({
  modelOpen,
  setModelOpen,
  triggerComponent,
  formData,
}) => {
  return (
    <AlertDialog open={modelOpen} onOpenChange={setModelOpen}>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Connection</AlertDialogTitle>
            <AlertDialogDescription>
              Edit connection. Click save when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button
            className="absolute right-4 top-4 z-10 bg-background opacity-100"
            variant="ghost"
            onClick={() => setModelOpen(false)}
          >
            <X size={24} className="scale-125" />
          </Button>
        </div>
        <ConnectionForm
          editForm={true}
          setModelOpen={setModelOpen}
          formData={formData}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditConnectionPopUp;
