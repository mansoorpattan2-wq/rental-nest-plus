import p1 from "@/assets/prop-1.jpg";
import p2 from "@/assets/prop-2.jpg";
import p3 from "@/assets/prop-3.jpg";
import p4 from "@/assets/prop-4.jpg";
import p5 from "@/assets/prop-5.jpg";

export type PropertyType = "home" | "room" | "office" | "store";

export type Property = {
  id: string;
  title: string;
  type: PropertyType;
  address: string;
  neighborhood: string;
  city: string;
  rent: number;
  deposit: number;
  beds: number;
  baths: number;
  area: number; // sqft
  rating: number;
  reviews: number;
  images: string[];
  video?: string;
  amenities: string[];
  utilities: string[];
  available: string;
  lease: string;
  rules: string[];
  owner: { name: string; avatar: string; verified: boolean; phone: string };
  nearby: { name: string; type: string; distance: string }[];
  description: string;
  coords: { x: number; y: number }; // synthetic map coords 0-100
};

export const properties: Property[] = [
  {
    id: "loft-arches",
    title: "The Arches Loft",
    type: "home",
    address: "42 Camden Row",
    neighborhood: "Old Quarter",
    city: "Lisbon",
    rent: 1850,
    deposit: 3700,
    beds: 2,
    baths: 2,
    area: 1180,
    rating: 4.9,
    reviews: 128,
    images: [p1, p5, p2],
    video: "https://cdn.coverr.co/videos/coverr-a-modern-living-room-4553/1080p.mp4",
    amenities: ["Wi-Fi 1 Gbps", "In-unit laundry", "Rooftop", "Dishwasher", "Heating", "Elevator"],
    utilities: ["Water incl.", "Trash incl.", "Electricity metered", "Gas metered"],
    available: "Aug 1, 2026",
    lease: "12 months",
    rules: ["No smoking indoors", "Pets on approval", "Quiet hours 10pm–8am"],
    owner: { name: "Marta Silva", avatar: "M", verified: true, phone: "+351 910 000 000" },
    nearby: [
      { name: "Rossio Metro", type: "Transit", distance: "4 min walk" },
      { name: "Fábrica Coffee", type: "Café", distance: "2 min walk" },
      { name: "Jardim da Estrela", type: "Park", distance: "9 min walk" },
    ],
    description:
      "A sunlit loft carved into the old quarter — arched windows, oak floors, and a private terrace overlooking the terracotta rooftops.",
    coords: { x: 32, y: 40 },
  },
  {
    id: "studio-nord",
    title: "Studio Nord",
    type: "room",
    address: "8B Linnégatan",
    neighborhood: "Östermalm",
    city: "Stockholm",
    rent: 780,
    deposit: 780,
    beds: 1,
    baths: 1,
    area: 420,
    rating: 4.7,
    reviews: 64,
    images: [p2, p5, p1],
    amenities: ["Wi-Fi", "Shared kitchen", "Bike storage", "Laundry"],
    utilities: ["All utilities included"],
    available: "Sep 15, 2026",
    lease: "6–12 months",
    rules: ["No parties", "Non-smoking building"],
    owner: { name: "Erik Nyström", avatar: "E", verified: true, phone: "+46 70 000 0000" },
    nearby: [
      { name: "Karlaplan T-bana", type: "Transit", distance: "3 min" },
      { name: "ICA Supermarket", type: "Grocery", distance: "5 min" },
    ],
    description: "A quiet, light-drenched room in a historic building steps from the metro.",
    coords: { x: 58, y: 22 },
  },
  {
    id: "atelier-office",
    title: "Atelier Workspace",
    type: "office",
    address: "3rd floor, Ivy House",
    neighborhood: "Shoreditch",
    city: "London",
    rent: 3200,
    deposit: 6400,
    beds: 0,
    baths: 2,
    area: 2100,
    rating: 4.8,
    reviews: 42,
    images: [p3, p1, p2],
    amenities: ["1 Gbps fiber", "24/7 access", "Meeting rooms", "Kitchen", "Bike parking"],
    utilities: ["Utilities incl.", "Cleaning weekly"],
    available: "Immediate",
    lease: "12–36 months",
    rules: ["Business use only", "No overnight stays"],
    owner: { name: "Ivy House Ltd.", avatar: "I", verified: true, phone: "+44 20 0000 0000" },
    nearby: [
      { name: "Old Street Station", type: "Transit", distance: "6 min" },
      { name: "Ozone Coffee", type: "Café", distance: "3 min" },
    ],
    description: "A creative studio-office with warehouse bones — pendant lights, exposed steel, and long oak desks.",
    coords: { x: 45, y: 66 },
  },
  {
    id: "corner-store",
    title: "Corner Retail",
    type: "store",
    address: "12 Fitzwilliam Ln",
    neighborhood: "South Docks",
    city: "Dublin",
    rent: 2400,
    deposit: 4800,
    beds: 0,
    baths: 1,
    area: 640,
    rating: 4.6,
    reviews: 18,
    images: [p4, p3, p1],
    amenities: ["Storefront windows", "Basement storage", "3-phase power", "Signage rights"],
    utilities: ["Electricity metered", "Water incl."],
    available: "Oct 1, 2026",
    lease: "24–60 months",
    rules: ["Retail / F&B permitted", "No late-night operation"],
    owner: { name: "Ferndale Estates", avatar: "F", verified: true, phone: "+353 1 000 0000" },
    nearby: [
      { name: "Grand Canal Dock", type: "Transit", distance: "5 min" },
      { name: "Herbert Park", type: "Park", distance: "12 min" },
    ],
    description: "A corner storefront with wraparound windows on a high-foot-traffic cobblestone street.",
    coords: { x: 72, y: 55 },
  },
  {
    id: "reader-room",
    title: "Reader's Room",
    type: "room",
    address: "24 Rue des Lilas",
    neighborhood: "Le Marais",
    city: "Paris",
    rent: 950,
    deposit: 950,
    beds: 1,
    baths: 1,
    area: 320,
    rating: 4.9,
    reviews: 87,
    images: [p5, p2, p1],
    amenities: ["Wi-Fi", "Furnished", "Library", "Balcony"],
    utilities: ["All included"],
    available: "Jul 20, 2026",
    lease: "3–12 months",
    rules: ["No smoking", "Quiet building"],
    owner: { name: "Camille Rousseau", avatar: "C", verified: true, phone: "+33 6 00 00 00 00" },
    nearby: [
      { name: "Saint-Paul Métro", type: "Transit", distance: "4 min" },
      { name: "Place des Vosges", type: "Park", distance: "7 min" },
    ],
    description: "A writer's room lined with books and sunlight, in the heart of Le Marais.",
    coords: { x: 20, y: 72 },
  },
];

export function getProperty(id: string) {
  return properties.find((p) => p.id === id);
}

export const savedIds = ["loft-arches", "reader-room"];

export const conversations = [
  { id: "c1", name: "Marta Silva", property: "The Arches Loft", last: "Sure — noon on Saturday works.", time: "2m", unread: 2, avatar: "M" },
  { id: "c2", name: "Erik Nyström", property: "Studio Nord", last: "I've attached the lease draft.", time: "1h", unread: 0, avatar: "E" },
  { id: "c3", name: "Ivy House", property: "Atelier Workspace", last: "Tour confirmed for Tuesday.", time: "Yesterday", unread: 0, avatar: "I" },
  { id: "c4", name: "Camille Rousseau", property: "Reader's Room", last: "Bonjour! Merci for your interest.", time: "Wed", unread: 1, avatar: "C" },
];

export const chatMessages = [
  { from: "them", text: "Hi! Welcome — happy to answer any questions about the loft.", time: "10:12" },
  { from: "me", text: "Hi Marta! Is the terrace fully private?", time: "10:14" },
  { from: "them", text: "Yes — accessed only from the unit. Would you like a virtual tour first?", time: "10:15" },
  { from: "me", text: "That would be great. Also — can we schedule a visit for Saturday?", time: "10:16" },
  { from: "them", text: "Sure — noon on Saturday works.", time: "10:18" },
];

export const applications = [
  { id: "a1", property: "The Arches Loft", status: "Under review", step: 2, city: "Lisbon", updated: "Today" },
  { id: "a2", property: "Reader's Room", status: "Scheduled visit", step: 1, city: "Paris", updated: "Yesterday" },
  { id: "a3", property: "Atelier Workspace", status: "Approved · Sign lease", step: 3, city: "London", updated: "Mon" },
];

export const notifications = [
  { id: "n1", title: "Visit confirmed", body: "Marta confirmed your Saturday 12:00 visit.", time: "2m", unread: true },
  { id: "n2", title: "New match", body: "3 new lofts in Lisbon match your saved search.", time: "1h", unread: true },
  { id: "n3", title: "Application update", body: "Atelier Workspace — approved.", time: "Mon", unread: false },
  { id: "n4", title: "Reminder", body: "Your lease at Studio Nord renews in 30 days.", time: "Sun", unread: false },
];

/* Owner mock data */
export const ownerListings = [
  { id: "loft-arches", title: "The Arches Loft", city: "Lisbon", rent: 1850, status: "Occupied", views: 1240, leads: 38 },
  { id: "atelier-office", title: "Atelier Workspace", city: "London", rent: 3200, status: "Available", views: 890, leads: 22 },
  { id: "corner-store", title: "Corner Retail", city: "Dublin", rent: 2400, status: "Available", views: 412, leads: 9 },
];

export const analyticsData = [
  { month: "Feb", views: 620, leads: 12 },
  { month: "Mar", views: 780, leads: 18 },
  { month: "Apr", views: 940, leads: 22 },
  { month: "May", views: 1120, leads: 30 },
  { month: "Jun", views: 1380, leads: 41 },
  { month: "Jul", views: 1590, leads: 52 },
];

export const ownerTenants = [
  { id: "t1", name: "Ana Duarte", property: "The Arches Loft", verified: true, since: "Jan 2026", rent: "Paid" },
  { id: "t2", name: "Jonas Weber", property: "Atelier Workspace", verified: true, since: "Mar 2026", rent: "Paid" },
  { id: "t3", name: "Lea Fischer", property: "Reader's Room", verified: false, since: "Pending", rent: "—" },
];
