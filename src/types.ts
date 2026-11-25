export type PageId =
  | "home"
  | "about"
  | "programs"
  | "stories"
  | "events"
  | "membership"
  | "contact";

export interface NavLink {
  label: string;
  href: PageId;
}

export interface SubCity {
  name: string;
  woredas: number;
}

export interface ImpactStat {
  label: string;
  value: string;
  icon: string;
}

export interface ProblemSolution {
  problem: string;
  problemDesc: string;
  solution: string;
  solutionDesc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  title: string;
  story: string;
  image: string;
  location?: string;
  category?: string;
  timestamp: number;
  isUserGenerated?: boolean;
}

export interface GalleryPhoto {
  caption: string;
  image: string;
  id?: string;
  timestamp?: number;
  isUserGenerated?: boolean;
}

export interface LeadershipQuote {
  name: string;
  title: string;
  quote: string;
  year: string;
  image?: string;
  badge?: string;
  id?: string;
  isUserGenerated?: boolean;
  timestamp?: number;
}

export interface Program {
  title: string;
  desc: string;
  icon: string;
  highlights: string[];
}

export interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  subCity: string;
  interests: string[];
  availability: string;
  message: string;
}

export interface MembershipFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  subCity: string;
  woreda: string;
  education: string;
  skills: string;
  reason: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: "workshop" | "summit" | "volunteer" | "community" | "seminar" | "fundraiser";
  date: string;
  time: string;
  endDate?: string;
  location: string;
  description: string;
  image: string;
  capacity: number;
  registered: number;
  speakers?: { name: string; role: string }[];
  isFeatured?: boolean;
  status: "upcoming" | "ongoing" | "past";
  timestamp: number;
}

export interface CustomBranding {
  logoUrl: string | null;
  updatedAt: number;
}

export interface CustomSlide {
  id: string;
  bg: string;
  subtitle: string;
  cta: string;
  cta2: string;
  isCustom?: boolean;
}

export interface SectionPhotoData {
  heroImage: string | null;
  problemSolutionImage: string | null;
  impactStatsImage: string | null;
  subCityNetworkImage: string | null;
  leadershipSpotlightImage: string | null;
  updatedAt: number;
}