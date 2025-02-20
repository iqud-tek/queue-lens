import React from "react";
import { Button } from "@/components/ui/button";

interface Plan {
  title: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

const pricingPlans: Plan[] = [
  {
    title: "Basic Plan",
    price: 20,
    features: [
      "1 Connection",
      "Unlimited Queues",
      "Monitoring & alerts",
      "Metrics",
      "Job tools",
      "Scheduled Jobs",
      "Basic Support",
    ],
    isPopular: false,
  },
  {
    title: "Advanced Plan",
    price: 50,
    features: [
      "5 Connections",
      "Unlimited Queues",
      "Monitoring & alerts",
      "Metrics",
      "Job tools",
      "Scheduled Jobs",
      "Premium Email Support",
    ],
    isPopular: true,
  },
  {
    title: "Premium Plan",
    price: 100,
    features: [
      "15 Connections",
      "Unlimited Queues",
      "Monitoring & alerts",
      "Metrics",
      "Job tools",
      "Scheduled Jobs",
      "Premium Email Support",
    ],
    isPopular: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-8 text-3xl font-semibold text-foreground">
          Our Pricing Plans
        </h2>
        <div className="grid grid-cols-1 items-center justify-center gap-8 p-4 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative mx-auto w-full overflow-hidden rounded-lg border border-border bg-card p-6 shadow-md sm:p-8`}
            >
              {/* ribbon */}
              {plan.isPopular && (
                <div className="absolute -top-6 left-4 h-28 w-4 rotate-45 bg-primary" />
              )}
              {/* card details */}
              <h5 className="mb-4 text-xl font-medium text-foreground">
                {plan.title}
              </h5>
              <div className="flex items-baseline text-foreground">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="ms-1 text-xl font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="my-7 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="ms-3 text-base font-normal leading-tight text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full rounded-lg bg-primary py-2 text-primary-foreground hover:bg-primary/90"
                onClick={() => console.log(`Chosen ${plan.title}`)}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
