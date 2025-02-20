import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Slack, AlertTriangle } from "lucide-react"; // Import icons
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface NotificationFormValues {
  enableEmail: boolean;
  enableSlack: boolean;
  slackWebhook?: string;
  enablePagerDuty: boolean;
  pagerDutyKey?: string;
}

const validationSchema = Yup.object({
  enableEmail: Yup.boolean().required(),
  enableSlack: Yup.boolean().required(),
  slackWebhook: Yup.string().when("enableSlack", {
    is: true as const,
    then: (schema) => schema.required("Slack Webhook URL is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  enablePagerDuty: Yup.boolean().required(),
  pagerDutyKey: Yup.string().when("enablePagerDuty", {
    is: true as const,
    then: (schema) => schema.required("PagerDuty Integration Key is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const NotificationSettingsForm = () => {
  const formik = useFormik<NotificationFormValues>({
    initialValues: {
      enableEmail: false,
      enableSlack: false,
      slackWebhook: "",
      enablePagerDuty: false,
      pagerDutyKey: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submitted notification settings:", values);
    },
  });

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how you want to be notified when a monitor fails.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Notification */}
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-500" />
            <Checkbox
              id="enableEmail"
              checked={formik.values.enableEmail}
              onCheckedChange={(checked) =>
                formik.setFieldValue("enableEmail", !!checked)
              }
            />
            <Label htmlFor="enableEmail">Email</Label>
          </div>

          {/* Slack Notification */}
          <div className="flex items-center space-x-3">
            <Slack className="h-5 w-5 text-green-500" />
            <Checkbox
              id="enableSlack"
              checked={formik.values.enableSlack}
              onCheckedChange={(checked) =>
                formik.setFieldValue("enableSlack", !!checked)
              }
            />
            <Label htmlFor="enableSlack">Slack</Label>
          </div>
          {formik.values.enableSlack && (
            <div className="mt-2">
              <Label htmlFor="slackWebhook">Webhook URL</Label>
              <Input
                id="slackWebhook"
                name="slackWebhook"
                placeholder="https://hooks.slack.com/services/..."
                value={formik.values.slackWebhook}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.slackWebhook && formik.errors.slackWebhook && (
                <div className="text-sm text-red-500">
                  {formik.errors.slackWebhook}
                </div>
              )}
            </div>
          )}

          {/* PagerDuty Notification */}
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <Checkbox
              id="enablePagerDuty"
              checked={formik.values.enablePagerDuty}
              onCheckedChange={(checked) =>
                formik.setFieldValue("enablePagerDuty", !!checked)
              }
            />
            <Label htmlFor="enablePagerDuty">PagerDuty</Label>
          </div>
          {formik.values.enablePagerDuty && (
            <div className="mt-2">
              <Label htmlFor="pagerDutyKey">Integration Key</Label>
              <Input
                id="pagerDutyKey"
                name="pagerDutyKey"
                placeholder="Enter your PagerDuty integration key"
                value={formik.values.pagerDutyKey}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.pagerDutyKey && formik.errors.pagerDutyKey && (
                <div className="text-sm text-red-500">
                  {formik.errors.pagerDutyKey}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="mt-4 w-full">
            Save Notification Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotificationSettingsForm;
