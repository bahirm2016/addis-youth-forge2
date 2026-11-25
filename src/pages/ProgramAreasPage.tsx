import { motion } from "framer-motion";
import { Zap, Briefcase, BookOpen, Heart, Check } from "lucide-react";
import { PROGRAMS } from "@/constants";

const iconMap: Record<string, React.ElementType> = { Zap, Briefcase, BookOpen, Heart };

export default function ProgramAreasPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E1610] via-[#2A1F18] to-[#1E1610] py-20">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300"
          >
            Our Impacts
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-white sm:text-5xl"
          >
            Our <span className="text-emerald-400">Impacts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-gray-400"
          >
            Our comprehensive programs address the full spectrum of youth needs — from skills and employment 
            to education and civic engagement.
          </motion.p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {PROGRAMS.map((program, i) => {
              const Icon = iconMap[program.icon] || Heart;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-lg shadow-gray-100/50 transition-all hover:shadow-xl hover:border-emerald-200"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20">
                    <Icon className="h-7 w-7 text-emerald-600" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#1E1610]">{program.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{program.desc}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {program.highlights.map((h, j) => (
                      <div key={j} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="text-xs text-gray-700">{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E1610] py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Transform Your Future?
            </h2>
            <p className="mt-3 text-gray-400">
              Join thousands of youth who have found their path through our programs.
            </p>
            <button className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-emerald-600/30 active:scale-95">
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}