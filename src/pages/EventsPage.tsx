import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Sparkle,
  CaretRight,
  Star,
  Handshake,
  ChalkboardTeacher,
  Heart,
  Megaphone,
  CurrencyDollar,
} from "@phosphor-icons/react";
import { EVENTS } from "@/constants";
import type { EventItem } from "@/types";

const typeIcons: Record<string, React.ReactNode> = {
  summit: <Sparkle weight="fill" className="w-4 h-4" />,
  workshop: <ChalkboardTeacher weight="fill" className="w-4 h-4" />,
  volunteer: <Heart weight="fill" className="w-4 h-4" />,
  community: <Handshake weight="fill" className="w-4 h-4" />,
  seminar: <Megaphone weight="fill" className="w-4 h-4" />,
  fundraiser: <CurrencyDollar weight="fill" className="w-4 h-4" />,
};

const typeLabels: Record<string, string> = {
  summit: "Summit",
  workshop: "Workshop",
  volunteer: "Volunteer",
  community: "Community",
  seminar: "Seminar",
  fundraiser: "Fundraiser",
};

const typeColors: Record<string, string> = {
  summit: "bg-amber-500/10 text-amber-600 border-amber-200",
  workshop: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  volunteer: "bg-rose-500/10 text-rose-600 border-rose-200",
  community: "bg-blue-500/10 text-blue-600 border-blue-200",
  seminar: "bg-purple-500/10 text-purple-600 border-purple-200",
  fundraiser: "bg-orange-500/10 text-orange-600 border-orange-200",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EventCard({
  event,
  index,
}: {
  event: EventItem;
  index: number;
}) {
  const [rsvped, setRsvped] = useState(false);
  const fillPercent = Math.min(
    Math.round((event.registered / event.capacity) * 100),
    100
  );
  const isFull = event.registered >= event.capacity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 hover:shadow-lg hover:border-amber-200/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-white/90 ${
              typeColors[event.type]?.split(" ")[1] || "text-stone-700"
            }`}
          >
            {typeIcons[event.type]}
            {typeLabels[event.type]}
          </span>
        </div>

        {/* Featured badge */}
        {event.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-900 shadow-sm">
              <Star weight="fill" className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Status pill */}
        {event.status === "past" && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800/70 text-stone-200 backdrop-blur-sm">
              Past Event
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-stone-800 mb-1.5 leading-snug group-hover:text-amber-700 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-1.5 mb-3 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {event.registered} / {event.capacity} registered
            </span>
            <span className="font-medium">{fillPercent}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fillPercent}%` }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.06, ease: "easeOut" }}
              className={`h-full rounded-full ${
                isFull
                  ? "bg-rose-500"
                  : fillPercent > 80
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            />
          </div>
        </div>

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="flex items-center gap-2 mb-3 text-xs text-stone-400">
            <Megaphone weight="fill" className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {event.speakers.map((s) => s.name).join(", ")}
            </span>
          </div>
        )}

        {/* RSVP / View button */}
        {event.status !== "past" ? (
          <button
            onClick={() => setRsvped(true)}
            disabled={rsvped || isFull}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              rsvped
                ? "bg-emerald-500 text-white cursor-default"
                : isFull
                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-white active:scale-[0.97]"
            }`}
          >
            {rsvped ? (
              <>✓ RSVP Confirmed</>
            ) : isFull ? (
              <>Full</>
            ) : (
              <>
                <Ticket className="w-4 h-4" />
                RSVP Now
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-stone-50 text-sm text-stone-400 cursor-default">
            <span>Event Ended</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function FeaturedEvent({ event }: { event: EventItem }) {
  const [rsvped, setRsvped] = useState(false);
  const fillPercent = Math.min(
    Math.round((event.registered / event.capacity) * 100),
    100
  );
  const isFull = event.registered >= event.capacity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-3xl overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative z-10 grid md:grid-cols-2 gap-0">
        {/* Left: Text */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 w-fit backdrop-blur-sm">
            <Star weight="fill" className="w-3.5 h-3.5" />
            Featured Event
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            {event.title}
          </h2>
          <p className="text-amber-50/80 text-sm sm:text-base leading-relaxed mb-5 line-clamp-3">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-amber-50/70 mb-5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-5">
            {event.speakers?.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400/30 flex items-center justify-center text-white text-xs font-bold">
                  {s.name.charAt(0)}
                </div>
                <div className="text-xs text-amber-50/80">
                  <p className="font-medium text-white/90">{s.name}</p>
                  <p className="text-amber-50/60">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setRsvped(true)}
              disabled={rsvped || isFull}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                rsvped
                  ? "bg-white/20 text-white cursor-default"
                  : isFull
                  ? "bg-white/10 text-white/50 cursor-not-allowed"
                  : "bg-white text-amber-700 hover:bg-amber-50 active:scale-[0.97]"
              }`}
            >
              {rsvped ? (
                "✓ Confirmed"
              ) : isFull ? (
                "Full"
              ) : (
                <>
                  Reserve My Spot <CaretRight className="w-4 h-4" weight="bold" />
                </>
              )}
            </button>
            <div className="flex items-center gap-1 text-amber-50/70 text-xs">
              <Users className="w-3.5 h-3.5" />
              {event.registered}/{event.capacity} filled
            </div>
          </div>
          <div className="mt-3 w-full max-w-xs h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fillPercent}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
        {/* Right: Image */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/60 via-transparent to-transparent md:bg-gradient-to-r md:from-amber-600/60 md:to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredEvent = EVENTS.find((e) => e.isFeatured && e.status === "upcoming");

  const filteredEvents = useMemo(() => {
    let list = EVENTS;
    if (filter === "upcoming") list = list.filter((e) => e.status === "upcoming");
    else if (filter === "past") list = list.filter((e) => e.status === "past");
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          typeLabels[e.type]?.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => b.timestamp - a.timestamp);
  }, [filter, searchQuery]);

  const stats = useMemo(
    () => ({
      total: EVENTS.length,
      upcoming: EVENTS.filter((e) => e.status === "upcoming").length,
      past: EVENTS.filter((e) => e.status === "past").length,
      totalRegistered: EVENTS.reduce((acc, e) => acc + e.registered, 0),
      totalCapacity: EVENTS.reduce((acc, e) => acc + e.capacity, 0),
    }),
    []
  );

  return (
    <main className="min-h-screen bg-[#FAF6F0]">
      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 text-sm font-medium mb-4 border border-amber-200/50">
              <Sparkle weight="fill" className="w-4 h-4" />
              Community Events & Programs
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 mb-4 leading-tight">
              Events That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                Inspire
              </span>{" "}
              Change
            </h1>
            <p className="text-stone-500 text-lg sm:text-xl max-w-2xl mx-auto">
              From leadership summits to community clean-ups, discover
              opportunities to connect, learn, and make a difference.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10"
          >
            {[
              { label: "Total Events", value: stats.total, icon: <Calendar className="w-4 h-4" /> },
              { label: "Upcoming", value: stats.upcoming, icon: <Sparkle className="w-4 h-4" /> },
              { label: "Past Events", value: stats.past, icon: <Heart className="w-4 h-4" /> },
              { label: "Total Registrations", value: stats.totalRegistered.toLocaleString(), icon: <Users className="w-4 h-4" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-stone-200/60 shadow-sm"
              >
                <span className="text-amber-600">{stat.icon}</span>
                <div>
                  <p className="text-lg font-bold text-stone-800 leading-tight">{stat.value}</p>
                  <p className="text-xs text-stone-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <FeaturedEvent event={featuredEvent} />
        </section>
      )}

      {/* All Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Upcoming Events heading */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-2">
              Discover our lineup of community programs, summits, and volunteer opportunities.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-stone-200/60 shadow-sm">
            {(["all", "upcoming", "past"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                  filter === opt
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                }`}
              >
                {opt === "all" ? "All Events" : opt}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-200/60 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-300 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Event Grid */}
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key={filter + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
                <Calendar className="w-8 h-8 text-stone-400" />
              </div>
              <p className="text-stone-500 text-lg font-medium">No events found</p>
              <p className="text-stone-400 text-sm mt-1">
                Try adjusting your search or filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}