import HeroSlider from "@/components/HeroSlider";
import ProblemSolution from "@/components/ProblemSolution";
import ImpactStats from "@/components/ImpactStats";
import LeadershipSpotlight from "@/components/LeadershipSpotlight";
import SubCityNetwork from "@/components/SubCityNetwork";
import type { CustomSlide, PageId, SectionPhotoData } from "@/types";

interface HomePageProps {
  onVolunteer: () => void;
  onNavigate: (page: PageId) => void;
  slides?: CustomSlide[];
  sectionPhotos?: SectionPhotoData;
  onEditSlides?: () => void;
  onEditPhotos?: () => void;
}

export default function HomePage({ onVolunteer, onNavigate, slides, sectionPhotos, onEditSlides, onEditPhotos }: HomePageProps) {
  return (
    <main className="bg-white">
      <HeroSlider onVolunteer={onVolunteer} onNavigate={onNavigate} slides={slides} onEditSlides={onEditSlides} />
      <div className="bg-white">
        <ProblemSolution />
      </div>
      <div className="bg-white">
        <ImpactStats />
      </div>
      <div className="bg-white">
        <LeadershipSpotlight />
      </div>
      <div className="bg-white">
        <SubCityNetwork />
      </div>
    </main>
  );
}