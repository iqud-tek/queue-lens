import { QueueAddEditPopUp, QueueListTable } from "@/components";
import QueueListBreadcrumb from "@/components/protected/queue-list/QueueListBreadcrumb";

const QueueListPage = () => {
  return (
    <>
      <section className="mb-8 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Queue</h1>
            <QueueListBreadcrumb />
          </div>
          <QueueAddEditPopUp editForm={false} />
        </div>
      </section>
      <div>
        <QueueListTable />
      </div>
    </>
  );
};

export default QueueListPage;
