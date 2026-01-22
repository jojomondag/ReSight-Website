"use client";

import Image from "next/image";

type MediaType = "video" | "image";

const mainDemo = {
  type: "video" as MediaType,
  src: undefined as string | undefined,
};

function MediaPlaceholder({ type }: { type: MediaType }) {
  const text = type === "video" ? "Placeholder" : "Image placeholder";
  return (
    <div
      className="aspect-video w-full rounded-lg bg-bg-tertiary border-2 border-dashed border-border flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="text-text-secondary text-base">{text}</span>
    </div>
  );
}

const placeholderCards: {
  id: string;
  title: string;
  description: [string, string];
}[] = [
  {
    id: "lines",
    title: "Lines",
    description: [
      "Adjust Color, Length, Width and Opacity.",
      "Choose between a T shape or Cross.",
    ],
  },
  {
    id: "center-dot",
    title: "Center Dot",
    description: [
      "Adjust Color, Size and Opacity.",
      "Choose if you want it on or off.",
    ],
  },
  {
    id: "custom-image",
    title: "Custom Image",
    description: [
      "Use any image as crosshair.",
      "Logos, shapes, or community presets.",
    ],
  },
];

function SquarePlaceholder() {
  return (
    <div
      className="aspect-square w-full rounded-lg bg-bg-tertiary border border-border flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="text-text-secondary text-base">Placeholder</span>
    </div>
  );
}

function PlaceholderCard({
  title,
  description,
}: {
  title: string;
  description: [string, string];
}) {
  return (
    <article className="card flex flex-col p-6 sm:p-8">
      <div className="mb-4 flex-shrink-0">
        <SquarePlaceholder />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
        {description[0]}
        <br />
        {description[1]}
      </p>
    </article>
  );
}

function MainDemoBlock() {
  const { type, src } = mainDemo;
  if (!src) {
    return (
      <div className="space-y-3">
        <span className="inline-block text-accent font-medium text-base sm:text-lg">
          Watch it work
        </span>
        <MediaPlaceholder type={type} />
      </div>
    );
  }
  if (type === "video") {
    return (
      <div className="space-y-3">
        <span className="inline-block text-accent font-medium text-base sm:text-lg">
          Watch it work
        </span>
        <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
          <video src={src} controls className="w-full h-full object-contain" />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <span className="inline-block text-accent font-medium text-base sm:text-lg">
        Watch it work
      </span>
      <div className="aspect-video w-full relative rounded-lg overflow-hidden border border-border">
        <Image
          src={src}
          alt="ReSight crosshair overlay demo"
          fill
          className="object-contain"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
    </div>
  );
}

export default function CrosshairShowcase() {
  return (
    <section
      id="crosshair-showcase"
      className="pt-20 sm:pt-24 lg:pt-28 xl:pt-32 pb-16 sm:pb-20 lg:pb-24 xl:pb-28 bg-bg-primary"
      aria-labelledby="crosshair-showcase-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <header className="text-center mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
          <h2
            id="crosshair-showcase-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-4 lg:mb-5"
          >
            Crosshair Overlay
          </h2>
          <p className="text-text-secondary text-xl sm:text-2xl max-w-2xl mx-auto">
            Use any image. Any game. Pixel-perfect.
          </p>
        </header>

        <div className="max-w-5xl mx-auto mb-20 lg:mb-24 xl:mb-28">
          <MainDemoBlock />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 max-w-5xl mx-auto"
          role="list"
        >
          {placeholderCards.map((card) => (
            <PlaceholderCard
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
