import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Heart, Pencil } from "lucide-react";
import { ORG_NAME, NAV_LINKS, PHONE_1, ORG_SHORT } from "@/constants";
import type { PageId } from "@/types";

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onDonate: () => void;
  onVolunteer: () => void;
  logoUrl: string | null;
  onEditLogo: () => void;
  onEditPhotos?: () => void;
}

export default function Header({ activePage, onNavigate, onDonate, onVolunteer, logoUrl, onEditLogo }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top quick info bar */}
      <div className="hidden md:flex h-9 items-center justify-between bg-[#1E1610] px-6 text-xs text-amber-100/80">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3 text-amber-400" />
            {PHONE_1}
          </span>
          <span className="text-amber-600/50">|</span>
          <span>Est. 1998 · Reg #0471</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{ORG_SHORT} — Serving 400,000+ Youth</span>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="relative border-b border-white/10 bg-[#1E1610]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="group relative flex items-center gap-2.5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-9 w-9 rounded-lg object-contain shadow-lg"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-xs font-bold text-white shadow-lg shadow-orange-600/20">
                A
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight text-white">{ORG_NAME}</p>
              <p className="text-[10px] leading-tight text-amber-400/70">Empowering Youth Since 1998</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onEditLogo(); }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white opacity-0 shadow transition-all hover:bg-amber-600 group-hover:opacity-100"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => onNavigate(link.href)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activePage === link.href
                    ? "text-amber-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {activePage === link.href && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-lg bg-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onVolunteer}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-amber-500/30 px-3 py-1.5 text-xs font-medium text-amber-300 transition-all hover:bg-amber-500/10 hover:border-amber-400/50"
            >
              <Heart className="h-3.5 w-3.5" />
              Get Involved
            </button>
            <button
              onClick={onDonate}
              className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:shadow-orange-600/40 hover:scale-105 active:scale-95"
            >
              Donate Now
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="ml-1 rounded-lg p-2 text-gray-300 hover:text-white lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-[#1E1610]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    onNavigate(link.href);
                    setMobileOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    activePage === link.href
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-white/10 pt-2">
                <button
                  onClick={() => { onVolunteer(); setMobileOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-amber-300 hover:bg-amber-500/10"
                >
                  <Heart className="h-4 w-4" />
                  Get Involved
                </button>
                <button
                  onClick={() => { onDonate(); setMobileOpen(false); }}
                  className="mt-1 w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2.5 text-sm font-bold text-white"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}