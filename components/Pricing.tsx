import Link from "next/link";
import { ProductJsonLd } from "./JsonLd";

const features = [
  "Unlimited crosshair customization",
  "Advanced display settings",
  "Discord volume control",
  "Unlimited gaming profiles",
  "Priority support",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 sm:py-24 lg:py-32 xl:py-36"
      aria-labelledby="pricing-heading"
    >
      {/* Product Schema for Rich Snippets */}
      <ProductJsonLd />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
          <h2
            id="pricing-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4 lg:mb-5"
          >
            Simple Pricing
          </h2>
          <p className="text-text-secondary text-xl sm:text-2xl max-w-2xl mx-auto">
            One-time purchase. Lifetime access. No subscriptions or hidden fees.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <article
            className="card border-accent"
            itemScope
            itemType="https://schema.org/Product"
          >
            <meta itemProp="name" content="ReSight License" />
            <meta itemProp="description" content="Lifetime license for ReSight gaming utility with crosshair overlays, display settings, and Discord volume control." />

            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                ReSight License
              </h3>
              <div
                className="flex items-baseline justify-center gap-2"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta itemProp="priceCurrency" content="USD" />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <span
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-accent"
                  itemProp="price"
                  content="5.00"
                >
                  $5
                </span>
                <span className="text-text-secondary text-lg sm:text-xl">one-time</span>
              </div>
            </div>

            <ul className="space-y-5 sm:space-y-6 mb-8 sm:mb-10" role="list">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-accent flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-text-primary text-lg sm:text-xl">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/buy"
              className="btn-primary w-full text-center block text-lg sm:text-xl py-4"
              itemProp="url"
            >
              Get ReSight Now
            </Link>
          </article>

          <p className="text-text-secondary text-lg sm:text-xl text-center mt-6 max-w-2xl mx-auto">
            ReSight is designed to enhance your gaming experience through improved visual clarity and convenience features.
            We believe in fair play—this tool is not intended to provide unfair advantages.
            Please use responsibly and in accordance with each game&apos;s terms of service.
            We are not liable for any consequences resulting from use.
          </p>
        </div>
      </div>
    </section>
  );
}
