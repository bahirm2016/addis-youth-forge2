import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Send, CreditCard, Check, Phone, Mail } from "lucide-react";
import { PHONE_1, EMAIL, ORG_NAME } from "@/constants";
import { toast } from "sonner";

interface VolunteerDonateModalProps {
  mode: "volunteer" | "donate" | null;
  onClose: () => void;
}

export default function VolunteerDonateModal({ mode, onClose }: VolunteerDonateModalProps) {
  const [volunteerForm, setVolunteerForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subCity: "",
    interest: "general",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.fullName || !volunteerForm.email || !volunteerForm.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch soon.");
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </button>

            {mode === "volunteer" && !submitted && (
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1610]">Get Involved</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Join thousands of volunteers making a difference across Addis Ababa.
                </p>

                <form onSubmit={handleVolunteerSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      value={volunteerForm.fullName}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, fullName: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">Email *</label>
                      <input
                        type="email"
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">Phone *</label>
                      <input
                        type="tel"
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                        placeholder="+251 9XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">Sub-City</label>
                      <input
                        type="text"
                        value={volunteerForm.subCity}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, subCity: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                        placeholder="e.g. Bole"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">Interest Area</label>
                      <select
                        value={volunteerForm.interest}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, interest: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      >
                        <option value="general">General Volunteering</option>
                        <option value="education">Education & Tutoring</option>
                        <option value="health">Health Campaigns</option>
                        <option value="environment">Environmental Action</option>
                        <option value="tech">Digital Literacy</option>
                        <option value="events">Events & Outreach</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-orange-600/30 hover:scale-[1.02] active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    Submit Application
                  </button>
                </form>

                <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {PHONE_1}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {EMAIL}
                  </span>
                </div>
              </div>
            )}

            {mode === "donate" && !submitted && (
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1610]">Support Our Mission</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your contribution directly funds youth training, education, and community programs.
                </p>

                <div className="mt-6 space-y-3">
                  <p className="text-xs font-medium text-gray-500">Select Amount</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["500 ETB", "1,000 ETB", "2,500 ETB", "5,000 ETB", "10,000 ETB", "Custom"].map((amount) => (
                      <button
                        key={amount}
                        className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label className="mb-1 block text-xs font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                        placeholder="+251 9XX XXX XXX"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      toast.success("Thank you for your generous donation! You'll receive a confirmation shortly.");
                      setSubmitted(true);
                      setTimeout(() => { onClose(); setSubmitted(false); }, 2000);
                    }}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
                  >
                    <Heart className="h-4 w-4" />
                    Donate Now
                  </button>
                </div>
              </div>
            )}

            {submitted && (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1610]">Thank You!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {mode === "volunteer"
                    ? "Your application has been received. Our team will reach out within 48 hours."
                    : "Your generosity will transform lives. A receipt will be sent to your email."}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}