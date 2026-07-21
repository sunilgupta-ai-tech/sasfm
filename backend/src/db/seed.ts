import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@sasfm.co";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "change-me-immediately";

const portfolioProjects = [
  {
    slug: "meridian-tech-park",
    name: "Skyline Tech Park",
    category: "Commercial",
    location: "Business Bay District",
    scope: ["MEP Maintenance", "Security", "Cleaning", "Landscaping"],
    summary:
      "A 22-floor mixed-use office tower where we run full hard and soft services under a single outcome-based contract, cutting unplanned downtime year over year.",
    imageUrl: "/images/portfolio/meridian-tech-park/cover.jpg",
  },
  {
    slug: "harborview-institute",
    name: "Harborview Institute",
    category: "Educational",
    location: "Coastal Campus",
    scope: ["HVAC", "Fire & Life Safety", "Cleaning", "Pest Control"],
    summary:
      "Campus-wide facilities support across classrooms, labs and residence halls, coordinated around the academic calendar to minimize disruption.",
    imageUrl: "/images/portfolio/harborview-institute/cover.jpg",
  },
  {
    slug: "northgate-medical-center",
    name: "Northgate Medical Center",
    category: "Healthcare",
    location: "Northgate District",
    scope: ["Critical MEP", "Access Control", "Cleaning", "Waste Management"],
    summary:
      "Round-the-clock critical systems monitoring and compliance-driven soft services for a live clinical environment.",
    imageUrl: "/images/portfolio/northgate-medical-center/cover.jpg",
  },
  {
    slug: "suncrest-residences",
    name: "Suncrest Residences",
    category: "Residential",
    location: "Marina Waterfront",
    scope: ["Concierge", "Pool & Gym", "Landscaping", "Security"],
    summary:
      "Full amenity and lifestyle services for a 300-unit residential tower, including lifeguard staffing and resident-facing concierge.",
    imageUrl: "/images/portfolio/suncrest-residences/cover.jpg",
  },
  {
    slug: "willow-court-townhomes",
    name: "Willow Court Townhomes",
    category: "Town House",
    location: "Meadowbrook Community",
    scope: ["Landscaping", "Cleaning", "Gate & Access", "Pest Control"],
    summary:
      "Community-wide grounds and access management across a low-rise townhouse development, run on a single shared service calendar.",
    imageUrl: "/images/portfolio/willow-court-townhomes/cover.jpg",
  },
  {
    slug: "riverside-commerce-tower",
    name: "Riverside Commerce Tower",
    category: "Commercial",
    location: "Riverside Financial District",
    scope: ["Elevator Maintenance", "Fit-Out Support", "Cleaning", "Security"],
    summary:
      "Tenant fit-out coordination alongside day-to-day operations for a multi-tenant financial district address.",
    imageUrl: "/images/portfolio/riverside-commerce-tower/cover.jpg",
  },
];

const blogPosts = [
  {
    slug: "why-carpentry-still-matters-in-interior-fit-outs",
    title: "Why Carpentry Still Matters in Modern Interior Fit-Outs",
    excerpt:
      "Custom joinery and carpentry remain the detail that separates a generic fit-out from a space that feels considered.",
    tag: "Workplace Experience",
    readTime: "4 min read",
    date: new Date("2026-02-18"),
    imageUrl: "/images/blog/why-carpentry-still-matters-in-interior-fit-outs/cover.jpg",
    body: [
      "It's tempting to treat carpentry as an afterthought once the layout and finishes are locked in. In practice, it's usually the opposite: built-in joinery, reception desks, and custom partitions are what make a fit-out feel designed rather than assembled from a catalog.",
      "Off-the-shelf furniture can fill a room, but it rarely fits the room. Custom carpentry lets a space use awkward corners, hide cabling and services, and match sightlines that a standard product simply wasn't built for.",
      "The other advantage is durability. Commercial-grade joinery built for a specific space tends to outlast generic furniture subjected to daily foot traffic, because it's built to the actual load and wear pattern of that location.",
      "When we scope a fit-out, we bring the carpentry conversation in early — not as a finishing touch, but as part of the same planning pass as electrical and HVAC. It's cheaper to plan around a built-in feature than to retrofit one later.",
    ],
  },
  {
    slug: "what-to-ask-before-hiring-an-office-fit-out-partner",
    title: "What to Ask Before Hiring an Office Fit-Out Partner",
    excerpt:
      "The right questions upfront save weeks of rework — here's the checklist we walk every client through.",
    tag: "Operations",
    readTime: "5 min read",
    date: new Date("2026-03-30"),
    imageUrl: "/images/blog/what-to-ask-before-hiring-an-office-fit-out-partner/cover.jpg",
    body: [
      "Most fit-out delays don't come from bad execution — they come from questions that should have been asked at the proposal stage. A few minutes of scoping now saves weeks of change orders later.",
      "Start with ownership: who is responsible for coordinating trades on site — electrical, MEP, carpentry, IT cabling? If the answer is 'you will', budget extra time and stress for the project.",
      "Ask how the partner handles unexpected findings, like an outdated electrical panel behind a wall that was supposed to stay untouched. A good partner has a standard change process, not an improvised one.",
      "Finally, ask what happens after handover. A fit-out isn't done when the furniture arrives — ongoing maintenance of the space is a different skill set, and it's worth knowing upfront who owns it.",
    ],
  },
  {
    slug: "the-real-cost-of-skipping-duct-cleaning",
    title: "The Real Cost of Skipping Industrial Duct Cleaning",
    excerpt:
      "Deferred duct maintenance shows up later as energy waste and air-quality complaints. Here's how to plan ahead of it.",
    tag: "Smart Building Technology",
    readTime: "3 min read",
    date: new Date("2026-05-12"),
    imageUrl: "/images/blog/the-real-cost-of-skipping-duct-cleaning/cover.jpg",
    body: [
      "Duct cleaning rarely makes an urgent list, because a dirty duct doesn't fail the way a broken pump does. The cost shows up gradually instead — in energy bills, in comfort complaints, and eventually in equipment wear.",
      "As dust and debris build up inside ductwork, airflow drops and systems have to work harder to hit the same setpoint. That extra strain is often mistaken for an aging HVAC unit, when the real fix is a clean duct run.",
      "Air quality is the second cost. Recirculated dust and allergens are a common, and often overlooked, source of occupant complaints in older commercial buildings.",
      "A scheduled inspection cadence — rather than a reactive one — catches this early. It's one of the cheapest line items in a maintenance plan relative to the downstream cost of ignoring it.",
    ],
  },
  {
    slug: "hvac-efficiency-starts-with-the-ducts",
    title: "HVAC Efficiency Starts With the Ducts, Not the Unit",
    excerpt:
      "Before you replace equipment, a clean duct system is often the fastest way back to rated efficiency.",
    tag: "Operations",
    readTime: "4 min read",
    date: new Date("2026-06-24"),
    imageUrl: "/images/blog/hvac-efficiency-starts-with-the-ducts/cover.jpg",
    body: [
      "When energy bills climb, the instinct is to look at the HVAC unit itself. Often, the faster and cheaper fix is upstream — in the ductwork carrying air to and from that unit.",
      "A system fighting restricted airflow from blocked or leaking ducts will run longer and harder to hit the same temperature, regardless of how efficient the unit itself is rated to be.",
      "Sealing leaks and clearing buildup can recover a meaningful share of lost efficiency without touching the equipment at all — often the highest return-on-effort item on a facilities checklist.",
      "It's worth treating duct condition as a recurring check, not a one-time fix, especially in buildings with heavy year-round HVAC use.",
    ],
  },
];

const softServices = [
  {
    title: "Building Cleaning",
    description:
      "Daily, deep and façade cleaning programs scaled to offices, residential towers, retail and campuses.",
    details:
      "Programs are scheduled around occupancy patterns to minimize disruption, with dedicated crews for high-traffic zones and specialist teams for façade and high-level work.",
  },
  {
    title: "Pest Control",
    description:
      "Scheduled inspection and eco-conscious treatment programs that keep sites hygienic and compliant.",
    details:
      "Every site follows a documented treatment log for audit readiness, using low-toxicity methods first and escalating only when necessary.",
  },
  {
    title: "Landscaping & Gardening",
    description:
      "Design, planting and irrigation upkeep for grounds, courtyards and rooftop green spaces.",
    details:
      "Seasonal planting calendars and smart irrigation scheduling keep grounds looking sharp while controlling water use.",
  },
  {
    title: "Security Services",
    description:
      "Manned guarding, access control and CCTV monitoring layered into one coordinated security plan.",
    details:
      "Guarding rosters, access credentials and camera coverage are managed from one system, so incident response stays fast and consistent.",
  },
  {
    title: "Administrative & Concierge",
    description:
      "Front-of-house, reception and visitor management that sets the tone for every site.",
    details:
      "Trained front-of-house staff handle everything from visitor badges to package logistics, acting as the first impression for every tenant and guest.",
  },
  {
    title: "Lifeguard Services",
    description:
      "Certified lifeguard staffing and pool safety programs for residential and hospitality amenities.",
    details:
      "All lifeguard staff hold current certification, with rotating shift coverage and documented pool safety audits.",
  },
].map((s, i) => ({ ...s, type: "SOFT" as const, sortOrder: i }));

const hardServices = [
  {
    title: "Electrical Maintenance",
    description:
      "Scheduled inspection, testing and repair of power distribution, lighting and backup systems.",
    details:
      "Thermal imaging and load testing catch issues before they become outages, backed by a documented compliance trail for every panel and circuit.",
  },
  {
    title: "HVAC Systems",
    description:
      "Preventive and reactive maintenance keeping climate systems efficient, compliant and running.",
    details:
      "Filter changes, refrigerant checks and controls calibration are tracked against manufacturer schedules to protect both comfort and warranty.",
  },
  {
    title: "Plumbing & Drainage",
    description:
      "Full plumbing upkeep, from routine servicing to emergency leak and drainage response.",
    details:
      "From routine fixture servicing to emergency leak response, every job is logged against the asset's maintenance history.",
  },
  {
    title: "Fire & Life Safety",
    description:
      "Alarm, suppression and evacuation systems tested and certified to keep every site compliant.",
    details:
      "Alarm testing, sprinkler inspection and evacuation drills are scheduled to meet local code, with certificates stored for every site.",
  },
  {
    title: "Elevator & Escalator Maintenance",
    description:
      "Coordinated servicing of vertical transport systems to minimize downtime and safety risk.",
    details:
      "Preventive maintenance schedules are coordinated with equipment manufacturers to reduce breakdown risk and keep call-back times low.",
  },
  {
    title: "Building Fabric & Structural",
    description:
      "Roofing, façade and structural upkeep that protects the long-term condition of the asset.",
    details:
      "Roof, façade and structural condition surveys feed into a long-term capital plan, so repairs happen on schedule rather than in an emergency.",
  },
].map((s, i) => ({ ...s, type: "HARD" as const, sortOrder: i }));

// Image left empty — these placeholder photo paths from the old static
// site never pointed at real files. Upload real photos via the admin panel.
const teamMembers = [
  { name: "Sana Malik", title: "Head of Operations", region: "Global" },
  { name: "James Whitfield", title: "Director, Smart Building Technology", region: "Americas" },
  { name: "Aiko Tanaka", title: "Director, Workplace Experience", region: "Asia-Pacific" },
  { name: "Omar Haddad", title: "Director, Hard Services", region: "EMEA" },
  { name: "Laura Bianchi", title: "Director, Sustainability", region: "EMEA" },
  { name: "Carlos Reyes", title: "Director, Client Success", region: "Americas" },
].map((m, i) => ({ ...m, imageUrl: "", sortOrder: i }));

async function main() {
  console.log("Seeding admin user...");
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { passwordHash },
    create: { email: ADMIN_EMAIL, passwordHash, name: "SASFM Admin" },
  });
  console.log(`  Admin user ready: ${ADMIN_EMAIL}`);
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log(
      `  ⚠ Using default password "change-me-immediately" — set SEED_ADMIN_PASSWORD env var to override.`
    );
  }

  // update: {} -> only creates missing rows; never overwrites an existing
  // project's fields (name, image, etc.) that may have since been edited
  // via the admin panel. Re-running seed must never clobber live edits.
  console.log("Seeding portfolio projects...");
  for (const project of portfolioProjects) {
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log(`  ${portfolioProjects.length} projects seeded.`);

  console.log("Seeding blog posts...");
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log(`  ${blogPosts.length} posts seeded.`);

  console.log("Seeding services...");
  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    await prisma.service.createMany({ data: [...softServices, ...hardServices] });
    console.log(`  ${softServices.length + hardServices.length} services seeded.`);
  } else {
    console.log("  Services already exist, skipping.");
  }

  console.log("Seeding team members...");
  const existingTeamMembers = await prisma.teamMember.count();
  if (existingTeamMembers === 0) {
    await prisma.teamMember.createMany({ data: teamMembers });
    console.log(`  ${teamMembers.length} team members seeded.`);
  } else {
    console.log("  Team members already exist, skipping.");
  }

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
