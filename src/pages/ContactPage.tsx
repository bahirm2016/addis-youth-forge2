import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Check, Facebook, MessageSquare } from "lucide-react";
import { ORG_NAME, PHONE_1, PHONE_2, EMAIL, FACEBOOK, OFFICE_LOCATION, OFFICE_HOURS } from "@/constants";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Your message has been sent! We'll respond within 24 hours.");
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
            <h2 className="text-2xl font-bold text-[#1E1610]">Message Sent!</h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Thank you for reaching out. Our team will review your message and respond within 24 hours.
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
            Contact Us
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-bold text-white sm:text-5xl">
            We're Here to <span className="text-amber-400">Help</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base text-gray-400">
            Have a question, suggestion, or want to learn more? Reach out — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-[#1E1610]">Get in Touch</h2>
              <p className="mt-2 text-sm text-gray-500">
                Our team is available during office hours to answer your questions.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <Phone className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E1610]">Phone</p>
                    <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="text-sm text-gray-500 hover:text-amber-600">{PHONE_1}</a>
                    <br />
                    <a href={`tel:${PHONE_2.replace(/\s/g, "")}`} className="text-sm text-gray-500 hover:text-amber-600">{PHONE_2}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <Mail className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E1610]">Email</p>
                    <a href={`mailto:${EMAIL}`} className="text-sm text-gray-500 hover:text-amber-600">{EMAIL}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E1610]">Office Location</p>
                    <p className="text-sm text-gray-500">{OFFICE_LOCATION}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E1610]">Office Hours</p>
                    <p className="text-sm text-gray-500">{OFFICE_HOURS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <Facebook className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E1610]">Facebook</p>
                    <a href={`https://facebook.com/${FACEBOOK}`} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-amber-600">@{FACEBOOK}</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <MessageSquare className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1E1610]">Send a Message</h3>
                    <p className="text-xs text-gray-500">We'll respond within 24 hours</p>
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
                      <label className="mb-1 block text-xs font-medium text-gray-700">Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="+251 9XX XXX XXX" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">Subject</label>
                      <input type="text" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="How can we help?" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Message *</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" placeholder="Tell us more..." />
                  </div>
                  <button type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-orange-600/30 hover:scale-[1.02] active:scale-95">
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}