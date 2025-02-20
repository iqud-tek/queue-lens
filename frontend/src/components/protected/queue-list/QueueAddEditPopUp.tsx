import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit, Plus, X } from "lucide-react";

import { useState } from "react";
import { QueueTblItem } from "@/types/dashboard.types";
import QueueForm from "./QueueForm";

const QueueAddEditPopUp = ({
  editForm,
  formData,
}: {
  editForm: boolean;
  formData?: QueueTblItem;
}) => {
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <Dialog open={modelOpen}>
      <DialogTrigger>
        {editForm ? (
          <Button variant={"ghost"} onClick={() => setModelOpen(true)}>
            <Edit />
          </Button>
        ) : (
          <>
            <Button onClick={() => setModelOpen(true)}>
              <Plus className="scale-125" />
              Add Queue
            </Button>
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex items-start justify-between">
          <DialogHeader>
            <DialogTitle>{editForm ? "Edit" : "Add"} Queue</DialogTitle>
            <DialogDescription>
              {editForm ? "Edit" : "Add"} queue. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Button
            className="absolute right-4 top-4 z-10 bg-background opacity-100"
            variant={"ghost"}
            onClick={() => setModelOpen(false)}
          >
            <X size={24} className="scale-125" />
          </Button>
        </div>
        <QueueForm
          editForm={editForm}
          setModelOpen={setModelOpen}
          formData={formData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QueueAddEditPopUp;
