import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="grid h-[calc(100vh-40px)] place-items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm space-y-6 text-center">
          <img
            src="https://i.ibb.co/ck1SGFJ/Group.png"
            className="mx-auto w-[200px]"
          />
          <p className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-muted-foreground">
            Seems like we haven't created this page. Kindly visit other pages.
          </p>
          <Link
            to="/"
            className="my-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-ring"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
