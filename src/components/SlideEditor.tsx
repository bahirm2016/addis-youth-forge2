import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical, RotateCcw, X, Check } from "lucide-react";
import { Upload, ImageSquare } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { CustomSlide } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SlideEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: CustomSlide[];
  onUpdateSlide: (id: string, data: Partial<CustomSlide>) => void;
  onAddSlide: (slide: Omit<CustomSlide, "id" | "isCustom">) => void;
  onRemoveSlide: (id: string) => void;
  onReorderSlides: (from: number, to: number) => void;
  onResetSlides: () => void;
}

export default function SlideEditor({
  open,
  onOpenChange,
  slides,
  onUpdateSlide,
  onAddSlide,
  onRemoveSlide,
  onReorderSlides,
  onResetSlides,
}: SlideEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleReset = () => {
    onResetSlides();
    toast.success("Slides reset to defaults.");
  };

  const handleFileUpload = (id: string, file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPEG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploadingId(id);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onUpdateSlide(id, { bg: dataUrl });
      setUploadingId(null);
      toast.success("Photo uploaded successfully.");
    };
    reader.onerror = () => {
      setUploadingId(null);
      toast.error("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    onAddSlide({
      bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
      subtitle: "New Slide",
      cta: "Learn More",
      cta2: "Get Involved",
    });
    toast.success("New slide added.");
  };

  const handleRemove = (id: string) => {
    if (slides.length <= 1) {
      toast.error("You need at least one slide.");
      return;
    }
    onRemoveSlide(id);
    toast.success("Slide removed.");
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    onReorderSlides(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index === slides.length - 1) return;
    onReorderSlides(index, index + 1);
  };

  const SlideCard = ({ slide, index }: { slide: CustomSlide; index: number }) => {
    const isEditing = editingId === slide.id;
    const [editBg, setEditBg] = useState(slide.bg);
    const [editSub, setEditSub] = useState(slide.subtitle);
    const [editCta, setEditCta] = useState(slide.cta);
    const [editCta2, setEditCta2] = useState(slide.cta2);

    const saveEdit = () => {
      onUpdateSlide(slide.id, {
        bg: editBg,
        subtitle: editSub,
        cta: editCta,
        cta2: editCta2,
      });
      setEditingId(null);
      toast.success("Slide updated.");
    };

    const cancelEdit = () => {
      setEditBg(slide.bg);
      setEditSub(slide.subtitle);
      setEditCta(slide.cta);
      setEditCta2(slide.cta2);
      setEditingId(null);
    };

    if (isEditing) {
      return (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
        >
          {/* Image upload zone with preview */}
          <div className="mb-3">
            <div
              onClick={() => document.getElementById(`file-${slide.id}`)?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(slide.id, file);
              }}
              className="group relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-amber-500/20 bg-amber-500/5 transition-all hover:border-amber-400/40"
            >
              <img
                src={editBg}
                alt=""
                className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-30"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=60";
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                {uploadingId === slide.id ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-amber-400/70" weight="duotone" />
                    <span className="text-[10px] font-medium text-amber-300/70">
                      Click or drag to upload
                    </span>
                  </>
                )}
              </div>
              <input
                id={`file-${slide.id}`}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(slide.id, file);
                  e.target.value = "";
                }}
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={editBg}
                  onChange={(e) => setEditBg(e.target.value)}
                  placeholder="Or paste image URL..."
                  className="w-full rounded-lg border border-amber-500/20 bg-[#1E1610] px-2.5 py-1.5 pr-8 text-xs text-white placeholder:text-gray-500 focus:border-amber-500/40 focus:outline-none"
                />
                <ImageSquare className="absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-amber-500/40" weight="duotone" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 block text-[10px] text-amber-400/60">Subtitle</label>
              <input
                type="text"
                value={editSub}
                onChange={(e) => setEditSub(e.target.value)}
                className="w-full rounded-lg border border-amber-500/20 bg-[#1E1610] px-2.5 py-1.5 text-xs text-white focus:border-amber-500/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] text-amber-400/60">CTA Text</label>
              <input
                type="text"
                value={editCta}
                onChange={(e) => setEditCta(e.target.value)}
                className="w-full rounded-lg border border-amber-500/20 bg-[#1E1610] px-2.5 py-1.5 text-xs text-white focus:border-amber-500/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] text-amber-400/60">CTA 2 Text</label>
              <input
                type="text"
                value={editCta2}
                onChange={(e) => setEditCta2(e.target.value)}
                className="w-full rounded-lg border border-amber-500/20 bg-[#1E1610] px-2.5 py-1.5 text-xs text-white focus:border-amber-500/40 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={cancelEdit}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
            <button
              onClick={saveEdit}
              className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-amber-600"
            >
              <Check className="h-3 w-3" />
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8, scale: 0.95 }}
        className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-amber-500/20"
      >
        <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-gray-500 transition-colors group-hover:text-amber-400" />
        <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-amber-500/10">
          <img
            src={slide.bg}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=60";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-white">{slide.subtitle}</p>
          <p className="truncate text-xs text-gray-400">
            {slide.cta} · {slide.cta2}
          </p>
        </div>
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => handleMoveUp(index)}
            disabled={index === 0}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={() => handleMoveDown(index)}
            disabled={index === slides.length - 1}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-20"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              setEditBg(slide.bg);
              setEditSub(slide.subtitle);
              setEditCta(slide.cta);
              setEditCta2(slide.cta2);
              setEditingId(slide.id);
            }}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => handleRemove(slide.id)}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Customize Hero Slides</DialogTitle>
          <DialogDescription>
            Add, edit, reorder, or remove slides. Drag to reorder.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {slides.map((slide, i) => (
              <SlideCard key={slide.id} slide={slide} index={i} />
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/10"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Slide
            </button>
          </div>
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