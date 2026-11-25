import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Check, Globe, Users, Hand } from "lucide-react";
import { toast } from "sonner";
import { ORG_NAME, SUB_CITIES } from "@/constants";

export default function GetInvolvedPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", subCity: "",
    interest: "general", availability: "weekends", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Thank you for your interest! We'll be in touch soon.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-24">
        <section className="flex min-h-[60vh] items-center justify-center bg-[#FAF6F0] px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E1610]">Thank You!</h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Your volunteer application has been received. Our team will contact you within 48 hours 
              with opportunities matching your interests.
            </p>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E1610] via-[#2A1F18] to-[#1E1610] py-20">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300">
            Get Involved
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-white sm:text-5xl">
            Make a <span className="text-amber-400">Difference</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base text-gray-400">
            Whether you're in Addis Ababa or joining from abroad, there are countless ways to support 
            {ORG_NAME}'s mission and empower Ethiopian youth.
          </motion.p>
        </div>
      </section>

      {/* Pathways */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <Hand className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1E1610]">Volunteer Locally</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Join our on-the-ground programs across Addis Ababa's 11 sub-cities. 
                Tutoring, health campaigns, environmental action, and more.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1E1610]">Volunteer Remotely</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Can't be in Addis? Support from anywhere — online tutoring, fundraising, 
                content creation, research, and administrative support.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1E1610]">Partner With Us</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Organizations, businesses, and institutions can partner with AAYA to 
                amplify impact through sponsorship, training, and resources.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="bg-[#FAF6F0] py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <Heart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E1610]">Volunteer Application</h3>
                <p className="text-xs text-gray-500">Tell us about yourself and how you'd like to help</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="+251 9XX XXX XXX" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Sub-City</label>
                  <select value={form.subCity} onChange={(e) => setForm({...form, subCity: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option value="">Select Sub-City</option>
                    {SUB_CITIES.map((sc) => <option key={sc.name} value={sc.name}>{sc.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Interest Area</label>
                  <select value={form.interest} onChange={(e) => setForm({...form, interest: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option value="general">General Volunteering</option>
                    <option value="education">Education & Tutoring</option>
                    <option value="health">Health Campaigns</option>
                    <option value="environment">Environmental Action</option>
                    <option value="tech">Digital Literacy & Tech</option>
                    <option value="events">Events & Outreach</option>
                    <option value="remote">Remote/Online Support</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Availability</label>
                  <select value={form.availability} onChange={(e) => setForm({...form, availability: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option value="weekends">Weekends</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="evenings">Evenings</option>
                    <option value="fulltime">Full-Time</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Message / Questions</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Tell us about your skills, experience, or questions..." />
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