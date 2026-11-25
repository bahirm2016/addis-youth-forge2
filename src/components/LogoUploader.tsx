import { useState, useRef, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, Link, RotateCcw, X, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface LogoUploaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLogoUrl: string | null;
  onSave: (url: string | null) => void;
  onReset: () => void;
}

export default function LogoUploader({
  open,
  onOpenChange,
  currentLogoUrl,
  onSave,
  onReset,
}: LogoUploaderProps) {
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 2MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUrl = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a valid image URL.");
      return;
    }
    setPreviewUrl(urlInput.trim());
  };

  const handleSave = () => {
    if (previewUrl) {
      onSave(previewUrl);
      toast.success("Logo updated successfully!");
    }
    onOpenChange(false);
  };

  const handleReset = () => {
    setPreviewUrl(null);
    onReset();
    onOpenChange(false);
    toast.success("Logo reset to default.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Logo</DialogTitle>
          <DialogDescription>
            Upload a new logo image or paste an image URL.
          </DialogDescription>
        </DialogHeader>

        {/* Preview */}
        <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 p-6">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Logo preview"
              className="max-h-24 max-w-full rounded-lg object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-amber-400/50">
              <ImageIcon className="h-10 w-10" />
              <p className="text-xs">No logo set</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg bg-amber-500/10 p-1">
          <button
            onClick={() => setTab("upload")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              tab === "upload"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-amber-400/70 hover:text-amber-400"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            Upload
          </button>
          <button
            onClick={() => setTab("url")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              tab === "url"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-amber-400/70 hover:text-amber-400"
            }`}
          >
            <Link className="h-3.5 w-3.5" />
            URL
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "upload" ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 px-4 py-6 text-sm text-amber-400 transition-colors hover:border-amber-500/50 hover:bg-amber-500/10"
              >
                <Upload className="h-5 w-5" />
                Click to upload image (max 2MB)
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="url"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex gap-2"
            >
              <input
                type="url"
                placeholder="https://example.com/logo.png"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 rounded-lg border border-amber-500/20 bg-[#1E1610] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-amber-500/40 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleUrl()}
              />
              <button
                onClick={handleUrl}
                className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-amber-600"
              >
                <Check className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Default
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-gray-400 transition-colors hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleSave}
              disabled={!previewUrl}
              className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:shadow-orange-600/30 disabled:opacity-50"
            >
              Save Logo
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}