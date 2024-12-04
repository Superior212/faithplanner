import { Product } from "@/lib/type";

export const products: Product[] = [
  {
    id: "1",
    name: "INSPIRING FAITH PLANNER AND JOURNAL (NOVEMBER-DECEMBER 2024)",
    price: 29.99,
    teaser: 19.99,
    description:
      "Get a sneak peek of what the the full yearly planner has to offer. With just over a month to go, it’s the perfect way to finish the year strong!",
    image: "/11.JPG",
    category: "daily",
    featured: true,
  },
  {
    id: "2",
    name: "INSPIRING FAITH PLANNER AND JOURNAL (JANUARY-APRIL 2025)",
    price: 29.99,
    // teaser: 19.99,
    description:
      "Faith planner combining prayer, productivity, and inspiration.",
    image: "/4.png",
    category: "academic",
    featured: true,
  },
  {
    id: "3",
    name: "INSPIRING FAITH PLANNER AND JOURNAL (MAY-AUGUST 2025)",
    price: 29.99,
    // teaser: 19.99,
    description:
      "Inspiring planner for faith, reflection, and daily organization.",
    image: "/2.png",
    category: "weekly",
    featured: true,
  },
  {
    id: "4",
    name: "INSPIRING FAITH PLANNER AND JOURNAL (SEPTEMBER-DECEMBER 2025)",
    price: 29.99,
    // teaser: 19.99,
    description:
      "Empowering planner for spiritual growth and daily inspiration.",
    image: "/1.png",
    category: "weekly",
    featured: true,
  },
  {
    id: "5",
    name: "Buy all planners for 2025 and save.",
    price: 79.99,
    description: "Great for a Holiday Gift",
    image: "/Giftbox.png",
    category: "weekly",
    featured: true,
  },
];

export const gallery = [
  { image: "/Mockup1.png" },
  { image: "/Mockup2.png" },
  { image: "/mockup3.png" },
];
