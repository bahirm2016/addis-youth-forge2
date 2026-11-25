import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, ChevronDown, Navigation } from "lucide-react";
import { SUB_CITIES, TOTAL_WOREDAS, ORG_NAME } from "@/constants";

export default function SubCityNetwork() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = SUB_CITIES.filter((sc) =>
    sc.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700">
            Our Network
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1E1610] sm:text-4xl">
            Across Every <span className="text-emerald-600">Sub-City</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            {ORG_NAME} operates in all 11 sub-cities of Addis Ababa, reaching youth across {TOTAL_WOREDAS}+ woredas 
            with life-changing programs and opportunities.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sub-city..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((sc, i) => (
            <motion.div
              key={sc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group cursor-pointer"
              onClick={() => setExpanded(expanded === sc.name ? null : sc.name)}
            >
              <div className={`rounded-2xl border p-5 transition-all ${
                expanded === sc.name
                  ? "border-emerald-300 bg-emerald-50 shadow-lg shadow-emerald-100/50"
                  : "border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-200"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      expanded === sc.name ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"
                    }`}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1E1610]">{sc.name}</p>
                      <p className="text-xs text-gray-500">{sc.woredas} woredas</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                    expanded === sc.name ? "rotate-180" : ""
                  }`} />
                </div>
                {expanded === sc.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 border-t border-emerald-200 pt-4"
                  >
                    <p className="text-xs leading-relaxed text-gray-600">
                      Serving youth across {sc.woredas} woredas with vocational training, 
                      education support, and volunteer programs. Active community hubs with 
                      regular workshops and events.
                    </p>
                    <button className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700">
                      <Navigation className="h-3 w-3" />
                      View Programs in {sc.name}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 text-center text-sm text-gray-400">
            No sub-cities found matching "{search}"
          </div>
        )}

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-6 rounded-2xl bg-orange-50 border border-orange-100 px-8 py-5"
        >
          <div className="text-center">
            <p className="text-xl font-bold text-orange-600">11</p>
            <p className="text-xs text-gray-500">Sub-Cities</p>
          </div>
          <div className="h-8 w-px bg-orange-200" />
          <div className="text-center">
            <p className="text-xl font-bold text-orange-600">{TOTAL_WOREDAS}+</p>
            <p className="text-xs text-gray-500">Woredas</p>
          </div>
          <div className="h-8 w-px bg-orange-200" />
          <div className="text-center">
            <p className="text-xl font-bold text-orange-600">400K+</p>
            <p className="text-xs text-gray-500">Youth Served</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-bold text-amber-400">28</p>
            <p className="text-xs text-gray-400">Years Active</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}