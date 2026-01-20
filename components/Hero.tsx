"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const games = [
  {
    name: "Hunt: Showdown",
    images: {
      before: "/screenshots/hunt-dark.png",
      after: "/screenshots/hunt-dark-processed.png",
    },
  },
  {
    name: "Escape from Tarkov",
    images: {
      before: "/screenshots/tarkov-crosshair.png",
      after: "/screenshots/tarkov-crosshair-processed.png",
    },
  },
];

// Flat array of all images for navigation
const allImages = games.flatMap((game) => [
  { src: game.images.after, label: `${game.name} - With ReSight` },
  { src: game.images.before, label: `${game.name} - Before` },
]);

export default function Hero() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex((img) => img.src === imageSrc);
    setLightboxIndex(index >= 0 ? index : null);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
  }, [lightboxIndex]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));
  }, [lightboxIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goToPrevious, goToNext]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Aim Better.
            <span className="block text-accent">See More.</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Custom crosshair overlays, display adjustments for dark and bright maps, and Discord volume control. All in one app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buy" className="btn-primary text-lg px-8 py-4">
              Get ReSight
            </Link>
            <Link href="/#features" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <div key={game.name} className="space-y-3">
                <div className="text-center mb-4">
                  <span className="px-4 py-2 rounded-lg text-sm font-medium bg-bg-tertiary text-text-primary">
                    {game.name}
                  </span>
                </div>
                <button
                  onClick={() => openLightbox(game.images.after)}
                  className="relative rounded-lg overflow-hidden border border-accent cursor-pointer hover:brightness-110 transition-all w-full"
                >
                  <Image
                    src={game.images.after}
                    alt={`${game.name} with ReSight`}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                  <span className="absolute top-3 left-3 bg-accent/90 text-bg-primary text-xs px-2 py-1 rounded font-medium">
                    With ReSight
                  </span>
                </button>
                <button
                  onClick={() => openLightbox(game.images.before)}
                  className="relative rounded-lg overflow-hidden border border-border cursor-pointer hover:brightness-110 transition-all w-full"
                >
                  <Image
                    src={game.images.before}
                    alt={`${game.name} before`}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                  <span className="absolute top-3 left-3 bg-bg-primary/80 text-text-secondary text-xs px-2 py-1 rounded">
                    Before
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl font-light transition-colors z-10"
            onClick={closeLightbox}
          >
            ×
          </button>

          {/* Image with navigation */}
          <div className="relative flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image
                src={allImages[lightboxIndex].src}
                alt={allImages[lightboxIndex].label}
                width={1920}
                height={1080}
                className="max-w-full max-h-[80vh] object-contain rounded-lg cursor-default"
              />
              {/* Previous arrow */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light transition-colors p-2 hover:bg-white/10 rounded-full"
                onClick={goToPrevious}
              >
                ‹
              </button>
              {/* Next arrow */}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light transition-colors p-2 hover:bg-white/10 rounded-full"
                onClick={goToNext}
              >
                ›
              </button>
            </div>
            <span className="text-white/80 text-sm">{allImages[lightboxIndex].label}</span>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
