import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import ConnectionForm from "./ConnectionForm";
import { useState } from "react";

interface AddConnectionPopUpProps {
  editForm: boolean;
  triggerComponent: React.ReactNode;
}

const AddConnectionPopUp = ({
  editForm,
  triggerComponent,
}: AddConnectionPopUpProps) => {
  const [modelOpen, setModelOpen] = useState(false);
  return (
    // Controlled dialog: visibility is controlled via modelOpen and onOpenChange.
    <Dialog open={modelOpen} onOpenChange={setModelOpen}>
      <DialogTrigger asChild onClick={() => setModelOpen(true)}>
        {triggerComponent}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <div className="flex">
          <DialogHeader>
            <DialogTitle className="text-left">
              {editForm ? "Edit" : "Add"} Connection
            </DialogTitle>
            <DialogDescription>
              {editForm
                ? "Edit connection. Click save when you're done."
                : "Add connection. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <Button
            className="absolute right-4 top-4 z-10 bg-background opacity-100"
            variant="ghost"
            onClick={() => setModelOpen(false)}
          >
            <X size={24} className="scale-125" />
          </Button>
        </div>
        <ConnectionForm editForm={editForm} setModelOpen={setModelOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddConnectionPopUp;
