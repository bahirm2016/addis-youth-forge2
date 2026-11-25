import type { LeadershipQuote, GalleryPhoto, SuccessStory, EventItem } from "./types";

export const ORG_NAME = "Addis Ababa Youth Association";
export const ORG_SHORT = "AAYA";
export const TAGLINE = "Empowering Youth. Transforming Ethiopia.";
export const EST_YEAR = 1998;
export const REG_NUMBER = "0471";
export const REG_AUTHORITY = "Ethiopian Civic Society Organization Authority";

export const PHONE_1 = "+251 910-387-482";
export const PHONE_2 = "+251 944-185-367";
export const EMAIL = "addisyouth98@gmail.com";
export const FACEBOOK = "AddisAbabaYouthassociation";
export const OFFICE_LOCATION = "Bole Sub-City, Addis Ababa, Ethiopia";
export const OFFICE_HOURS = "Mon–Fri: 8:00 AM – 5:00 PM";

export const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About Us", href: "about" },
  { label: "Our Impacts", href: "programs" },
  { label: "Success Stories", href: "stories" },
  { label: "Events", href: "events" },
  { label: "Membership", href: "membership" },
  { label: "Contact Us", href: "contact" },
] as const;

export const SUB_CITIES = [
  { name: "Bole", woredas: 14 },
  { name: "Arada", woredas: 10 },
  { name: "Kirkos", woredas: 11 },
  { name: "Yeka", woredas: 13 },
  { name: "Nifas Silk", woredas: 12 },
  { name: "Lideta", woredas: 9 },
  { name: "Kolfe Keraniyo", woredas: 11 },
  { name: "Addis Ketema", woredas: 10 },
  { name: "Gulele", woredas: 8 },
  { name: "Akaky Kaliti", woredas: 11 },
  { name: "Lemi Kura", woredas: 10 },
] as const;

export const TOTAL_WOREDAS = 119;

export const IMPACT_STATS = [
  { label: "Youth Trained Annually", value: "5,000+", icon: "GraduationCap" as const },
  { label: "Employment Opportunities", value: "5,000+", icon: "Briefcase" as const },
  { label: "Students Receiving Supplementary Education", value: "50,000+", icon: "BookOpen" as const },
  { label: "Community Members Served", value: "1,000,000+", icon: "Users" as const },
  { label: "Years Incubating Future Leaders", value: "25+", icon: "Award" as const },
  { label: "Years of Civic Empowerment", value: "28", icon: "Heart" as const },
] as const;

export const PROBLEMS_SOLUTIONS = [
  {
    problem: "Youth Unemployment",
    problemDesc: "High unemployment rates among Addis Ababa's youth, with limited access to sustainable job markets.",
    solution: "Vocational Incubation & Job Pairing",
    solutionDesc: "Hands-on vocational training programs paired with direct employer partnerships to secure lasting employment.",
  },
  {
    problem: "Skill Deficits",
    problemDesc: "A widening gap between formal education and the practical skills demanded by today's economy.",
    solution: "Skills Development Hubs",
    solutionDesc: "Industry-aligned training in digital literacy, entrepreneurship, trades, and soft skills development.",
  },
  {
    problem: "Academic Gaps",
    problemDesc: "Overcrowded classrooms and limited resources leave many students without adequate academic support.",
    solution: "Supplementary Education",
    solutionDesc: "After-school tutoring, STEM workshops, and scholarship programs reaching 50,000+ students annually.",
  },
  {
    problem: "Civic Disengagement",
    problemDesc: "Limited opportunities for youth to participate in community development and civic life.",
    solution: "Summer Volunteer Hubs",
    solutionDesc: "Structured volunteer programs engaging youth in community service, leadership, and civic action.",
  },
] as const;

export const LEADERSHIP_QUOTES = [
  {
    name: "Dr. Mekonnen Assefa",
    title: "Former Youth Member, Now Ministerial Advisor",
    quote: "AAYA didn't just give me a platform — it showed me that the future of Ethiopia rests in the hands of its young people. Every mentorship, every workshop, every conversation shaped who I am today.",
    year: "Member 2002–2008",
  },
  {
    name: "Hanna Tadesse",
    title: "Founder, SheLeads Ethiopia",
    quote: "The leadership training I received at AAYA at 16 years old was the spark that lit my entire career. I learned that service isn't just about giving back — it's about lifting as you climb.",
    year: "Member 2004–2010",
  },
  {
    name: "Solomon Girma",
    title: "Tech Entrepreneur & Innovator",
    quote: "From a shy kid in Kirkos to building a tech company employing 200+ Ethiopians — AAYA was the turning point. They saw potential in me before I saw it in myself.",
    year: "Member 2006–2012",
  },
] as const;

export const TEAM_MEMBERS = [
  { name: "Amanuel Berhe", role: "Executive Director", bio: "Leading AAYA's strategic vision with 20+ years in youth development and civic empowerment across Ethiopia.", image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/amanuel-berhe-e941cc71-1784722406949.webp" },
  { name: "Tigist Wondimu", role: "Programs Director", bio: "Overseeing vocational training, education, and volunteer programs reaching 400,000+ youth annually.", image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/tigist-wondimu-e8bbe61a-1784722406904.webp" },
  { name: "Dawit Hailu", role: "Community Outreach Manager", bio: "Building partnerships across 11 sub-cities and 119+ woredas to ensure grassroots impact.", image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/dawit-hailu-f5de9a38-1784722407718.webp" },
  { name: "Betelhem Assefa", role: "Finance & Administration Head", bio: "Ensuring transparent resource management and operational excellence for sustainable growth.", image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/betelhem-assefa-7b8e1c4a-1784722406398.webp" },
] as const;

export const LEADERSHIP_SPOTLIGHT: LeadershipQuote[] = [
  {
    name: "Mr. Rehima Awol",
    title: "Former Youth Member, Community Leader",
    quote: "We didn't just join an Association—we found our purpose, our voice, and the foundation of everything we have achieved today.",
    badge: "Purpose & Voice",
    year: "Member 2000–2006",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/rehima-awol-ce700433-1784797733791.webp",
    id: "lead-1",
    timestamp: 946684800000,
  },
  {
    name: "Mr. Ephrem Tadesse",
    title: "Former Youth Member, Grassroots Campaign Manager",
    quote: "The grassroots campaigns we ran, the community outreach we led, and the problems we solved together taught me what real leadership looks like.",
    badge: "Grassroots Leadership",
    year: "Member 2001–2007",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/ephrem-tadesse-7b22aea0-1784797734833.webp",
    id: "lead-2",
    timestamp: 978307200000,
  },
  {
    name: "Mr. Desalegn Taye",
    title: "Former Youth Member, Program Director",
    quote: "Directing teams, navigating complex challenges, and serving others without textbooks—AAYA taught me that the best education happens outside the classroom.",
    badge: "Team & Service",
    year: "Member 2000–2008",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/desalegn-taye-55dd2298-1784797736786.webp",
    id: "lead-3",
    timestamp: 946684800000,
  },
  {
    name: "Mr. Nigatu Dagnachew",
    title: "Former Youth Member, Senior Government Advisor",
    quote: "Every executive role I've held across government and private sectors was built on the foundation I laid in my early days at AAYA.",
    badge: "Executive Foundation",
    year: "Member 1999–2005",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/nigatu-dagnachew-802f07d4-1784797734705.webp",
    id: "lead-4",
    timestamp: 915148800000,
  },
];

export const ANNIVERSARY_GALLERY: GalleryPhoto[] = [
  {
    caption: "28th Anniversary Celebration — Executive Leaders & Members",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/aaya-28th-anniversary-1-f3ea691b-1784797734278.webp",
    id: "gallery-1",
    timestamp: 1700000000000,
  },
  {
    caption: "Youth Volunteers & Community Leaders United",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/aaya-28th-anniversary-2-9c3050e7-1784797737162.webp",
    id: "gallery-2",
    timestamp: 1700000000000,
  },
  {
    caption: "Former Leaders & Stakeholders Recognition Ceremony",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/aaya-28th-anniversary-3-1995ac15-1784797737992.webp",
    id: "gallery-3",
    timestamp: 1700000000000,
  },
  {
    caption: "Generations of AAYA Members Reunited",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/09bad195-538d-435a-b285-b1058ab37cf9/aaya-28th-anniversary-4-a74011bd-1784797738117.webp",
    id: "gallery-4",
    timestamp: 1700000000000,
  },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    name: "Meron Tekle",
    title: "Software Engineer at Safaricom Ethiopia",
    story: "Growing up in Nifas Silk, I never imagined I'd work in tech. AAYA's digital literacy program introduced me to coding at 17. Today, I lead a team of engineers building mobile solutions for millions of Ethiopians.",
    image: "",
    id: "story-1",
    timestamp: 946684800000,
  },
  {
    name: "Kidus Yohannes",
    title: "Owner, Kirkos Bakery & Café",
    story: "After struggling to find work for two years, I joined AAYA's vocational incubation program. They helped me secure a small business loan and provided mentorship. My bakery now employs 12 people from the community.",
    image: "",
    id: "story-2",
    timestamp: 978307200000,
  },
  {
    name: "Selam Tesfaye",
    title: "Public Health Officer, WHO Ethiopia",
    story: "AAYA's summer volunteer hub introduced me to community health work. That experience shaped my career path. I went on to earn a degree in public health and now serve communities across the Horn of Africa.",
    image: "",
    id: "story-3",
    timestamp: 1009843200000,
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "event-2",
    title: "Volunteer Blood Donation Event",
    type: "volunteer",
    date: "2026-08-15",
    time: "8:00 AM – 3:00 PM",
    location: "AAYA Training Center & Local Health Centers, Bole",
    description: "Community blood drive in collaboration with local health centers to support health services and save lives. Every donation counts — join us in making a lifesaving impact.",
    image: "https://images.unsplash.com/photo-1612277795421-9bc7701a7a7f?w=800&q=80",
    capacity: 300,
    registered: 142,
    speakers: [],
    status: "upcoming",
    timestamp: 1772236800000,
  },
  {
    id: "event-3",
    title: "Summer Volunteer Program Closing Event",
    type: "community",
    date: "2026-09-05",
    time: "10:00 AM – 4:00 PM",
    location: "AAYA Community Hall, Bole Sub-City",
    description: "Celebrating the achievements, impactful projects, and graduation of our summer volunteer cohort. Join us to honor the dedication and hard work of our youth volunteers.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    capacity: 500,
    registered: 328,
    speakers: [
      { name: "Amanuel Berhe", role: "Executive Director, AAYA" },
    ],
    isFeatured: false,
    status: "upcoming",
    timestamp: 1776384000000,
  },
  {
    id: "event-1",
    title: "Youth Peace Summit, Marking International Peace Day",
    type: "summit",
    date: "2026-09-21",
    time: "9:00 AM – 5:00 PM",
    location: "Addis Ababa Youth Center & Live Stream",
    description: "Youth Peace Summit, marking International Peace Day. Sep 21/26 — Bringing together young leaders, peace advocates, and policymakers for dialogue, workshops, and a collective commitment to peacebuilding across Ethiopia.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    capacity: 2000,
    registered: 847,
    speakers: [
      { name: "Dr. Mekonnen Assefa", role: "Ministerial Advisor" },
      { name: "Hanna Tadesse", role: "Founder, SheLeads Ethiopia" },
      { name: "Solomon Girma", role: "Tech Entrepreneur" },
    ],
    isFeatured: true,
    status: "upcoming",
    timestamp: 1778457600000,
  },
  {
    id: "event-4",
    title: 'Youth for Peace Dialogue & International Peace Day Celebration',
    type: "summit",
    date: "2026-09-21",
    time: "9:00 AM – 5:00 PM",
    location: "Addis Ababa Youth Center & Satellite Community Hubs",
    description: "A city-wide dialogue marking International Peace Day, featuring keynote addresses, youth-led peace workshops, ambassador panels, and a community peace pledge ceremony. Join hundreds of young peacebuilders in promoting peaceful resolution and social cohesion.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab4f6?w=800&q=80",
    capacity: 800,
    registered: 312,
    speakers: [
      { name: "Dr. Mekonnen Assefa", role: "Ministerial Advisor & Peace Advocate" },
      { name: "Hanna Tadesse", role: "Founder, SheLeads Ethiopia" },
      { name: "Ephrem Tadesse", role: "Grassroots Campaign Manager" },
    ],
    isFeatured: false,
    status: "upcoming",
    timestamp: 1778457600000,
  },
  {
    id: "event-5",
    title: "Environmental Protection & Community Clean-Up Drive",
    type: "volunteer",
    date: "2026-09-12",
    time: "7:00 AM – 1:00 PM",
    location: "Multiple Sites Across Bole & Kirkos Sub-Cities",
    description: "Hands-on environmental action day focused on protecting newly planted saplings, clearing drainage ditches, neighborhood sanitation, and green stewardship education. Volunteers will work in teams to safeguard AAYA's tree-planting investments and promote environmental awareness.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    capacity: 400,
    registered: 178,
    speakers: [],
    isFeatured: false,
    status: "upcoming",
    timestamp: 1776816000000,
  },
];

export const DEFAULT_LOGO_URL = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80";

export const DEFAULT_HERO_SLIDES = [
  {
    id: "slide-0",
    bg: "https://storage.googleapis.com/dala-prod-public-storage/attachments/0e91c982-b864-434d-8e92-36de4eceed57/1786886886407__B3A5150.JPG",
    subtitle: "Inaugural Ceremony & Ribbon Cutting",
    cta: "Get Involved",
    cta2: "Our Programs",
  },
  {
    id: "slide-1",
    bg: "https://storage.googleapis.com/dala-prod-public-storage/attachments/0e91c982-b864-434d-8e92-36de4eceed57/1786886886405__B3A5134.JPG",
    subtitle: "Youth Leadership & Community Unity",
    cta: "Join Us",
    cta2: "Learn More",
  },
  {
    id: "slide-2",
    bg: "https://storage.googleapis.com/dala-prod-public-storage/attachments/0e91c982-b864-434d-8e92-36de4eceed57/1786533199689_2G5A7761.JPG",
    subtitle: "Conference & Youth Leadership",
    cta: "Volunteer",
    cta2: "Our Impact",
  },
  {
    id: "slide-3",
    bg: "https://storage.googleapis.com/dala-prod-public-storage/attachments/0e91c982-b864-434d-8e92-36de4eceed57/1786533199684_AB3A5093.JPG",
    subtitle: "Youth Group Event & Engagement",
    cta: "Donate",
    cta2: "Success Stories",
  },
];

export const PROGRAMS = [
  {
    title: "Vocational Training & Incubation",
    desc: "Hands-on skills development in trades, technology, and entrepreneurship with direct job placement pathways.",
    icon: "Zap" as const,
    highlights: ["Carpentry & Construction", "Digital Marketing", "Hospitality & Tourism", "Garment & Textile"],
  },
  {
    title: "Employment Pairing & Placement",
    desc: "Connecting trained youth with verified employers through job fairs, direct referrals, and apprenticeship programs.",
    icon: "Briefcase" as const,
    highlights: ["Corporate Partnerships", "Job Readiness Training", "Apprenticeship Network", "Career Counseling"],
  },
  {
    title: "Supplementary Education",
    desc: "After-school tutoring, STEM labs, and scholarship support for students in under-resourced schools across Addis.",
    icon: "BookOpen" as const,
    highlights: ["STEM Workshops", "University Prep", "Scholarship Access", "Peer Tutoring"],
  },
  {
    title: "Summer Volunteer Hubs",
    desc: "Intensive 8-week summer programs engaging youth in community service, leadership training, and civic action projects.",
    icon: "Heart" as const,
    highlights: ["Community Clean-Up", "Health Campaigns", "Environmental Action", "Leadership Bootcamp"],
  },
] as const;