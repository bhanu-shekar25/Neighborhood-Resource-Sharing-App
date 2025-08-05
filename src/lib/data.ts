export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  condition: string;
  available: boolean;
  image: string;
  borrowedBy?: string | null;
}

export const mockItems: Item[] = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description: "18V cordless drill, lightly used.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image: "https://plus.unsplash.com/premium_photo-1663076086194-5c16ee5ff183?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cG93ZXIlMjBkcmlsbHxlbnwwfHwwfHx8MA%3D%3D",
    borrowedBy: null
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description: "4-person waterproof tent, easy setup.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
    borrowedBy: null
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description: "Large 6-quart slow cooker, works great.",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",
    borrowedBy: "Prachi Patel"
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description: "Non-slip yoga mat, 6mm thick, blue color.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    borrowedBy: null
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    borrowedBy: null
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description: "Complete set, all pieces included.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    borrowedBy: null
  }
];

export const categories = [
  "All",
  "Tools",
  "Outdoors",
  "Kitchen",
  "Fitness",
  "Games"
];

export const conditions = [
  "Like New",
  "Excellent",
  "Very Good",
  "Good",
  "Fair"
];