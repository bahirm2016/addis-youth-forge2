import { useState, useEffect, useCallback } from "react";
import type { CustomBranding, CustomSlide, SectionPhotoData } from "@/types";
import { DEFAULT_HERO_SLIDES } from "@/constants";

const BRANDING_KEY = "aaya_custom_branding";
const SLIDES_KEY = "aaya_custom_slides";
const SECTION_PHOTOS_KEY = "aaya_section_photos";

function loadBranding(): CustomBranding {
  try {
    const raw = localStorage.getItem(BRANDING_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { logoUrl: null, updatedAt: 0 };
}

function loadSlides(): CustomSlide[] {
  try {
    const raw = localStorage.getItem(SLIDES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_HERO_SLIDES;
}

function loadSectionPhotos(): SectionPhotoData {
  try {
    const raw = localStorage.getItem(SECTION_PHOTOS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    heroImage: null,
    problemSolutionImage: null,
    impactStatsImage: null,
    subCityNetworkImage: null,
    leadershipSpotlightImage: null,
    updatedAt: 0,
  };
}

export function useBranding() {
  const [branding, setBrandingState] = useState<CustomBranding>(loadBranding);
  const [slides, setSlidesState] = useState<CustomSlide[]>(loadSlides);
  const [sectionPhotos, setSectionPhotosState] = useState<SectionPhotoData>(loadSectionPhotos);

  useEffect(() => {
    localStorage.setItem(BRANDING_KEY, JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    localStorage.setItem(SLIDES_KEY, JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem(SECTION_PHOTOS_KEY, JSON.stringify(sectionPhotos));
  }, [sectionPhotos]);

  const setLogo = useCallback((logoUrl: string | null) => {
    setBrandingState((prev) => ({ logoUrl, updatedAt: Date.now() }));
  }, []);

  const updateSlide = useCallback((id: string, data: Partial<CustomSlide>) => {
    setSlidesState((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data, isCustom: true } : s))
    );
  }, []);

  const addSlide = useCallback((slide: Omit<CustomSlide, "id" | "isCustom">) => {
    const newSlide: CustomSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
      isCustom: true,
    };
    setSlidesState((prev) => [...prev, newSlide]);
  }, []);

  const removeSlide = useCallback((id: string) => {
    setSlidesState((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const reorderSlides = useCallback((fromIndex: number, toIndex: number) => {
    setSlidesState((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const resetSlides = useCallback(() => {
    setSlidesState(DEFAULT_HERO_SLIDES);
  }, []);

  const resetLogo = useCallback(() => {
    setLogo(null);
  }, [setLogo]);

  const setSectionPhoto = useCallback((key: keyof Omit<SectionPhotoData, "updatedAt">, url: string | null) => {
    setSectionPhotosState((prev) => ({ ...prev, [key]: url, updatedAt: Date.now() }));
  }, []);

  const resetSectionPhotos = useCallback(() => {
    setSectionPhotosState({
      heroImage: null,
      problemSolutionImage: null,
      impactStatsImage: null,
      subCityNetworkImage: null,
      leadershipSpotlightImage: null,
      updatedAt: Date.now(),
    });
  }, []);

  return {
    branding,
    slides,
    sectionPhotos,
    setLogo,
    updateSlide,
    addSlide,
    removeSlide,
    reorderSlides,
    resetSlides,
    resetLogo,
    setSectionPhoto,
    resetSectionPhotos,
  };
}