import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Heart } from "lucide-react";
import { ImagesSquare } from "@phosphor-icons/react";
import { TAGLINE, ORG_NAME, ORG_SHORT, DEFAULT_HERO_SLIDES } from "@/constants";
import type { CustomSlide } from "@/types";

interface HeroSliderProps {
  onVolunteer: () => void;
  onNavigate: (page: string) => void;
  slides?: CustomSlide[];
  onEditSlides?: () => void;
}

export default function HeroSlider({ onVolunteer, onNavigate, slides: customSlides, onEditSlides }: HeroSliderProps) {
  const slides = (customSlides && customSlides.length > 0 ? customSlides : DEFAULT_HERO_SLIDES).map((s) => ({
    bg: s.bg,
    subtitle: s.subtitle,
    cta: s.cta,
    cta2: s.cta2,
  }));
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1610]/90 via-[#1E1610]/60 to-transparent z-10" />
          <img
            src={slides[current].bg}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <motion.span
              key={current + "sub"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-xs font-medium text-amber-300 backdrop-blur-sm"
            >
              {slides[current].subtitle}
            </motion.span>

            <motion.h1
              key={current + "title"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {TAGLINE.split(".").map((part, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  <span className={i === 0 ? "bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent" : ""}>
                    {part}
                    {i === 0 && "."}
                  </span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              key={current + "desc"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 max-w-lg text-base leading-relaxed text-gray-300 sm:text-lg"
            >
              {ORG_NAME} has been empowering Ethiopian youth since 1998 — providing skills, education, and
              opportunities to 400,000+ members across 11 sub-cities and 119+ woredas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={onVolunteer}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:scale-105 hover:shadow-orange-600/50 active:scale-95"
              >
                <Heart className="h-4 w-4" />
                {slides[current].cta}
              </button>
              <button
                onClick={() => onNavigate("programs")}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30"
              >
                <Play className="h-4 w-4" />
                {slides[current].cta2}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick stats badges */}
      <div className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 gap-3 md:flex">
        <div className="rounded-xl bg-white/10 px-4 py-2 text-center backdrop-blur-md">
          <p className="text-lg font-bold text-amber-400">400K+</p>
          <p className="text-[10px] text-gray-400">Youth Members</p>
        </div>
        <div className="rounded-xl bg-white/10 px-4 py-2 text-center backdrop-blur-md">
          <p className="text-lg font-bold text-amber-400">11</p>
          <p className="text-[10px] text-gray-400">Sub-Cities</p>
        </div>
        <div className="rounded-xl bg-white/10 px-4 py-2 text-center backdrop-blur-md">
          <p className="text-lg font-bold text-amber-400">119+</p>
          <p className="text-[10px] text-gray-400">Woredas</p>
        </div>
        <div className="rounded-xl bg-white/10 px-4 py-2 text-center backdrop-blur-md">
          <p className="text-lg font-bold text-amber-400">1998</p>
          <p className="text-[10px] text-gray-400">Established</p>
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Floating Manage Photos trigger */}
      {onEditSlides && (
        <button
          onClick={onEditSlides}
          className="absolute bottom-24 right-4 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-[#1E1610]/80 px-4 py-2.5 text-xs font-medium text-amber-300 backdrop-blur-md transition-all hover:border-amber-400/40 hover:bg-[#1E1610] hover:shadow-lg hover:shadow-amber-500/10 active:scale-95 md:bottom-8 md:right-8"
        >
          <ImagesSquare className="h-4 w-4" weight="duotone" />
          <span className="hidden sm:inline">Manage Photos</span>
        </button>
      )}
    </section>
  );
}