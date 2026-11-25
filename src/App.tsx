import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VolunteerDonateModal from "@/components/VolunteerDonateModal";
import LogoUploader from "@/components/LogoUploader";
import SlideEditor from "@/components/SlideEditor";
import PhotoUploaderModal from "@/components/PhotoUploaderModal";
import { useBranding } from "@/hooks/useBranding";
import HomePage from "@/pages/HomePage";
import AboutUsPage from "@/pages/AboutUsPage";
import ProgramAreasPage from "@/pages/ProgramAreasPage";
import SuccessStoriesPage from "@/pages/SuccessStoriesPage";
import MembershipPage from "@/pages/MembershipPage";
import ContactPage from "@/pages/ContactPage";
import type { PageId } from "@/types";

function pageVariants() {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };
}

function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [modalMode, setModalMode] = useState<"volunteer" | "donate" | null>(null);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [slideEditorOpen, setSlideEditorOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const { branding, slides, sectionPhotos, setLogo, updateSlide, addSlide, removeSlide, reorderSlides, resetSlides, resetLogo, setSectionPhoto, resetSectionPhotos } = useBranding();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const renderPage = () => {
    const page = (
      <motion.div
        key={activePage}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants()}
        transition={{ duration: 0.3 }}
      >
        {activePage === "home" && (
          <HomePage
            onVolunteer={() => setModalMode("volunteer")}
            onNavigate={setActivePage}
            slides={slides}
            sectionPhotos={sectionPhotos}
            onEditSlides={() => setSlideEditorOpen(true)}
            onEditPhotos={() => setPhotoModalOpen(true)}
          />
        )}
        {activePage === "about" && <AboutUsPage />}
        {activePage === "programs" && <ProgramAreasPage />}
        {activePage === "stories" && <SuccessStoriesPage onVolunteer={() => setModalMode("volunteer")} />}
        {activePage === "membership" && <MembershipPage />}
        {activePage === "contact" && <ContactPage />}
      </motion.div>
    );

    return page;
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1E1610",
            color: "#FAF6F0",
            border: "1px solid rgba(251, 191, 36, 0.2)",
          },
        }}
      />

      <Header
        activePage={activePage}
        onNavigate={setActivePage}
        onDonate={() => setModalMode("donate")}
        onVolunteer={() => setModalMode("volunteer")}
        logoUrl={branding?.logoUrl || null}
        onEditLogo={() => setLogoModalOpen(true)}
        onEditPhotos={() => setPhotoModalOpen(true)}
      />

      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>

      <Footer onNavigate={setActivePage} logoUrl={branding?.logoUrl || null} />

      <VolunteerDonateModal
        mode={modalMode}
        onClose={() => setModalMode(null)}
      />

      <LogoUploader
        open={logoModalOpen}
        onOpenChange={setLogoModalOpen}
        currentLogoUrl={branding?.logoUrl || null}
        onSave={(url) => setLogo(url)}
        onReset={() => resetLogo()}
      />

      <SlideEditor
        open={slideEditorOpen}
        onOpenChange={setSlideEditorOpen}
        slides={slides}
        onUpdateSlide={updateSlide}
        onAddSlide={addSlide}
        onRemoveSlide={removeSlide}
        onReorderSlides={reorderSlides}
        onResetSlides={resetSlides}
      />

      <PhotoUploaderModal
        open={photoModalOpen}
        onOpenChange={setPhotoModalOpen}
        slides={slides}
        sectionPhotos={sectionPhotos}
        onUpdateSlide={updateSlide}
        onAddSlide={addSlide}
        onRemoveSlide={removeSlide}
        onReorderSlides={reorderSlides}
        onResetSlides={resetSlides}
        onSetSectionPhoto={setSectionPhoto}
        onResetSectionPhotos={resetSectionPhotos}
      />
    </div>
  );
}

export default App;