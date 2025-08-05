export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  category: string;
  description: string;
}

export const sliderProducts: Product[] = [
  {
    id: 1,
    name: "Midnight Velvet Coat",
    price: "$129.99",
    originalPrice: "$179.99",
    image: "/images/Product/midnight-velvet-coat.png",
    category: "Outerwear",
    description: "Luxurious velvet coat perfect for your dark aesthetic"
  },
  {
    id: 2,
    name: "Gothic Rose Dress",
    price: "$89.99",
    originalPrice: "$119.99",
    image: "/images/Product/gothic-rose-dress.png",
    category: "Dresses",
    description: "Elegant gothic dress with intricate rose patterns"
  },
  {
    id: 3,
    name: "Dark Academia Blazer",
    price: "$149.99",
    originalPrice: "$199.99",
    image: "/images/Product/dark-academia-blazer.png",
    category: "Formal",
    description: "Classic blazer for the intellectual gothic look"
  },
  {
    id: 4,
    name: "Vampire Crown Necklace",
    price: "$39.99",
    originalPrice: "$59.99",
    image: "/images/Product/vampire-crown-necklace.png",
    category: "Accessories",
    description: "Stunning crown necklace to complete your vampire ensemble"
  }
];

export interface Category {
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  { name: "Dark Academia", icon: "📚", description: "Intellectual gothic vibes" },
  { name: "Vampire Chic", icon: "🧛‍♀️", description: "Classic vampire aesthetic" },
  { name: "Gothic Street", icon: "🖤", description: "Urban dark fashion" },
  { name: "Accessories", icon: "👑", description: "Complete your look" }
];
