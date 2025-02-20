import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QueueFormValue, QueueTblItem } from "@/types/dashboard.types";

import { errorToast, successToast } from "@/utils/toasts";
import {
  useCreateQueueMutation,
  useUpdateQueueMutation,
} from "@/store/apis/queueListAPI";

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Queue Name is required"),
  delayed: Yup.number()
    .min(0, "Delay Time must be a positive number")
    .required("Delay Time is required"),
});

const QueueForm = ({
  editForm,
  formData,
  setModelOpen,
}: {
  editForm: boolean;
  formData?: QueueTblItem;
  setModelOpen: (open: boolean) => void;
}) => {
  const [createQueueEntry, { isLoading: isCreating }] =
    useCreateQueueMutation();
  const [updateQueueEntry, { isLoading: isUpdating }] =
    useUpdateQueueMutation();

  const formik = useFormik<QueueFormValue>({
    initialValues: {
      name: formData?.name || "",
      delayed: formData?.delayed?.toString() || "0",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        delayed: parseInt(values.delayed),
      };

      try {
        if (editForm && formData) {
          const obj = {
            name: payload.name,
            active: formData.active,
            completed: formData.completed,
            delayed: payload.delayed,
            failed: formData.failed,
            waiting: formData.waiting,
            prioritized: formData.prioritized,
            total: formData.total,
            workers: formData.workers,
            paused: formData.paused,
          };

          await updateQueueEntry({
            id: formData?.id,
            updatedQueue: obj,
          }).unwrap();
        } else {
          const obj = {
            name: payload.name,
            active: Math.floor(Math.random() * 200),
            completed: Math.floor(Math.random() * 200),
            delayed: payload.delayed,
            failed: Math.floor(Math.random() * 200),
            waiting: Math.floor(Math.random() * 200),
            prioritized: Math.floor(Math.random() * 200),
            total: Math.floor(Math.random() * 200),
            workers: Math.floor(Math.random() * 200),
            paused: Math.floor(Math.random() * 200),
          };

          await createQueueEntry(obj).unwrap();
        }
        successToast("Queue saved successfully!");
        setModelOpen(false);
      } catch (error) {
        console.error(error);
        errorToast("Something went wrong");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Queue Name Field */}
      <div className="space-y-1">
        <Label htmlFor="name" className="text-right">
          Queue Name
        </Label>
        <Input
          id="name"
          name="name"
          className="col-span-3"
          placeholder="Queue Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-sm text-destructive">{formik.errors.name}</div>
        )}
      </div>

      {/* Queue Delay Field */}
      <div className="space-y-1">
        <Label htmlFor="delayed" className="text-right">
          Delay Time <span className="text-muted-foreground">(in second)</span>
        </Label>
        <Input
          id="delayed"
          name="delayed"
          className="col-span-3"
          placeholder="Delay Time"
          type="number"
          value={formik.values.delayed}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.delayed && formik.errors.delayed && (
          <div className="text-sm text-destructive">
            {formik.errors.delayed}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="!mt-6 inline-block"
        disabled={isCreating || isUpdating}
      >
        {editForm
          ? isUpdating
            ? "Saving Queue"
            : "Save Changes"
          : isCreating
            ? "Adding Queue"
            : "Add Queue"}
      </Button>
    </form>
  );
};

export default QueueForm;
