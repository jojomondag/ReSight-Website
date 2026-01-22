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
      <span className="text-text-secondary text-sm">{text}</span>
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
      <span className="text-text-secondary text-sm">Placeholder</span>
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
    <article className="card flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <SquarePlaceholder />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">
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
        <span className="inline-block text-accent font-medium text-sm">
          Watch it work
        </span>
        <MediaPlaceholder type={type} />
      </div>
    );
  }
  if (type === "video") {
    return (
      <div className="space-y-3">
        <span className="inline-block text-accent font-medium text-sm">
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
      <span className="inline-block text-accent font-medium text-sm">
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
      className="pt-24 pb-12 bg-bg-primary"
      aria-labelledby="crosshair-showcase-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h2
            id="crosshair-showcase-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            Crosshair Overlay
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Use any image. Any game. Pixel-perfect.
          </p>
        </header>

        <div className="max-w-5xl mx-auto mb-16">
          <MainDemoBlock />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
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
