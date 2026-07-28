export const values = [
  {
    title: "One Point of Accountability",
    description:
      "A single contract, a single team, and a single number to call — no finger-pointing between vendors.",
  },
  {
    title: "Outcome-Based Contracts",
    description:
      "We price against the results you actually care about — uptime, cost and safety — not line-item inputs.",
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Every site feeds a shared data layer, so maintenance decisions are based on real condition, not guesswork.",
  },
  {
    title: "Transparent Reporting",
    description:
      "Live dashboards and monthly reporting mean you always know exactly where your portfolio stands.",
  },
];

export const softServices = [
  {
    id: "cleaning",
    title: "Building Cleaning",
    description:
      "Daily, deep and façade cleaning programs scaled to offices, residential towers, retail and campuses.",
    details:
      "Programs are scheduled around occupancy patterns to minimize disruption, with dedicated crews for high-traffic zones and specialist teams for façade and high-level work.",
  },
  {
    id: "pest-control",
    title: "Pest Control",
    description:
      "Scheduled inspection and eco-conscious treatment programs that keep sites hygienic and compliant.",
    details:
      "Every site follows a documented treatment log for audit readiness, using low-toxicity methods first and escalating only when necessary.",
  },
  {
    id: "landscaping",
    title: "Landscaping & Gardening",
    description:
      "Design, planting and irrigation upkeep for grounds, courtyards and rooftop green spaces.",
    details:
      "Seasonal planting calendars and smart irrigation scheduling keep grounds looking sharp while controlling water use.",
  },
  {
    id: "security",
    title: "Security Services",
    description:
      "Manned guarding, access control and CCTV monitoring layered into one coordinated security plan.",
    details:
      "Guarding rosters, access credentials and camera coverage are managed from one system, so incident response stays fast and consistent.",
  },
  {
    id: "concierge",
    title: "Administrative & Concierge",
    description:
      "Front-of-house, reception and visitor management that sets the tone for every site.",
    details:
      "Trained front-of-house staff handle everything from visitor badges to package logistics, acting as the first impression for every tenant and guest.",
  },
  {
    id: "lifeguard",
    title: "Lifeguard Services",
    description:
      "Certified lifeguard staffing and pool safety programs for residential and hospitality amenities.",
    details:
      "All lifeguard staff hold current certification, with rotating shift coverage and documented pool safety audits.",
  },
];

export type PortfolioCategory =
  | "Commercial"
  | "Educational"
  | "Healthcare"
  | "Residential"
  | "Town House";

export const portfolioCategories: PortfolioCategory[] = [
  "Commercial",
  "Educational",
  "Healthcare",
  "Residential",
  "Town House",
];

export const portfolioProjects: {
  slug: string;
  name: string;
  category: PortfolioCategory;
  location: string;
  scope: string[];
  summary: string;
  image: string;
}[] = [
  {
    slug: "meridian-tech-park",
    image: "/images/portfolio/meridian-tech-park/cover.jpg",
    name: "Skyline Tech Park",
    category: "Commercial",
    location: "Business Bay District",
    scope: ["MEP Maintenance", "Security", "Cleaning", "Landscaping"],
    summary:
      "A 22-floor mixed-use office tower where we run full hard and soft services under a single outcome-based contract, cutting unplanned downtime year over year.",
  },
  {
    slug: "harborview-institute",
    image: "/images/portfolio/harborview-institute/cover.jpg",
    name: "Harborview Institute",
    category: "Educational",
    location: "Coastal Campus",
    scope: ["HVAC", "Fire & Life Safety", "Cleaning", "Pest Control"],
    summary:
      "Campus-wide facilities support across classrooms, labs and residence halls, coordinated around the academic calendar to minimize disruption.",
  },
  {
    slug: "northgate-medical-center",
    image: "/images/portfolio/northgate-medical-center/cover.jpg",
    name: "Northgate Medical Center",
    category: "Healthcare",
    location: "Northgate District",
    scope: ["Critical MEP", "Access Control", "Cleaning", "Waste Management"],
    summary:
      "Round-the-clock critical systems monitoring and compliance-driven soft services for a live clinical environment.",
  },
  {
    slug: "suncrest-residences",
    image: "/images/portfolio/suncrest-residences/cover.jpg",
    name: "Suncrest Residences",
    category: "Residential",
    location: "Marina Waterfront",
    scope: ["Concierge", "Pool & Gym", "Landscaping", "Security"],
    summary:
      "Full amenity and lifestyle services for a 300-unit residential tower, including lifeguard staffing and resident-facing concierge.",
  },
  {
    slug: "willow-court-townhomes",
    image: "/images/portfolio/willow-court-townhomes/cover.jpg",
    name: "Willow Court Townhomes",
    category: "Town House",
    location: "Meadowbrook Community",
    scope: ["Landscaping", "Cleaning", "Gate & Access", "Pest Control"],
    summary:
      "Community-wide grounds and access management across a low-rise townhouse development, run on a single shared service calendar.",
  },
  {
    slug: "riverside-commerce-tower",
    image: "/images/portfolio/riverside-commerce-tower/cover.jpg",
    name: "Riverside Commerce Tower",
    category: "Commercial",
    location: "Riverside Financial District",
    scope: ["Elevator Maintenance", "Fit-Out Support", "Cleaning", "Security"],
    summary:
      "Tenant fit-out coordination alongside day-to-day operations for a multi-tenant financial district address.",
  },
];

export const blogPosts: {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  image: string;
  body: string[];
}[] = [
  {
    slug: "why-carpentry-still-matters-in-interior-fit-outs",
    image: "/images/blog/why-carpentry-still-matters-in-interior-fit-outs/cover.jpg",
    date: "February 18, 2026",
    title: "Why Carpentry Still Matters in Modern Interior Fit-Outs",
    excerpt:
      "Custom joinery and carpentry remain the detail that separates a generic fit-out from a space that feels considered.",
    tag: "Workplace Experience",
    readTime: "4 min read",
    body: [
      "It's tempting to treat carpentry as an afterthought once the layout and finishes are locked in. In practice, it's usually the opposite: built-in joinery, reception desks, and custom partitions are what make a fit-out feel designed rather than assembled from a catalog.",
      "Off-the-shelf furniture can fill a room, but it rarely fits the room. Custom carpentry lets a space use awkward corners, hide cabling and services, and match sightlines that a standard product simply wasn't built for.",
      "The other advantage is durability. Commercial-grade joinery built for a specific space tends to outlast generic furniture subjected to daily foot traffic, because it's built to the actual load and wear pattern of that location.",
      "When we scope a fit-out, we bring the carpentry conversation in early — not as a finishing touch, but as part of the same planning pass as electrical and HVAC. It's cheaper to plan around a built-in feature than to retrofit one later.",
    ],
  },
  {
    slug: "what-to-ask-before-hiring-an-office-fit-out-partner",
    image: "/images/blog/what-to-ask-before-hiring-an-office-fit-out-partner/cover.jpg",
    date: "March 30, 2026",
    title: "What to Ask Before Hiring an Office Fit-Out Partner",
    excerpt:
      "The right questions upfront save weeks of rework — here's the checklist we walk every client through.",
    tag: "Operations",
    readTime: "5 min read",
    body: [
      "Most fit-out delays don't come from bad execution — they come from questions that should have been asked at the proposal stage. A few minutes of scoping now saves weeks of change orders later.",
      "Start with ownership: who is responsible for coordinating trades on site — electrical, MEP, carpentry, IT cabling? If the answer is 'you will', budget extra time and stress for the project.",
      "Ask how the partner handles unexpected findings, like an outdated electrical panel behind a wall that was supposed to stay untouched. A good partner has a standard change process, not an improvised one.",
      "Finally, ask what happens after handover. A fit-out isn't done when the furniture arrives — ongoing maintenance of the space is a different skill set, and it's worth knowing upfront who owns it.",
    ],
  },
  {
    slug: "the-real-cost-of-skipping-duct-cleaning",
    image: "/images/blog/the-real-cost-of-skipping-duct-cleaning/cover.jpg",
    date: "May 12, 2026",
    title: "The Real Cost of Skipping Industrial Duct Cleaning",
    excerpt:
      "Deferred duct maintenance shows up later as energy waste and air-quality complaints. Here's how to plan ahead of it.",
    tag: "Smart Building Technology",
    readTime: "3 min read",
    body: [
      "Duct cleaning rarely makes an urgent list, because a dirty duct doesn't fail the way a broken pump does. The cost shows up gradually instead — in energy bills, in comfort complaints, and eventually in equipment wear.",
      "As dust and debris build up inside ductwork, airflow drops and systems have to work harder to hit the same setpoint. That extra strain is often mistaken for an aging HVAC unit, when the real fix is a clean duct run.",
      "Air quality is the second cost. Recirculated dust and allergens are a common, and often overlooked, source of occupant complaints in older commercial buildings.",
      "A scheduled inspection cadence — rather than a reactive one — catches this early. It's one of the cheapest line items in a maintenance plan relative to the downstream cost of ignoring it.",
    ],
  },
  {
    slug: "hvac-efficiency-starts-with-the-ducts",
    image: "/images/blog/hvac-efficiency-starts-with-the-ducts/cover.jpg",
    date: "June 24, 2026",
    title: "HVAC Efficiency Starts With the Ducts, Not the Unit",
    excerpt:
      "Before you replace equipment, a clean duct system is often the fastest way back to rated efficiency.",
    tag: "Operations",
    readTime: "4 min read",
    body: [
      "When energy bills climb, the instinct is to look at the HVAC unit itself. Often, the faster and cheaper fix is upstream — in the ductwork carrying air to and from that unit.",
      "A system fighting restricted airflow from blocked or leaking ducts will run longer and harder to hit the same temperature, regardless of how efficient the unit itself is rated to be.",
      "Sealing leaks and clearing buildup can recover a meaningful share of lost efficiency without touching the equipment at all — often the highest return-on-effort item on a facilities checklist.",
      "It's worth treating duct condition as a recurring check, not a one-time fix, especially in buildings with heavy year-round HVAC use.",
    ],
  },
];

export const hardServices = [
  {
    id: "electrical",
    title: "Electrical Maintenance",
    description:
      "Scheduled inspection, testing and repair of power distribution, lighting and backup systems.",
    details:
      "Thermal imaging and load testing catch issues before they become outages, backed by a documented compliance trail for every panel and circuit.",
  },
  {
    id: "hvac",
    title: "HVAC Systems",
    description:
      "Preventive and reactive maintenance keeping climate systems efficient, compliant and running.",
    details:
      "Filter changes, refrigerant checks and controls calibration are tracked against manufacturer schedules to protect both comfort and warranty.",
  },
  {
    id: "plumbing",
    title: "Plumbing & Drainage",
    description:
      "Full plumbing upkeep, from routine servicing to emergency leak and drainage response.",
    details:
      "From routine fixture servicing to emergency leak response, every job is logged against the asset's maintenance history.",
  },
  {
    id: "fire-safety",
    title: "Fire & Life Safety",
    description:
      "Alarm, suppression and evacuation systems tested and certified to keep every site compliant.",
    details:
      "Alarm testing, sprinkler inspection and evacuation drills are scheduled to meet local code, with certificates stored for every site.",
  },
  {
    id: "vertical-transport",
    title: "Elevator & Escalator Maintenance",
    description:
      "Coordinated servicing of vertical transport systems to minimize downtime and safety risk.",
    details:
      "Preventive maintenance schedules are coordinated with equipment manufacturers to reduce breakdown risk and keep call-back times low.",
  },
  {
    id: "building-fabric",
    title: "Building Fabric & Structural",
    description:
      "Roofing, façade and structural upkeep that protects the long-term condition of the asset.",
    details:
      "Roof, façade and structural condition surveys feed into a long-term capital plan, so repairs happen on schedule rather than in an emergency.",
  },
];

export type LeadershipMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
};

// Structured as a list (like a real Board of Directors / leadership page)
// so more people can be added later — currently seeded with the one
// message that was on the old site. Add a real name in place of the
// placeholder below once you have it.
export const leadershipTeam: LeadershipMember[] = [
  {
    id: "managing-director",
    name: "Managing Director", // TODO: replace with the real name
    title: "Managing Director",
    bio: "The best way to find yourself is to lose yourself in the service of others. We seek to imbibe this attitude of services in our team. In this journey we are ever learning, ever seeking to improve and serve our best. The reward for service is even more service.",
    image: "/images/leadership/managing-director/photo.jpg",
  },
];

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  region: string;
  image: string;
};

export const expertTeam: TeamMember[] = [
  {
    id: "team-1",
    image: "/images/team/team-1/photo.jpg",
    name: "Sana Malik",
    title: "Head of Operations",
    region: "Global",
  },
  {
    id: "team-2",
    image: "/images/team/team-2/photo.jpg",
    name: "James Whitfield",
    title: "Director, Smart Building Technology",
    region: "Americas",
  },
  {
    id: "team-3",
    image: "/images/team/team-3/photo.jpg",
    name: "Aiko Tanaka",
    title: "Director, Workplace Experience",
    region: "Asia-Pacific",
  },
  {
    id: "team-4",
    image: "/images/team/team-4/photo.jpg",
    name: "Omar Haddad",
    title: "Director, Hard Services",
    region: "EMEA",
  },
  {
    id: "team-5",
    image: "/images/team/team-5/photo.jpg",
    name: "Laura Bianchi",
    title: "Director, Sustainability",
    region: "EMEA",
  },
  {
    id: "team-6",
    image: "/images/team/team-6/photo.jpg",
    name: "Carlos Reyes",
    title: "Director, Client Success",
    region: "Americas",
  },
];
