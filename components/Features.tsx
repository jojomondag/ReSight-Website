const features = [
  {
    id: "visual-clarity",
    title: "Visual Clarity",
    description:
      "Dark maps too dark? Bright skies washing out enemies? Adjust brightness, contrast & gamma instantly with hotkeys.",
    icon: (
      <svg
        className="w-8 h-8"
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
        className="w-8 h-8"
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
        className="w-8 h-8"
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
      className="pt-12 pb-24 bg-bg-secondary"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            Features
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Everything runs in real-time. No alt-tabbing. No restarting.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
          {features.map((feature) => (
            <article
              key={feature.id}
              id={feature.id}
              className="card hover:border-accent transition-colors"
              role="listitem"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
