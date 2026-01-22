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
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-50" aria-hidden="true" />
      <div className="relative max-w-7xl xl:max-w-[1600px] 2xl:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-28 2xl:px-40 min-h-[calc(100vh-80px)] flex flex-col justify-center py-8 sm:py-12 xl:py-36 2xl:py-52">
        {/* Hero Grid: Text Left, Video Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-40 2xl:gap-60 items-center flex-1">
          {/* Left Side: Text Content */}
          <header className="text-center lg:text-left transition-all duration-200">
            {/* Speakable content for voice search */}
            <h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-text-primary mb-6 sm:mb-8 leading-tight"
              data-speakable="true"
            >
              Aim Better.
              <span className="block text-accent">See More.</span>
            </h1>
            <p
              className="text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto lg:mx-0 mb-10 sm:mb-12 leading-relaxed"
              data-speakable="true"
            >
              Custom crosshair overlays, display adjustments for dark and bright maps, and Discord volume control. All in one app.
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" aria-label="Primary actions">
              <Link
                href="/register"
                className="btn-primary text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-lg transition-all duration-200"
                aria-label="Get started with ReSight - Create your account"
              >
                Get Started
              </Link>
              <Link
                href="/buy"
                className="btn-secondary text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-lg transition-all duration-200"
                aria-label="View ReSight pricing - $5 one-time purchase"
              >
                View Pricing
              </Link>
            </nav>
            <div className="flex justify-center lg:justify-start mt-5 sm:mt-6">
              <a
                href="https://discord.gg/AZJ9AA9S"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 flex items-center gap-2 hover:text-accent rounded-lg transition-all duration-200"
                aria-label="Join our Discord community"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                  viewBox="0 0 127 96"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                <span>Join our Discord</span>
              </a>
            </div>
          </header>

          {/* Right Side: Video Placeholder */}
          <div className="flex flex-col w-full transition-all duration-200">
            <span className="inline-block text-accent font-medium text-sm sm:text-base mb-3 text-center lg:text-left">
              Watch it work
            </span>
            <div
              className="aspect-video w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none rounded-lg bg-bg-tertiary border-2 border-dashed border-border flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-text-secondary text-sm sm:text-base">Video Placeholder</span>
            </div>
          </div>
        </div>

        {/* Before/After Comparison - below the fold */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <h2 className="sr-only">ReSight in action - Before and after comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
            {games.map((game) => (
              <article key={game.name} className="space-y-3" role="listitem">
                <div className="text-center mb-4">
                  <span className="px-4 py-2 rounded-lg text-sm font-medium bg-bg-tertiary text-text-primary">
                    {game.name}
                  </span>
                </div>
                <button
                  onClick={() => openLightbox(game.images.after)}
                  className="relative rounded-lg overflow-hidden border-2 border-accent cursor-pointer hover:brightness-110 transition-all w-full"
                  aria-label={`View ${game.name} with ReSight enhancement - click to enlarge`}
                >
                  <Image
                    src={game.images.after}
                    alt={`${game.name} gameplay with ReSight crosshair overlay and display adjustments applied`}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    priority
                  />
                  <span className="absolute top-3 left-3 bg-accent/90 text-bg-primary text-xs px-2 py-1 rounded font-medium">
                    With ReSight
                  </span>
                </button>
                <button
                  onClick={() => openLightbox(game.images.before)}
                  className="relative rounded-lg overflow-hidden border-2 border-border cursor-pointer hover:brightness-110 transition-all w-full"
                  aria-label={`View ${game.name} without ReSight - click to enlarge`}
                >
                  <Image
                    src={game.images.before}
                    alt={`${game.name} gameplay without ReSight - showing difficulty seeing in dark areas`}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                  <span className="absolute top-3 left-3 bg-bg-primary/80 text-text-secondary text-xs px-2 py-1 rounded">
                    Before
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl font-light transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
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
                aria-label="Previous image"
              >
                ‹
              </button>
              {/* Next arrow */}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light transition-colors p-2 hover:bg-white/10 rounded-full"
                onClick={goToNext}
                aria-label="Next image"
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
