const features = [
  {
    id: "visual-clarity",
    title: "Visual Clarity",
    description:
      "Dark maps too dark? Bright skies washing out enemies? Adjust brightness, contrast & gamma instantly with hotkeys.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: "discord-volume",
    title: "Discord Volume Control",
    description:
      "Lower voice chat volume with a hotkey during clutch moments. Focus when it matters most.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    ),
  },
  {
    id: "game-profiles",
    title: "Game Profiles",
    description:
      "Auto-apply your settings when games launch. Different presets for different maps or lighting conditions.",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="pt-20 sm:pt-24 lg:pt-28 xl:pt-32 pb-24 lg:pb-32 xl:pb-36 bg-bg-secondary"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <header className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
          <h2
            id="features-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4 lg:mb-5"
          >
            Features
          </h2>
          <p className="text-text-secondary text-xl sm:text-2xl max-w-2xl mx-auto">
            Everything runs in real-time. No alt-tabbing. No restarting.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto" role="list">
          {features.map((feature) => (
            <article
              key={feature.id}
              id={feature.id}
              className="card hover:border-accent transition-colors p-4 sm:p-5"
              role="listitem"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="flex-shrink-0 w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{feature.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
