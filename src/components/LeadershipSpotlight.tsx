import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { LEADERSHIP_QUOTES } from "@/constants";

export default function LeadershipSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const quote = LEADERSHIP_QUOTES[activeIndex];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-medium text-orange-700">
            Where Our Leadership Began
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1E1610] sm:text-4xl">
            Leaders Who Started <span className="text-orange-600">Here</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            AAYA alumni have gone on to become ministers, entrepreneurs, doctors, and change-makers. 
            Their journeys began in our programs.
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/50 sm:p-12"
          >
            {/* Quote icon */}
            <div className="absolute -top-4 -left-4 text-6xl text-orange-100 select-none">
              <Quote className="h-16 w-16 opacity-30" />
            </div>

            <div className="relative">
              <p className="text-lg leading-relaxed text-gray-700 sm:text-xl sm:leading-relaxed">
                "{quote.quote}"
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-base font-bold text-[#1E1610]">{quote.name}</p>
                  <p className="text-sm text-gray-500">{quote.title}</p>
                  <p className="text-xs text-amber-600">{quote.year}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveIndex((i) => (i - 1 + LEADERSHIP_QUOTES.length) % LEADERSHIP_QUOTES.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveIndex((i) => (i + 1) % LEADERSHIP_QUOTES.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {LEADERSHIP_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-6 bg-orange-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}