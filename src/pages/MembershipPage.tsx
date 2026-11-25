import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, UserPlus, Users, Shield } from "lucide-react";
import { SUB_CITIES, ORG_NAME } from "@/constants";
import { toast } from "sonner";

export default function MembershipPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", dateOfBirth: "",
    subCity: "", woreda: "", education: "", skills: "", reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Membership application submitted! Welcome to AAYA.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-24">
        <section className="flex min-h-[60vh] items-center justify-center bg-[#FAF6F0] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E1610]">Welcome to AAYA!</h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Your membership application has been received. Our team will contact you within 48 hours 
              with next steps to activate your membership.
            </p>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E1610] via-[#2A1F18] to-[#1E1610] py-20">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300"
          >
            Join Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-white sm:text-5xl"
          >
            Become a <span className="text-amber-400">Member</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base text-gray-400"
          >
            Join 400,000+ youth already shaping their futures with {ORG_NAME}. Membership is free and open to all youth in Addis Ababa.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg shadow-gray-100/50">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <UserPlus className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E1610]">Membership Application</h3>
                <p className="text-xs text-gray-500">All fields marked with * are required</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Your full name" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Date of Birth</label>
                  <input type="date" value={form.dateOfBirth} onChange={(e) => setForm({...form, dateOfBirth: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="+251 9XX XXX XXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Sub-City</label>
                  <select value={form.subCity} onChange={(e) => setForm({...form, subCity: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option value="">Select Sub-City</option>
                    {SUB_CITIES.map((sc) => <option key={sc.name} value={sc.name}>{sc.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Woreda</label>
                  <input type="text" value={form.woreda} onChange={(e) => setForm({...form, woreda: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="e.g. Woreda 03" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Education Level</label>
                <select value={form.education} onChange={(e) => setForm({...form, education: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                  <option value="">Select</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="preparatory">Preparatory</option>
                  <option value="vocational">Vocational/TVET</option>
                  <option value="university">University</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Skills / Interests</label>
                <input type="text" value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="e.g. Coding, Sports, Art, Leadership" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Why do you want to join AAYA?</label>
                <textarea rows={3} value={form.reason} onChange={(e) => setForm({...form, reason: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Tell us about yourself..." />
              </div>
              <button type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-orange-600/30 hover:scale-[1.02] active:scale-95">
                <Send className="h-4 w-4" />
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}