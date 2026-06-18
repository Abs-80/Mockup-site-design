import { ShirtColor, Initiative, PrayerRequest, GatheringEvent } from "./types";

export const SHIRT_COLORS: ShirtColor[] = [
  {
    id: "cream",
    name: "Natural Grace Cream",
    bgClass: "bg-[#f5ebd6]",
    textClass: "text-[#8d6e35]",
    previewColor: "#f5ebd6",
    imageHueShift: "hue-rotate-0 saturate-100 brightness-100",
    caption: "#fbf9f6 warm undyed organic cotton",
  },
  {
    id: "olive",
    name: "Gethsemane Olive",
    bgClass: "bg-[#425041]",
    textClass: "text-[#d1e7dd]",
    previewColor: "#425041",
    imageHueShift: "hue-rotate-[110deg] saturate-50 brightness-50",
    caption: "#4e5a4d earthy liturgical olive",
  },
  {
    id: "dusty-rose",
    name: "Sharon Rose",
    bgClass: "bg-[#9a7b78]",
    textClass: "text-[#fde2e4]",
    previewColor: "#9a7b78",
    imageHueShift: "hue-rotate-[320deg] saturate-60 brightness-[75%]",
    caption: "#9a7a76 high-grade plant dye rose",
  },
  {
    id: "slate",
    name: "Covenant Slate",
    bgClass: "bg-[#2f3542]",
    textClass: "text-[#eccc68]",
    previewColor: "#2f3542",
    imageHueShift: "hue-rotate-[210deg] saturate-30 brightness-[35%]",
    caption: "#2e3b4e deep stone grey",
  }
];

export const INITIATIVES: Initiative[] = [
  {
    id: "learn",
    title: "The Hollow & Found Academy",
    tagline: "Unlocking scripture history & classic Christian theology.",
    iconName: "BookOpen",
    metric: "450k+",
    metricLabel: "Active Seekers Guided",
    badge: "Christian Learning",
    shortDesc: "Funding free digital apps, high-quality audio commentaries, and comprehensive guides designed for local bible schools and seekers of all backgrounds.",
    longDesc: "Many want to read scripture but lack clear historical context. We build state-of-the-art interactive mobile commentaries, translate classic theological works into spoken audio, and construct easy-to-digest guides on Christian core beliefs (Grace, the Trinity, Salvation, and Covenant History). No subscription models—completely free, forever.",
    actionLabel: "Access Course Outlines"
  },
  {
    id: "gather",
    title: "Hollow & Found Tables",
    tagline: "Connecting seekers and rebuilding local fellowship.",
    iconName: "Users",
    metric: "1,200+",
    metricLabel: "Active Small Groups",
    badge: "Bringing People Together",
    shortDesc: "Providing small micro-grants, study guides, and location finders to help Christians open their homes for breaking bread and studying scripture together.",
    longDesc: "In a digital-first world, deep personal fellowship is diminishing. 'Hollow & Found Tables' provides starter kits—including discussion cards, food subsidies, and an encrypted group finder—to encourage Christians to launch weekly house dinners. We gather seekers and disciples in organic community settings to grow in love.",
    actionLabel: "Explore Groups Directory"
  },
  {
    id: "serve",
    title: "The Sower Relief Operations",
    tagline: "Active discipleship expressed through local service.",
    iconName: "Heart",
    metric: "$280k",
    metricLabel: "Outreach Subsidies Given",
    badge: "Grace in Action",
    shortDesc: "Mobilizing local community church fellowships to supply clean water, food, warmth, and pastoral guidance to neighborhoods in major distress.",
    longDesc: "When people suffer physically, the love of Christ must be visible. The Sower Relief partners directly with local small congregations, supplying immediate funding for winter soup projects, disaster response, and homeless outreach, alongside compassionate prayer support and scripture distributions.",
    actionLabel: "Read Mission Logbooks"
  }
];

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: "p1",
    name: "Brother David S.",
    date: "June 18, 2026",
    verse: "Philippians 4:6-7",
    text: "Lifting up a prayer of supplication and healing for our community members facing economic and medical hardship. May the deep peace of our Lord Jesus protect your hearts and quiet any rising anxieties.",
    prayersCount: 42,
    hasPrayed: false
  },
  {
    id: "p2",
    name: "Elena G.",
    date: "June 17, 2026",
    verse: "Matthew 18:20",
    text: "Please pray for our newly formed House Fellowship in downtown Minneapolis. We are gathering four families who are hungry to study the letters of Paul. Pray that God softens hearts and brings community.",
    prayersCount: 19,
    hasPrayed: false
  },
  {
    id: "p3",
    name: "Marcus & Joy",
    date: "June 15, 2026",
    verse: "Romans 15:13",
    text: "Lifting up prayers for our church outreach project this weekend reaching out to single parent shelters. Pray that our words are filled with grace and that we simply shine the tangible light of Christ.",
    prayersCount: 56,
    hasPrayed: false
  },
  {
    id: "p4",
    name: "Seeker Grace",
    date: "June 14, 2026",
    verse: "John 14:27",
    text: "I am going through a season of doubt and feeling isolated from church. Please pray that Christ shows me where I belong, and gives me a brother or sister to talk to who can guide me with patience.",
    prayersCount: 31,
    hasPrayed: false
  }
];

export const GATHERING_EVENTS: GatheringEvent[] = [
  {
    id: "e1",
    title: "Summer Solstice Hollow & Found Table",
    organizer: "Pastor Benjamin Wright",
    date: "Thursday, June 25, 2026",
    time: "6:30 PM",
    location: "Sovereign Grace Pavilion, Central Park",
    city: "Chicago",
    state: "IL",
    participants: 18,
    maxParticipants: 30,
    category: "fellowship",
    registered: false,
    desc: "A massive open-air dinner and sunset hymn review. We will break bread, share dynamic updates on our local missions, and split into small reflection circles around the Gospel of John."
  },
  {
    id: "e2",
    title: "Understanding Grace: Romans Deep Study",
    organizer: "Theology Team (Agape Academy)",
    date: "Saturday, July 4, 2026",
    time: "10:00 AM",
    location: "Online Fellowship Console",
    city: "San Francisco",
    state: "CA",
    participants: 142,
    maxParticipants: 500,
    category: "study",
    registered: false,
    desc: "An educational dive dissecting the historical and linguistic context of St. Paul's Letter to the Romans. Great for seekers wanting to understand justification, grace, and Christian lineage."
  },
  {
    id: "e3",
    title: "Grace-in-Action Street Outreach",
    organizer: "Brother Timothy Hale",
    date: "Saturday, July 11, 2026",
    time: "8:00 AM",
    location: "Sower Relief Hub, 4th Ward Outreach Center",
    city: "Atlanta",
    state: "GA",
    participants: 24,
    maxParticipants: 40,
    category: "service",
    registered: false,
    desc: "Putting faith into physical activity. We am packing and distributing shelf-stable nutritional meals, warm weather items, and Bible reading guides to our neighbors under distress."
  }
];
