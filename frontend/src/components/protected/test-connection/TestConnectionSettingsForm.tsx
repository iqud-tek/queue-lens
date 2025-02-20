import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { DashboardTblItem, FormValues } from "@/types/dashboard.types";
import { useUpdateDashboardEntryMutation } from "@/store/apis/dashboardAPI";
import { errorToast, successToast } from "@/utils/toasts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Validation schema with Yup
const validationSchema = Yup.object({
  aliasName: Yup.string().required("Alias Name is required"),
  host: Yup.string()
    .matches(/^\d{1,3}(\.\d{1,3}){3}$/, "Invalid IP address")
    .required("Host Name is required"),
  port: Yup.string()
    .matches(/^\d{4}$/, "Port number must be 4 digits")
    .required("Port Number is required"),
  database: Yup.string()
    .required("Database Name is required")
    .min(3, "Minimum three characters required"),
  status: Yup.string().required("Status is required"),
});

const TestConnectionSettingsForm = ({
  editForm,
  formData,
  refetch,
}: {
  editForm: boolean;
  formData?: DashboardTblItem;
  refetch: () => void;
}) => {
  const [updateDashboardEntry, { isLoading: isUpdating }] =
    useUpdateDashboardEntryMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      aliasName: formData?.aliasName || "",
      host: formData?.host || "",
      port: formData?.port?.toString() || "",
      database: formData?.database || "",
      status: formData?.status || "active",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        aliasName: values.aliasName,
        host: values.host,
        port: parseInt(values.port),
        database: values.database,
        status: values.status,
      };

      try {
        if (editForm && formData) {
          await updateDashboardEntry({
            id: formData.id,
            updatedEntry: payload,
          }).unwrap();
        }
        refetch();
        successToast("Connection saved successfully!");
      } catch (error) {
        console.error(error);
        errorToast("something went wrong");
      }
    },
  });

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Connection Settings</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Configure the connection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Alias Name Field */}
          <div className="space-y-1">
            <Label htmlFor="aliasName" className="text-right">
              Alias Name
            </Label>
            <Input
              id="aliasName"
              name="aliasName"
              className="col-span-3"
              placeholder="alias name"
              value={formik.values.aliasName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.aliasName && formik.errors.aliasName && (
              <div className="text-sm text-destructive">
                {formik.errors.aliasName}
              </div>
            )}
          </div>

          {/* Host Name & Port Number */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="host" className="text-right">
                Host Name
              </Label>
              <Input
                id="host"
                name="host"
                className="col-span-3"
                placeholder="000.000.0.000"
                value={formik.values.host}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.host && formik.errors.host && (
                <div className="text-sm text-destructive">
                  {formik.errors.host}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="port" className="text-right">
                Port Number
              </Label>
              <Input
                id="port"
                name="port"
                className="col-span-3"
                placeholder="0000"
                value={formik.values.port}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.port && formik.errors.port && (
                <div className="text-sm text-destructive">
                  {formik.errors.port}
                </div>
              )}
            </div>
          </div>

          {/* Database Name Field */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="database" className="text-right">
                Database Name
              </Label>
              <Input
                id="database"
                name="database"
                className="col-span-3"
                placeholder="database name"
                value={formik.values.database}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.database && formik.errors.database && (
                <div className="text-sm text-destructive">
                  {formik.errors.database}
                </div>
              )}
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <Label htmlFor="status" className="mb-[20px] block font-medium">
                Select a Status
              </Label>
              <RadioGroup
                id="status"
                value={formik.values.status} // Controlled by Formik
                onValueChange={(value) => formik.setFieldValue("status", value)} // Update Formik state
                name="status"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      id="active"
                      value="active"
                      className="h-4 w-4 border-gray-300 focus:ring-0"
                    />
                    <label
                      htmlFor="active"
                      className="flex cursor-pointer select-none items-center gap-1"
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      id="in-active"
                      value="in-active"
                      className="h-4 w-4 border-gray-300 text-muted-foreground focus:ring-0"
                    />
                    <label
                      htmlFor="in-active"
                      className="flex cursor-pointer select-none items-center gap-1"
                    >
                      In Active
                    </label>
                  </div>
                </div>
              </RadioGroup>

              {formik.touched.status && formik.errors.status && (
                <div className="text-sm text-destructive">
                  {formik.errors.status}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="!mt-6 inline-block"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving Connection" : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestConnectionSettingsForm;
