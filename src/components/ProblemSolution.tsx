import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PROBLEMS_SOLUTIONS } from "@/constants";

export default function ProblemSolution() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-medium text-orange-700">
            The Challenge & Response
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1E1610] sm:text-4xl">
            Problems We See, <span className="text-orange-600">Solutions We Build</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            Addis Ababa's youth face real challenges. AAYA meets them with proven, 
            scalable interventions that create lasting change.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PROBLEMS_SOLUTIONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-200/50 transition-all hover:shadow-xl hover:border-orange-200 sm:p-8"
            >
              <div className="flex items-start gap-4">
                {/* Problem side */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-600">Problem</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#1E1610]">{item.problem}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.problemDesc}</p>
                </div>

                {/* Divider */}
                <div className="hidden h-24 w-px bg-gradient-to-b from-orange-300 to-transparent sm:block" />

                {/* Solution side */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Solution</span>
                  </div>
                  <h4 className="text-lg font-bold text-emerald-700">{item.solution}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.solutionDesc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}