import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Target, Heart, Shield, Users, GraduationCap, MapPin, Award,
  BookOpen, Briefcase, Globe, Handshake, Leaf, ChevronRight,
  Quote, Clock, Flag, Code, ExternalLink,
} from "lucide-react";
import {
  ORG_NAME, ORG_SHORT, EST_YEAR, REG_NUMBER, REG_AUTHORITY,
  TEAM_MEMBERS, SUB_CITIES, TOTAL_WOREDAS,
} from "@/constants";

/* ─── Staggered fade-in wrapper ─── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { start = value; clearInterval(timer); }
      setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Stat card ─── */
function StatCard({ label, value, suffix, icon: Icon, delay }: {
  label: string; value: number; suffix?: string; icon: React.ElementType; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl border border-emerald-800/20 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-white/10"
    >
      <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-400/10" />
      <Icon className="mb-2 h-5 w-5 text-amber-400" />
      <p className="text-2xl font-bold text-white">
        <Counter value={value} suffix={suffix} />
      </p>
      <p className="mt-1 text-xs leading-tight text-emerald-100/70">{label}</p>
    </motion.div>
  );
}

/* ─── Program data ─── */
const PROGRAMS_ABOUT = [
  {
    id: "education",
    title: "Education & Digital Skills",
    icon: Code,
    color: "emerald",
    desc: "ICT, AI literacy, digital marketing, soft skills, and work ethics training for the modern economy.",
    highlights: ["ICT & AI Training", "Digital Marketing", "Soft Skills", "Work Ethics"],
  },
  {
    id: "employment",
    title: "Youth Employment & Entrepreneurship",
    icon: Briefcase,
    color: "amber",
    desc: "Incubators, accelerators, and mentorship hubs connecting youth to sustainable livelihoods.",
    highlights: ["Business Incubators", "Mentorship Hubs", "Job Placement", "Entrepreneurship"],
  },
  {
    id: "governance",
    title: "Governance, Peace & Civic Engagement",
    icon: Handshake,
    color: "indigo",
    desc: "Youth ambassadors, decision-making platforms, and policy advocacy for civic participation.",
    highlights: ["Youth Ambassadors", "Policy Advocacy", "Peace Building", "Civic Leadership"],
  },
  {
    id: "health",
    title: "Youth Health & SRHR",
    icon: Heart,
    color: "rose",
    desc: "Awareness campaigns, mental health support, and substance abuse prevention programs.",
    highlights: ["SRHR Awareness", "Mental Health", "Substance Prevention", "Peer Education"],
  },
  {
    id: "climate",
    title: "Climate & Environmental Protection",
    icon: Leaf,
    color: "teal",
    desc: "Reforestation, clean tech advocacy, and waste management initiatives for a greener Addis.",
    highlights: ["Reforestation", "Clean Tech", "Waste Management", "Green Jobs"],
  },
];

/* ─── Value Pill ─── */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200">
      {children}
    </span>
  );
}

/* ─── Program Card ─── */
function ProgramCard({ program, index, active, onClick }: {
  program: typeof PROGRAMS_ABOUT[number];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const colorMap: Record<string, string> = {
    emerald: "border-emerald-500/40 bg-emerald-500/5 text-emerald-300",
    amber: "border-amber-500/40 bg-amber-500/5 text-amber-300",
    indigo: "border-indigo-500/40 bg-indigo-500/5 text-indigo-300",
    rose: "border-rose-500/40 bg-rose-500/5 text-rose-300",
    teal: "border-teal-500/40 bg-teal-500/5 text-teal-300",
  };
  const activeColorMap: Record<string, string> = {
    emerald: "border-emerald-500 bg-emerald-600 text-white",
    amber: "border-amber-500 bg-amber-600 text-white",
    indigo: "border-indigo-500 bg-indigo-600 text-white",
    rose: "border-rose-500 bg-rose-600 text-white",
    teal: "border-teal-500 bg-teal-600 text-white",
  };
  const borderMap: Record<string, string> = {
    emerald: "hover:border-emerald-500/60",
    amber: "hover:border-amber-500/60",
    indigo: "hover:border-indigo-500/60",
    rose: "hover:border-rose-500/60",
    teal: "hover:border-teal-500/60",
  };

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
        active
          ? activeColorMap[program.color]
          : `border-white/10 bg-white/5 text-white/80 ${borderMap[program.color]}`
      }`}
    >
      <program.icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{program.title}</span>
      <ChevronRight className={`ml-auto h-3.5 w-3.5 shrink-0 transition-transform ${active ? "rotate-90" : ""}`} />
    </motion.button>
  );
}

/* ─── Program Detail Panel ─── */
function ProgramDetail({ program }: { program: typeof PROGRAMS_ABOUT[number] }) {
  const colorBorder: Record<string, string> = {
    emerald: "border-emerald-500/30",
    amber: "border-amber-500/30",
    indigo: "border-indigo-500/30",
    rose: "border-rose-500/30",
    teal: "border-teal-500/30",
  };
  const colorBg: Record<string, string> = {
    emerald: "bg-emerald-500/10",
    amber: "bg-amber-500/10",
    indigo: "bg-indigo-500/10",
    rose: "bg-rose-500/10",
    teal: "bg-teal-500/10",
  };
  const colorText: Record<string, string> = {
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    indigo: "text-indigo-300",
    rose: "text-rose-300",
    teal: "text-teal-300",
  };

  return (
    <motion.div
      key={program.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border p-6 ${colorBorder[program.color]}`}
    >
      <div className={`mb-4 inline-flex rounded-xl p-3 ${colorBg[program.color]}`}>
        <program.icon className={`h-6 w-6 ${colorText[program.color]}`} />
      </div>
      <h4 className="text-lg font-bold text-white">{program.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{program.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {program.highlights.map((h) => (
          <span
            key={h}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${colorBorder[program.color]} ${colorText[program.color]}`}
          >
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Leadership Card ─── */
function LeaderCard({ member, index }: { member: typeof TEAM_MEMBERS[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-amber-500/30 hover:bg-white/[0.07]"
    >
      {/* Avatar */}
      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-2xl border-2 border-amber-500/20 transition-all group-hover:border-amber-400/40">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Info */}
      <div className="mt-4 text-center">
        <h3 className="text-base font-bold text-white">{member.name}</h3>
        <p className="text-xs font-medium text-amber-400">{member.role}</p>
        <p className="mt-2 text-xs leading-relaxed text-white/50">{member.bio}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function AboutUsPage() {
  const [activeProgram, setActiveProgram] = useState(PROGRAMS_ABOUT[0].id);

  return (
    <main className="overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO — Who We Are
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#0a2e1a] via-[#065f46] to-[#0f3b2a] pt-28 pb-20">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-amber-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Badge */}
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
              <Award className="h-3.5 w-3.5" />
              Registered under the Ethiopian Civil Society Organizations Authority — Reg. #{REG_NUMBER}
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Empowering Youth,{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Building Tomorrow
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-emerald-100/70 sm:text-lg">
              Since {EST_YEAR}, {ORG_NAME} has been at the forefront of youth development in Addis Ababa —
              transforming lives through vocational training, education, employment, civic engagement,
              and environmental action across all 11 sub-cities.
            </p>
          </FadeIn>

          {/* Stats Grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard label="Active Members" value={250000} suffix="+" icon={Users} delay={0.1} />
            <StatCard label="Sub-Cities Covered" value={11} icon={MapPin} delay={0.2} />
            <StatCard label="Woredas Reached" value={119} suffix="+" icon={Flag} delay={0.3} />
            <StatCard label="Established" value={EST_YEAR} icon={Clock} delay={0.4} />
            <StatCard label="Summer Volunteerism Since" value={2002} icon={GraduationCap} delay={0.5} />
          </div>

          {/* Story block */}
          <FadeIn delay={0.3}>
            <div className="mt-10 max-w-3xl rounded-2xl border border-emerald-500/20 bg-emerald-900/20 p-6 backdrop-blur-sm">
              <p className="text-sm leading-relaxed text-emerald-100/80">
                What began as a small community initiative in Bole has grown into a city-wide movement
                spanning all 11 sub-cities and 119+ woredas. {ORG_SHORT} has pioneered youth employment
                creation, SRHR awareness, digital skill building, and civic engagement —
                reaching over 400,000 young Ethiopians and establishing the nation's first
                <strong className="text-amber-300"> Summer Volunteer Hub </strong>
                program in 2002.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: MISSION, VISION, VALUES & LEGAL STATUS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#FAF6F0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700">
              Our Foundation
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#1E1610] sm:text-4xl">
              Mission, Vision &amp; Core Values
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
              The principles that guide every program, partnership, and decision we make.
            </p>
          </FadeIn>

          {/* 3 Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Mission — Emerald */}
            <FadeIn delay={0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-emerald-300">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl transition-all group-hover:bg-emerald-200/70" />
                <div className="inline-flex rounded-xl bg-emerald-100 p-3">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1E1610]">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Organizing and empowering the youth to alleviate their social, economic and political problems
                  through skills development, advocacy, and sustainable opportunity creation.
                </p>
              </div>
            </FadeIn>

            {/* Vision — Amber/Gold */}
            <FadeIn delay={0.2}>
              <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-amber-300">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-100/50 blur-2xl transition-all group-hover:bg-amber-200/70" />
                <div className="inline-flex rounded-xl bg-amber-100 p-3">
                  <Globe className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1E1610]">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  To see a young citizen become productive, responsible, healthy that vigorously participates
                  in economic, social and political activities of the country.
                </p>
              </div>
            </FadeIn>

            {/* Core Values — Indigo/Slate */}
            <FadeIn delay={0.3}>
              <div className="group relative overflow-hidden rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-indigo-300">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-100/50 blur-2xl transition-all group-hover:bg-indigo-200/70" />
                <div className="inline-flex rounded-xl bg-indigo-100 p-3">
                  <Heart className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1E1610]">Core Values</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  We believe in equal opportunity for every youth regardless of gender, ethnicity, or background.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>Empowerment</Pill>
                  <Pill>Volunteerism</Pill>
                  <Pill>Youth Rights</Pill>
                  <Pill>Peace Building</Pill>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Legal Status Banner */}
          <FadeIn delay={0.4}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-700/20 bg-gradient-to-r from-emerald-900 to-emerald-800 p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                <div className="shrink-0 rounded-xl bg-amber-400/20 p-3">
                  <Shield className="h-8 w-8 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Registered &amp; Regulated</h3>
                  <p className="mt-1 text-sm text-emerald-100/70">
                    {ORG_NAME} is officially registered under the{" "}
                    <strong className="text-amber-300">{REG_AUTHORITY}</strong> (Reg. #{REG_NUMBER}),
                    operating across all <strong className="text-amber-300">{SUB_CITIES.length} sub-cities</strong>{" "}
                    and <strong className="text-amber-300">{TOTAL_WOREDAS}+ woredas</strong> of Addis Ababa.
                  </p>
                </div>
                <div className="shrink-0 text-center">
                  <p className="text-3xl font-bold text-amber-400">#{REG_NUMBER}</p>
                  <p className="text-xs text-emerald-100/50">Registration No.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: STRATEGIC PROGRAM AREAS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-b from-[#0a2e1a] to-[#0f3b2a] py-20">
        <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="pointer-events-none absolute left-0 bottom-1/4 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <span className="inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
              Our Impact Areas
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Strategic Program Areas
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-emerald-100/60">
              Five core pillars driving measurable change across Addis Ababa.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            {/* Left: Tabs */}
            <div className="flex flex-col gap-2 lg:col-span-2">
              {PROGRAMS_ABOUT.map((p, i) => (
                <ProgramCard
                  key={p.id}
                  program={p}
                  index={i}
                  active={activeProgram === p.id}
                  onClick={() => setActiveProgram(p.id)}
                />
              ))}
            </div>

            {/* Right: Detail Panel */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {PROGRAMS_ABOUT.filter((p) => p.id === activeProgram).map((p) => (
                  <ProgramDetail key={p.id} program={p} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: EXECUTIVE LEADERSHIP
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF6F0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-medium text-amber-700">
              Leadership
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#1E1610] sm:text-4xl">
              Executive Leadership Team
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
              Dedicated professionals committed to youth empowerment and organizational excellence.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member, i) => (
              <LeaderCard key={member.name} member={member} index={i} />
            ))}
          </div>

          {/* Quote block */}
          <FadeIn delay={0.3}>
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-amber-200 bg-white p-6 text-center shadow-sm">
              <Quote className="mx-auto h-8 w-8 text-amber-300" />
              <p className="mt-3 text-sm italic leading-relaxed text-gray-600">
                "Our team brings decades of combined experience in youth development, public administration,
                and community organizing. Every member of our leadership is deeply rooted in the communities
                we serve."
              </p>
              <p className="mt-3 text-xs font-medium text-amber-700">— Amanuel Berhe, Executive Director</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}