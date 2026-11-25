import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, BookOpen, Users, Award, Heart } from "lucide-react";
import { IMPACT_STATS } from "@/constants";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Briefcase,
  BookOpen,
  Users,
  Award,
  Heart,
};

function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numeric = parseInt(value.replace(/,/g, ""));
  const isNumeric = !isNaN(numeric);

  return (
    <span ref={ref} className="text-3xl font-extrabold sm:text-4xl">
      {isNumeric ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <motion.span
            initial={{ textShadow: "0 0 20px rgba(234,88,12,0)" }}
            animate={isInView ? { textShadow: "0 0 20px rgba(234,88,12,0.3)" } : {}}
            transition={{ duration: 1.5 }}
          >
            {value}
          </motion.span>
        </motion.span>
      ) : (
        <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
          {value}
        </span>
      )}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-medium text-orange-700">
            The Proof
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1E1610] sm:text-4xl">
            Our Impact in <span className="text-orange-600">Numbers</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-600">
            For 28 years, AAYA has delivered measurable, life-changing results for Ethiopian youth and communities.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_STATS.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Heart;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-amber-300 sm:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100">
                  <Icon className="h-6 w-6 text-orange-600" />
                </div>
                <CountUp value={stat.value} />
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}