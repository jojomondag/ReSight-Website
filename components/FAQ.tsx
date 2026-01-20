"use client";

import { useState } from "react";

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
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                className="w-full text-left flex items-center justify-between"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-text-primary">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-text-secondary transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <p className="mt-4 text-text-secondary">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
