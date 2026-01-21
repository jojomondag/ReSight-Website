"use client";

import { useState } from "react";
import { FAQJsonLd } from "./JsonLd";

const faqs = [
  {
    question: "What games does ReSight work with?",
    answer:
      "ReSight works with virtually any game. The crosshair overlay sits on top of your screen, so it's compatible with all games regardless of whether they have built-in crosshair options.",
  },
  {
    question: "Is ReSight safe to use with anti-cheat?",
    answer:
      "ReSight is a screen overlay application that doesn't inject into games or modify game files. However, always check your game's terms of service as policies vary between games and anti-cheat systems.",
  },
  {
    question: "Can I use ReSight on multiple computers?",
    answer:
      "Each license is activated on one machine. If you need to move your license to a new computer, you can contact support to have your activation reset.",
  },
  {
    question: "How does Discord volume control work?",
    answer:
      "Press a hotkey to instantly lower your teammates' voice chat volume during intense moments. Press again to restore it. Great for clutch situations where you need to focus.",
  },
  {
    question: "Do I need to be online to use ReSight?",
    answer:
      "After initial activation, ReSight works completely offline. No internet connection is required for day-to-day use.",
  },
  {
    question: "How much does ReSight cost?",
    answer:
      "ReSight is a one-time purchase of $5 USD. This includes lifetime access to all features, unlimited updates, and priority support. No subscriptions or hidden fees.",
  },
  {
    question: "What display settings can I adjust with ReSight?",
    answer:
      "ReSight allows you to adjust brightness, contrast, and gamma in real-time using hotkeys. This is especially useful for dark maps in games like Hunt: Showdown or bright environments in other games.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 bg-bg-secondary"
      aria-labelledby="faq-heading"
    >
      {/* FAQ Schema for Rich Snippets */}
      <FAQJsonLd faqs={faqs} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary">
            Got questions? We&apos;ve got answers. Find what you need below.
          </p>
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
                  className={`w-5 h-5 text-text-secondary transition-transform ${openIndex === index ? "rotate-180" : ""
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
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 mt-4" : "max-h-0"
                  }`}
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <p
                  className="text-text-secondary"
                  itemProp="text"
                >
                  {faq.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
