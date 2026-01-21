import Link from "next/link";

const features = [
  "Unlimited crosshair customization",
  "Advanced display settings",
  "Discord volume control",
  "Unlimited gaming profiles",
  "Lifetime updates",
  "Priority support",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Simple Pricing
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            One-time purchase. Lifetime access. No subscriptions.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="card border-accent">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                ReSight License
              </h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-accent">$5</span>
                <span className="text-text-secondary">one-time</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/buy"
              className="btn-primary w-full text-center block text-lg"
            >
              Get ReSight Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
