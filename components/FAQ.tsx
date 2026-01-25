"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FAQJsonLd } from "./JsonLd";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("faq");
  const tFooter = useTranslations("footer");
  const discordUrl = "https://discord.gg/AZJ9AA9S";

  const faqKeys = [
    "games",
    "anticheat",
    "computers",
    "discordVolume",
    "offline",
    "displaySettings",
  ] as const;

  const faqs = faqKeys.map((key) => ({
    key,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section
      id="faq"
      className="py-24 bg-bg-secondary"
      aria-labelledby="faq-heading"
    >
      {/* FAQ Schema for Rich Snippets */}
      <FAQJsonLd
        faqs={faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-text-secondary">{t("subtitle")}</p>
        </div>

        <div className="space-y-4" role="list">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="card"
              role="listitem"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span
                  className="text-lg font-medium text-text-primary"
                  itemProp="name"
                >
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-text-secondary transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 mt-4" : "max-h-0"
                }`}
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <p className="text-text-secondary" itemProp="text">
                  {faq.answer}
                  {faq.key === "computers" ? (
                    <>
                      {" "}
                      <a
                        href={discordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80"
                      >
                        {tFooter("joinDiscord")}
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
