import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Upload,
  Link,
  Plus,
  Trash2,
  RotateCcw,
  X,
  Check,
  CloudUpload,
  ImageUp,
  Palette,
  ExternalLink,
  GalleryThumbnails,
  GalleryVertical,
} from "lucide-react";
import { toast } from "sonner";
import type { CustomSlide, SectionPhotoData } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type SectionPhotoKey = keyof Omit<SectionPhotoData, "updatedAt">;

interface PhotoUploaderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: CustomSlide[];
  sectionPhotos: SectionPhotoData;
  onUpdateSlide: (id: string, data: Partial<CustomSlide>) => void;
  onAddSlide: (slide: Omit<CustomSlide, "id" | "isCustom">) => void;
  onRemoveSlide: (id: string) => void;
  onReorderSlides: (fromIndex: number, toIndex: number) => void;
  onResetSlides: () => void;
  onSetSectionPhoto: (key: SectionPhotoKey, url: string | null) => void;
  onResetSectionPhotos: () => void;
}

type TabId = "slides" | "sections";

const SECTION_LABELS: Record<SectionPhotoKey, string> = {
  heroImage: "Hero Slider Overlay",
  problemSolutionImage: "Problem & Solution Section",
  impactStatsImage: "Impact Stats Section",
  subCityNetworkImage: "Sub-City Network Section",
  leadershipSpotlightImage: "Leadership Spotlight Section",
};

const SECTION_DESCRIPTIONS: Record<SectionPhotoKey, string> = {
  heroImage: "Background image tint for the hero slider area",
  problemSolutionImage: "Decorative image for the challenge & response section",
  impactStatsImage: "Background visual for the impact numbers section",
  subCityNetworkImage: "Network map or illustration for sub-city section",
  leadershipSpotlightImage: "Background or accent image for leadership quotes",
};

function ImagePicker({
  label,
  description,
  currentUrl,
  onSave,
  onRemove,
}: {
  label: string;
  description: string;
  currentUrl: string | null;
  onSave: (url: string) => void;
  onRemove: () => void;
}) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSave = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      toast.error("Please enter a valid image URL.");
      return;
    }
    onSave(trimmed);
    setUrlInput("");
    toast.success(`${label} photo updated.`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      onSave(dataUrl);
      toast.success(`${label} photo uploaded.`);
    };
    reader.onerror = () => {
      toast.error("Failed to read file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-white">{label}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      {/* Current preview */}
      {currentUrl && (
        <div className="group relative mb-3 overflow-hidden rounded-lg">
          <img
            src={currentUrl}
            alt={label}
            className="h-28 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=60";
            }}
          />
          <button
            onClick={onRemove}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500/80 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-red-600 group-hover:opacity-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Mode toggle */}
      <div className="mb-3 flex gap-1 rounded-lg bg-[#1E1610] p-0.5">
        <button
          onClick={() => setMode("url")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "url"
              ? "bg-amber-500/20 text-amber-300"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Link className="h-3 w-3" />
          URL
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === "upload"
              ? "bg-amber-500/20 text-amber-300"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <CloudUpload className="h-3 w-3" />
          Upload
        </button>
      </div>

      {mode === "url" ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlSave()}
            placeholder="Paste image URL..."
            className="flex-1 rounded-lg border border-amber-500/20 bg-[#1E1610] px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-amber-500/40 focus:outline-none"
          />
          <button
            onClick={handleUrlSave}
            className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-amber-600"
          >
            <Check className="h-3.5 w-3.5" />
            Set
          </button>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-amber-500/30 bg-amber-500/5 px-4 py-3 text-xs text-amber-300 transition-all hover:border-amber-400/50 hover:bg-amber-500/10"
          >
            <ImageUp className="h-4 w-4" />
            Choose Image (max 5MB)
          </button>
        </div>
      )}
    </div>
  );
}

function SlideThumbnail({
  slide,
  index,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  slide: CustomSlide;
  index: number;
  onUpdate: (id: string, data: Partial<CustomSlide>) => void;
  onRemove: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [editBg, setEditBg] = useState(slide.bg);

  const handleSave = () => {
    if (editBg.trim()) {
      onUpdate(slide.id, { bg: editBg.trim() });
      toast.success("Slide background updated.");
    }
    setEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-amber-500/20"
    >
      <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-amber-500/10">
        <img
          src={editBg}
          alt=""
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=60";
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-white">
          Slide {index + 1}
        </p>
        <p className="truncate text-xs text-gray-400">
          {slide.subtitle} · {slide.cta}
        </p>
      </div>

      {editing ? (
        <div className="flex shrink-0 gap-1">
          <input
            type="text"
            value={editBg}
            onChange={(e) => setEditBg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="w-28 rounded-lg border border-amber-500/20 bg-[#1E1610] px-2 py-1 text-xs text-white focus:border-amber-500/40 focus:outline-none"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="rounded-lg bg-amber-500 p-1.5 text-white"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={() => {
              setEditBg(slide.bg);
              setEditing(false);
            }}
            className="rounded-lg border border-white/10 p-1.5 text-gray-400"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={isFirst ? undefined : onMoveUp}
            disabled={isFirst}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={isLast ? undefined : onMoveDown}
            disabled={isLast}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
          >
            <ImageIcon className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onRemove(slide.id)}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default function PhotoUploaderModal({
  open,
  onOpenChange,
  slides,
  sectionPhotos,
  onUpdateSlide,
  onAddSlide,
  onRemoveSlide,
  onReorderSlides,
  onResetSlides,
  onSetSectionPhoto,
  onResetSectionPhotos,
}: PhotoUploaderModalProps) {
  const [tab, setTab] = useState<TabId>("slides");

  const sectionKeys = Object.keys(SECTION_LABELS) as SectionPhotoKey[];

  const handleAddSlide = () => {
    onAddSlide({
      bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
      subtitle: "New Slide",
      cta: "Learn More",
      cta2: "Get Involved",
    });
    toast.success("New slide added.");
  };

  const handleResetSlides = () => {
    onResetSlides();
    toast.success("Slides reset to defaults.");
  };

  const handleResetSectionPhotos = () => {
    onResetSectionPhotos();
    toast.success("Section photos reset.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-amber-400" />
            Manage Photos
          </DialogTitle>
          <DialogDescription>
            Upload or paste image URLs for hero slides and section backgrounds.
          </DialogDescription>
        </DialogHeader>

        {/* Tab bar */}
        <div className="flex gap-1 rounded-xl bg-[#1E1610] p-1">
          <button
            onClick={() => setTab("slides")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              tab === "slides"
                ? "bg-amber-500/20 text-amber-300 shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <GalleryVertical className="h-3.5 w-3.5" />
            Hero Slides
          </button>
          <button
            onClick={() => setTab("sections")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              tab === "sections"
                ? "bg-amber-500/20 text-amber-300 shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <GalleryThumbnails className="h-3.5 w-3.5" />
            Section Photos
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "slides" ? (
            <motion.div
              key="slides"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero slide management */}
              <div className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {slides.map((slide, i) => (
                    <SlideThumbnail
                      key={slide.id}
                      slide={slide}
                      index={i}
                      onUpdate={onUpdateSlide}
                      onRemove={onRemoveSlide}
                      onMoveUp={() => onReorderSlides(i, i - 1)}
                      onMoveDown={() => onReorderSlides(i, i + 1)}
                      isFirst={i === 0}
                      isLast={i === slides.length - 1}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleResetSlides}
                    className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                  <button
                    onClick={handleAddSlide}
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/10"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Slide
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sections"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
                {sectionKeys.map((key) => (
                  <ImagePicker
                    key={key}
                    label={SECTION_LABELS[key]}
                    description={SECTION_DESCRIPTIONS[key]}
                    currentUrl={sectionPhotos[key]}
                    onSave={(url) => onSetSectionPhoto(key, url)}
                    onRemove={() => onSetSectionPhoto(key, null)}
                  />
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={handleResetSectionPhotos}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset All Section Photos
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:shadow-orange-600/30"
          >
            Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}