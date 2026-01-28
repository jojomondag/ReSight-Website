"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTabs from "@/components/ui/AnimatedTabs";

const games = [
  {
    id: "hunt",
    name: "Hunt: Showdown",
    images: {
      before: "/screenshots/hunt-dark.png",
      after: "/screenshots/hunt-dark-processed.png",
    },
  },
  {
    id: "tarkov",
    name: "Escape from Tarkov",
    images: {
      before: "/screenshots/tarkov-crosshair.png",
      after: "/screenshots/tarkov-crosshair-processed.png",
    },
  },
];

export default function Hero() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeGame, setActiveGame] = useState(games[0].id);
  const t = useTranslations("hero");

  const currentGame = games.find((g) => g.id === activeGame) || games[0];

  // Flat array of all images for navigation
  const allImages = games.flatMap((game) => [
    { src: game.images.after, label: `${game.name} - ${t("withReSight")}` },
    { src: game.images.before, label: `${game.name} - ${t("before")}` },
  ]);

  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex((img) => img.src === imageSrc);
    setLightboxIndex(index >= 0 ? index : null);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + allImages.length) % allImages.length
    );
  }, [lightboxIndex, allImages.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % allImages.length
    );
  }, [lightboxIndex, allImages.length]);

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

  const tabs = games.map((game) => ({
    id: game.id,
    label: game.name,
  }));

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-50"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <header className="text-center">
          {/* Speakable content for voice search */}
          <motion.h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            data-speakable="true"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t("title1")}
            <motion.span
              className="block text-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {t("title2")}
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-10"
            data-speakable="true"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {t("subtitle")}
          </motion.p>
          <motion.nav
            className="flex flex-col sm:flex-row gap-4 justify-center"
            aria-label="Primary actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/register"
              className="btn-primary text-lg px-8 py-4"
              aria-label={t("getStarted")}
            >
              {t("getStarted")}
            </Link>
            <Link
              href="/buy"
              className="btn-secondary text-lg px-8 py-4"
              aria-label={t("viewPricing")}
            >
              {t("viewPricing")}
            </Link>
          </motion.nav>
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <a
              href="https://discord.gg/AZJ9AA9S"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4 flex items-center gap-2 hover:text-accent transition-colors"
              aria-label={t("joinDiscord")}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 127 96"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>{t("joinDiscord")}</span>
            </a>
          </motion.div>
        </header>

        {/* Before/After Comparison with Animated Tabs */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <h2 className="sr-only">ReSight in action - Before and after comparison</h2>

          {/* Game Tabs */}
          <div className="flex justify-center mb-8">
            <AnimatedTabs
              tabs={tabs}
              defaultTab={activeGame}
              onChange={setActiveGame}
            />
          </div>

          {/* Game Screenshots */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGame}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* With ReSight - Main showcase */}
              <button
                onClick={() => openLightbox(currentGame.images.after)}
                className="relative rounded-xl overflow-hidden border-2 border-accent cursor-pointer hover:border-accent-light transition-all w-full group"
                aria-label={`View ${currentGame.name} with ReSight enhancement - click to enlarge`}
              >
                <div className="relative">
                  <Image
                    src={currentGame.images.after}
                    alt={`${currentGame.name} gameplay with ReSight crosshair overlay and display adjustments applied`}
                    width={1200}
                    height={675}
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="absolute top-4 left-4 bg-accent text-bg-primary text-sm px-3 py-1.5 rounded-lg font-medium shadow-lg">
                  {t("withReSight")}
                </span>
              </button>

              {/* Before - Smaller comparison */}
              <button
                onClick={() => openLightbox(currentGame.images.before)}
                className="relative rounded-xl overflow-hidden border-2 border-border cursor-pointer hover:border-text-secondary transition-all w-full group"
                aria-label={`View ${currentGame.name} without ReSight - click to enlarge`}
              >
                <div className="relative">
                  <Image
                    src={currentGame.images.before}
                    alt={`${currentGame.name} gameplay without ReSight - showing difficulty seeing in dark areas`}
                    width={1200}
                    height={675}
                    className="w-full h-auto opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="absolute top-4 left-4 bg-bg-primary/90 text-text-secondary text-sm px-3 py-1.5 rounded-lg border border-border">
                  {t("before")}
                </span>
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl font-light transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              &times;
            </button>

            {/* Image with navigation */}
            <motion.div
              className="relative flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
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
                  &lsaquo;
                </button>
                {/* Next arrow */}
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light transition-colors p-2 hover:bg-white/10 rounded-full"
                  onClick={goToNext}
                  aria-label="Next image"
                >
                  &rsaquo;
                </button>
              </div>
              <span className="text-white/80 text-sm">
                {allImages[lightboxIndex].label}
              </span>
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
