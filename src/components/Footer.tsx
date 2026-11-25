import { Phone, Mail, MapPin, Facebook, Clock, Heart, ChevronRight } from "lucide-react";
import { ORG_NAME, PHONE_1, PHONE_2, EMAIL, FACEBOOK, OFFICE_LOCATION, OFFICE_HOURS, NAV_LINKS, ORG_SHORT } from "@/constants";
import type { PageId } from "@/types";

interface FooterProps {
  onNavigate: (page: PageId) => void;
  logoUrl: string | null;
}

export default function Footer({ onNavigate, logoUrl }: FooterProps) {
  return (
    <footer className="relative bg-[#1E1610] text-gray-300">
      {/* Top wave accent */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-9 w-9 rounded-lg object-contain"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-xs font-bold text-white">
                  A
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-white">{ORG_NAME}</p>
                <p className="text-[10px] text-amber-400/70">Empowering Youth Since 1998</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              A registered Ethiopian civic society organization (Reg #0471) dedicated to empowering 400,000+ youth
              across 11 sub-cities and 119+ woredas of Addis Ababa.
            </p>
            <div className="flex gap-3">
              <a href={`https://facebook.com/${FACEBOOK}`} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-blue-400 transition-colors hover:bg-blue-600/20 hover:text-blue-300">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-amber-400"
                  >
                    <ChevronRight className="h-3 w-3 text-amber-500" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <div className="text-sm text-gray-400">
                  <p>{PHONE_1}</p>
                  <p>{PHONE_2}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <a href={`mailto:${EMAIL}`} className="text-sm text-gray-400 hover:text-amber-400">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm text-gray-400">{OFFICE_LOCATION}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm text-gray-400">{OFFICE_HOURS}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="rounded-xl bg-white/5 p-5">
            <Heart className="mb-3 h-6 w-6 text-amber-400" />
            <h4 className="mb-2 text-sm font-semibold text-white">Support Our Mission</h4>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              Your contribution empowers thousands of Ethiopian youth with skills, education, and opportunity.
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-orange-600/30 hover:scale-[1.02] active:scale-95"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {ORG_NAME}. All rights reserved. Registered under the {REG_AUTHORITY}.</p>
        </div>
      </div>
    </footer>
  );
}

// Helper for the reg constant
import { REG_AUTHORITY } from "@/constants";