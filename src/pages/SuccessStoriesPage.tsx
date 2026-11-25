import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ArrowRight,
  Users,
  Calendar,
  Heart,
  X,
  Maximize2,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Upload,
  CirclePlus,
  Save,
  CircleAlert,
  CircleCheck,
  Link,
  ExternalLink,
  FileText,
  Camera,
  Download,
  Lock,
  Shield,
  LogIn,
  LogOut,
  MapPin,
  Globe,
  ImagePlus,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { LeadershipQuote, GalleryPhoto, SuccessStory } from "../types";
import {
  LEADERSHIP_SPOTLIGHT,
  ANNIVERSARY_GALLERY,
  SUCCESS_STORIES,
  ORG_NAME,
  ORG_SHORT,
} from "../constants";

const STORAGE_KEYS = {
  leadership: "aaya_leadership_spotlight",
  gallery: "aaya_gallery",
  stories: "aaya_success_stories",
  adminAuth: "aaya_admin_auth",
} as const;

const ADMIN_PASSWORD = "admin123";

function useLocalStorage<T>(key: string, initial: T) {
  const [data, setData] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      toast.error("Failed to save data to localStorage");
    }
  }, [key, data]);

  return [data, setData] as const;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/* ─────────────── Admin Auth Modal ─────────────── */

function AdminAuthModal({
  onAuth,
  onClose,
}: {
  onAuth: () => void;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onAuth();
      toast.success("Admin mode activated");
    } else {
      setError("Incorrect password");
      toast.error("Incorrect password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-gray-900">Admin Access</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm transition-all"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <CircleAlert className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
          >
            <LogIn className="w-4 h-4 inline mr-1.5" />
            Enter Admin Mode
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Image Upload Modal ─────────────── */

function ImageUploadModal({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (preview) {
      onSelect(preview);
    } else if (urlInput.trim()) {
      onSelect(urlInput.trim());
    } else {
      toast.error("Please select an image or enter a URL");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-gray-900">Upload Image</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload from device
            </label>
            <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all">
              <Upload className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">
                Click to browse files
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400">
              <span className="bg-white px-2">or paste URL</span>
            </div>
          </div>

          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
          />

          {preview && (
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!preview && !urlInput.trim()}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors text-sm"
          >
            <CircleCheck className="w-4 h-4 inline mr-1.5" />
            Confirm Image
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Edit Modal ─────────────── */

function EditModal({
  title,
  fields,
  initial,
  onSave,
  onClose,
}: {
  title: string;
  fields: { key: string; label: string; type?: string; multiline?: boolean }[];
  initial: Record<string, string>;
  onSave: (data: Record<string, string>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    toast.success("Saved successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm resize-none transition-all"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm transition-all"
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
            >
              <Save className="w-4 h-4 inline mr-1.5" />
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Image Gallery Modal (Lightbox) ─────────────── */

/* ──────────────── Story Editor Modal (with photo + location + category) ──────────────── */

const STORY_CATEGORIES = [
  "Education",
  "Employment",
  "Health & Wellness",
  "Business & Entrepreneurship",
  "Community Service",
  "Arts & Culture",
  "Sports & Recreation",
  "Other",
] as const;

function StoryEditorModal({
  title,
  initial,
  onSave,
  onClose,
}: {
  title: string;
  initial: { name: string; title: string; story: string; image: string; location: string; category: string };
  onSave: (data: { name: string; title: string; story: string; image: string; location: string; category: string }) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [preview, setPreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPreview(dataUrl);
      setForm((prev) => ({ ...prev, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleUrlConfirm = () => {
    if (urlInput.trim()) {
      setForm((prev) => ({ ...prev, image: urlInput.trim() }));
      setPreview(urlInput.trim());
      setUrlInput("");
      toast.success("Image URL added");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    toast.success("Saved successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-3.5 h-3.5 inline mr-1" />
              Photo
            </label>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Story"
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-amber-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-sm ring-2 ring-amber-100">
                    <ImagePlus className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all text-sm text-gray-500">
                  <Upload className="w-4 h-4" />
                  Upload from device
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Or paste image URL..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleUrlConfirm}
                    disabled={!urlInput.trim()}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 disabled:bg-gray-100 disabled:text-gray-400 text-amber-700 rounded-lg transition-colors text-sm"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm transition-all"
              placeholder="Full name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm transition-all"
              placeholder="e.g. Youth Leader, Entrepreneur"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm transition-all"
              placeholder="e.g. Addis Ababa, Ethiopia"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Globe className="w-3.5 h-3.5 inline mr-1" />
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm transition-all bg-white"
            >
              <option value="">Select a category...</option>
              {STORY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Story */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story</label>
            <textarea
              value={form.story}
              onChange={(e) => handleChange("story", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm resize-none transition-all"
              placeholder="Share their success story..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
            >
              <Save className="w-4 h-4 inline mr-1.5" />
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────── Image Gallery Modal (Lightbox) ──────────────── */

function GalleryLightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];
  if (!photo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={photo.image}
          alt={photo.caption || "Gallery photo"}
          className="w-full max-h-[70vh] object-contain rounded-xl"
        />
        {photo.caption && (
          <p className="text-white/80 text-center mt-3 text-sm">
            {photo.caption}
          </p>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="text-white/80 hover:text-white disabled:opacity-30 transition-colors text-sm font-medium"
          >
            ← Previous
          </button>
          <span className="text-white/60 text-sm">
            {index + 1} / {photos.length}
          </span>
          <button
            onClick={onNext}
            disabled={index === photos.length - 1}
            className="text-white/80 hover:text-white disabled:opacity-30 transition-colors text-sm font-medium"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Main Page ─────────────── */

interface SuccessStoriesPageProps {
  onVolunteer?: () => void;
}

export default function SuccessStoriesPage({ onVolunteer }: SuccessStoriesPageProps) {
  const navigate = useNavigate();

  const [leadership, setLeadership] = useLocalStorage<LeadershipQuote[]>(
    STORAGE_KEYS.leadership,
    LEADERSHIP_SPOTLIGHT
  );
  const [gallery, setGallery] = useLocalStorage<GalleryPhoto[]>(
    STORAGE_KEYS.gallery,
    ANNIVERSARY_GALLERY
  );
  const [stories, setStories] = useLocalStorage<SuccessStory[]>(
    STORAGE_KEYS.stories,
    SUCCESS_STORIES
  );

  const [adminMode, setAdminMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState<number | null>(null);

  // Edit modals
  const [editLeadership, setEditLeadership] = useState<{
    index: number;
    data: LeadershipQuote;
  } | null>(null);
  const [editStory, setEditStory] = useState<{
    index: number;
    data: SuccessStory;
  } | null>(null);
  const [editGalleryPhoto, setEditGalleryPhoto] = useState<{
    index: number;
    data: GalleryPhoto;
  } | null>(null);

  // Image upload modals
  const [imageUploadFor, setImageUploadFor] = useState<{
    target: "leadership" | "gallery" | "story";
    index?: number;
  } | null>(null);

  const [addLeadershipOpen, setAddLeadershipOpen] = useState(false);
  const [addStoryOpen, setAddStoryOpen] = useState(false);
  const [addGalleryOpen, setAddGalleryOpen] = useState(false);

  const handleAdminAuth = () => {
    setAdminMode(true);
    setShowAuth(false);
  };

  const handleAdminLogout = () => {
    setAdminMode(false);
    toast.success("Admin mode deactivated");
  };

  /* ── Leadership CRUD ── */

  const handleSaveLeadership = (index: number, data: Record<string, string>) => {
    setLeadership((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        name: data.name || next[index].name,
        title: data.title || data.role || next[index].title,
        quote: data.quote || next[index].quote,
        image: data.image || next[index].image,
        badge: data.badge || next[index].badge,
      };
      return next;
    });
    setEditLeadership(null);
  };

  const handleAddLeadership = (data: Record<string, string>) => {
    const newItem: LeadershipQuote = {
      id: generateId(),
      name: data.name || "New Leader",
      title: data.title || data.role || "Member",
      quote: data.quote || "Share your leadership quote...",
      image: "",
      badge: data.badge || "",
      year: data.year || "",
      isUserGenerated: true,
      timestamp: Date.now(),
    };
    setLeadership((prev) => [newItem, ...prev]);
    setAddLeadershipOpen(false);
    toast.success("Leadership card added");
  };

  const handleDeleteLeadership = (index: number) => {
    setLeadership((prev) => prev.filter((_, i) => i !== index));
    toast.success("Leadership card removed");
  };

  /* ── Gallery CRUD ── */

  const handleSaveGalleryPhoto = (index: number, data: Record<string, string>) => {
    setGallery((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        caption: data.caption || next[index].caption,
        image: data.image || next[index].image,
      };
      return next;
    });
    setEditGalleryPhoto(null);
  };

  const handleAddGalleryPhoto = (data: Record<string, string>) => {
    const newItem: GalleryPhoto = {
      id: generateId(),
      image: data.image || "/placeholder.jpg",
      caption: data.caption || "",
      isUserGenerated: true,
      timestamp: Date.now(),
    };
    setGallery((prev) => [newItem, ...prev]);
    setAddGalleryOpen(false);
    toast.success("Photo added to gallery");
  };

  const handleDeleteGalleryPhoto = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    toast.success("Photo removed from gallery");
  };

  /* ── Stories CRUD ── */

  const handleSaveStory = (index: number, data: Record<string, string>) => {
    setStories((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        name: data.name || next[index].name,
        title: data.title || data.role || next[index].title,
        story: data.story || next[index].story,
        image: data.image || next[index].image,
        location: data.location || next[index].location,
        category: data.category || next[index].category,
      };
      return next;
    });
    setEditStory(null);
  };

  const handleAddStory = (data: Record<string, string>) => {
    const newItem: SuccessStory = {
      id: generateId(),
      name: data.name || "New Member",
      title: data.title || data.role || "Member",
      story: data.story || "Share your success story...",
      image: data.image || "",
      location: data.location || "",
      category: data.category || "",
      isUserGenerated: true,
      timestamp: Date.now(),
    };
    setStories((prev) => [newItem, ...prev]);
    setAddStoryOpen(false);
    toast.success("Success story added");
  };

  const handleDeleteStory = (index: number) => {
    setStories((prev) => prev.filter((_, i) => i !== index));
    toast.success("Story removed");
  };

  /* ── Image Upload Handler ── */

  const handleImageSelect = (url: string) => {
    if (!imageUploadFor) return;
    const { target, index } = imageUploadFor;

    if (target === "leadership" && index !== undefined) {
      setLeadership((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], image: url };
        return next;
      });
    } else if (target === "gallery" && index !== undefined) {
      setGallery((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], image: url };
        return next;
      });
    } else if (target === "story" && index !== undefined) {
      setStories((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], image: url };
        return next;
      });
    }

    setImageUploadFor(null);
    toast.success("Image updated");
  };

  const handleExportData = () => {
    const exportData = {
      leadership,
      gallery,
      stories,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ORG_SHORT.toLowerCase()}_data_export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Data exported");
  };

  /* ── Render ── */

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30">
      {/* Admin Bar */}
      <AnimatePresence>
        {adminMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sticky top-0 z-40 bg-amber-900 text-white overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-300" />
                <span className="font-medium">Admin Mode Active</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1 px-3 py-1 bg-amber-700/50 hover:bg-amber-600 rounded-lg transition-colors text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Data
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600/50 hover:bg-red-500 rounded-lg transition-colors text-xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Exit Admin
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 text-amber-200 mb-4">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Success Stories
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Celebrating Our{" "}
                <span className="text-amber-300">Community Impact</span>
              </h1>
              <p className="text-lg text-amber-100/90 max-w-xl">
                Real stories of transformation from the youth of Addis Ababa.
                Every journey inspires another.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setShowAuth(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all text-sm"
            >
              {adminMode ? (
                <>
                  <Lock className="w-4 h-4" />
                  Admin
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Admin
                </>
              )}
            </motion.button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        {/* ──────── Leadership Spotlight ──────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-700 mb-1">
                <Star className="w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Leadership Spotlight
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Inspiring voices shaping our community
              </p>
            </div>
            {adminMode && (
              <button
                onClick={() => setAddLeadershipOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm"
              >
                <CirclePlus className="w-4 h-4" />
                Add
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {leadership.map((person, idx) => (
                <motion.div
                  key={person.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                >
                  {adminMode && (
                    <div className="absolute top-3 right-3 flex gap-1 z-10">
                      <button
                        onClick={() => setEditLeadership({ index: idx, data: person })}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-amber-50 text-gray-500 hover:text-amber-700 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLeadership(idx)}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setImageUploadFor({ target: "leadership", index: idx })}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      {person.image ? (
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-100"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-sm ring-2 ring-amber-100">
                          {getInitials(person.name)}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5">
                        <Quote className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate flex items-center gap-1">
                        {person.name}
                        {person.badge && (
                          <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-medium">
                            {person.badge}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">{person.title}</p>
                    </div>
                  </div>
                  <blockquote className="mt-4 text-gray-600 text-sm leading-relaxed italic border-l-2 border-amber-200 pl-3">
                    &ldquo;{person.quote}&rdquo;
                  </blockquote>
                  {person.isUserGenerated && person.timestamp && (
                    <p className="mt-2 text-[10px] text-gray-400">
                      Added {formatDate(person.timestamp)}
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ──────── Anniversary Gallery ──────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-700 mb-1">
                <ImageIcon className="w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  10th Anniversary Gallery
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Moments from our decade of impact
              </p>
            </div>
            {adminMode && (
              <button
                onClick={() => setAddGalleryOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm"
              >
                <CirclePlus className="w-4 h-4" />
                Add Photo
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {gallery.map((photo, idx) => (
                <motion.div
                  key={photo.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm cursor-pointer"
                  onClick={() => setGalleryLightboxIndex(idx)}
                >
                  <img
                    src={photo.image}
                    alt={photo.caption || "Gallery photo"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.caption || "Untitled"}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-1">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {adminMode && (
                    <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditGalleryPhoto({ index: idx, data: photo });
                        }}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-amber-50 text-gray-500 hover:text-amber-700 transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageUploadFor({ target: "gallery", index: idx });
                        }}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGalleryPhoto(idx);
                        }}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ──────── Success Stories ──────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-700 mb-1">
                <Heart className="w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Success Stories
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Real journeys of growth and achievement
              </p>
            </div>
            {adminMode && (
              <button
                onClick={() => setAddStoryOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm"
              >
                <CirclePlus className="w-4 h-4" />
                Add Story
              </button>
            )}
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {stories.map((story, idx) => (
                <motion.div
                  key={story.id || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                >
                  {adminMode && (
                    <div className="absolute top-4 right-4 flex gap-1 z-10">
                      <button
                        onClick={() => setEditStory({ index: idx, data: story })}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-amber-50 text-gray-500 hover:text-amber-700 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setImageUploadFor({ target: "story", index: idx })}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStory(idx)}
                        className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      {story.image ? (
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover ring-2 ring-amber-100"
                        />
                      ) : (
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-lg ring-2 ring-amber-100">
                          {getInitials(story.name)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {story.name}
                        </h3>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {story.title}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {story.story}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        {story.isUserGenerated && story.timestamp && (
                          <span className="text-[10px] text-gray-400">
                            Added {formatDate(story.timestamp)}
                          </span>
                        )}
                        <button
                          onClick={() => navigate("/join")}
                          className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 text-sm font-medium transition-colors"
                        >
                          Read their story
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ──────── Bottom CTA ──────── */}
        <section className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Share Your Story
            </h2>
            <p className="text-gray-500 mb-6">
              Your journey can inspire others in our community.
              {adminMode
                ? " Use the Admin tools above to add your story."
                : " Contact us to share your experience."}
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-amber-200"
            >
              <FileText className="w-4 h-4" />
              Get Involved
            </button>
          </motion.div>
        </section>
      </div>

      {/* ──────── Mobile Admin FAB ──────── */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        {adminMode ? (
          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-medium">Exit</span>
          </button>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="flex items-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span className="text-xs font-medium">Admin</span>
          </button>
        )}
      </div>

      {/* ──────── Modals ──────── */}

      <AnimatePresence>
        {showAuth && (
          <AdminAuthModal onAuth={handleAdminAuth} onClose={() => setShowAuth(false)} />
        )}

        {imageUploadFor && (
          <ImageUploadModal
            onSelect={handleImageSelect}
            onClose={() => setImageUploadFor(null)}
          />
        )}

        {editLeadership && (
          <EditModal
            title="Edit Leadership Card"
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "quote", label: "Quote", multiline: true },
              { key: "badge", label: "Badge (optional)" },
            ]}
            initial={{
              name: editLeadership.data.name,
              title: editLeadership.data.title,
              quote: editLeadership.data.quote,
              badge: editLeadership.data.badge || "",
            }}
            onSave={(data) => handleSaveLeadership(editLeadership.index, data)}
            onClose={() => setEditLeadership(null)}
          />
        )}

        {addLeadershipOpen && (
          <EditModal
            title="Add Leadership Card"
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "quote", label: "Quote", multiline: true },
              { key: "badge", label: "Badge (optional)" },
            ]}
            initial={{ name: "", role: "", quote: "", badge: "" }}
            onSave={handleAddLeadership}
            onClose={() => setAddLeadershipOpen(false)}
          />
        )}

        {editGalleryPhoto && (
          <EditModal
            title="Edit Photo Caption"
            fields={[
              { key: "caption", label: "Caption" },
            ]}
            initial={{ caption: editGalleryPhoto.data.caption || "" }}
            onSave={(data) => handleSaveGalleryPhoto(editGalleryPhoto.index, data)}
            onClose={() => setEditGalleryPhoto(null)}
          />
        )}

        {addGalleryOpen && (
          <EditModal
            title="Add Gallery Photo"
            fields={[
              { key: "url", label: "Image URL" },
              { key: "caption", label: "Caption" },
            ]}
            initial={{ url: "", caption: "" }}
            onSave={handleAddGalleryPhoto}
            onClose={() => setAddGalleryOpen(false)}
          />
        )}

        {editStory && (
          <StoryEditorModal
            title="Edit Success Story"
            initial={{
              name: editStory.data.name,
              title: editStory.data.title,
              story: editStory.data.story,
              image: editStory.data.image || "",
              location: editStory.data.location || "",
              category: editStory.data.category || "",
            }}
            onSave={(data) => handleSaveStory(editStory.index, data)}
            onClose={() => setEditStory(null)}
          />
        )}

        {addStoryOpen && (
          <StoryEditorModal
            title="Add Success Story"
            initial={{
              name: "",
              title: "",
              story: "",
              image: "",
              location: "",
              category: "",
            }}
            onSave={handleAddStory}
            onClose={() => setAddStoryOpen(false)}
          />
        )}

        {galleryLightboxIndex !== null && (
          <GalleryLightbox
            photos={gallery}
            index={galleryLightboxIndex}
            onClose={() => setGalleryLightboxIndex(null)}
            onPrev={() =>
              setGalleryLightboxIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : prev
              )
            }
            onNext={() =>
              setGalleryLightboxIndex((prev) =>
                prev !== null && prev < gallery.length - 1 ? prev + 1 : prev
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}