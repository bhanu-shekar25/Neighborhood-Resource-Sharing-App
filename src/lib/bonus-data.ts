export interface MapItem {
  itemId: string;
  lat: number;
  lng: number;
  address: string;
  name: string;
  category: string;
}

export const mockMapItems: MapItem[] = [
  {
    itemId: "itm001",
    lat: 28.4595,
    lng: 77.0266,
    address: "Block A, Sector 45",
    name: "Cordless Drill",
    category: "Tools"
  },
  {
    itemId: "itm002",
    lat: 28.4652,
    lng: 77.0565,
    address: "Block B, Sector 50",
    name: "Camping Tent",
    category: "Outdoors"
  },
  {
    itemId: "itm003",
    lat: 28.4612,
    lng: 77.0316,
    address: "Block C, Sector 47",
    name: "Crock Pot",
    category: "Kitchen"
  },
  {
    itemId: "itm004",
    lat: 28.4672,
    lng: 77.0415,
    address: "Block D, Sector 52",
    name: "Yoga Mat",
    category: "Fitness"
  },
  {
    itemId: "itm005",
    lat: 28.4632,
    lng: 77.0365,
    address: "Block E, Sector 48",
    name: "Ladder",
    category: "Tools"
  },
  {
    itemId: "itm006",
    lat: 28.4692,
    lng: 77.0465,
    address: "Block F, Sector 54",
    name: "Board Game: Settlers of Catan",
    category: "Games"
  }
];

export interface TrustScore {
  userId: string;
  name: string;
  trustScore: number;
  lendingCount: number;
  borrowingCount: number;
  positiveFeedback: number;
}

export const mockTrustScore: TrustScore = {
  userId: "usr123",
  name: "Alice Johnson",
  trustScore: 9.5,
  lendingCount: 7,
  borrowingCount: 2,
  positiveFeedback: 97
};

export interface BorrowRequest {
  id: string;
  itemId: string;
  itemName: string;
  status: "pending" | "approved" | "returned" | "rejected";
  requestDate: string;
  userId: string;
  userName: string;
}

export const mockRequests: BorrowRequest[] = [
  {
    id: "req001",
    itemId: "itm001",
    itemName: "Cordless Drill",
    status: "pending",
    requestDate: "2024-01-15",
    userId: "usr456",
    userName: "John Smith"
  },
  {
    id: "req002",
    itemId: "itm003",
    itemName: "Crock Pot",
    status: "approved",
    requestDate: "2024-01-10",
    userId: "usr789",
    userName: "Prachi Patel"
  },
  {
    id: "req003",
    itemId: "itm002",
    itemName: "Camping Tent",
    status: "returned",
    requestDate: "2024-01-05",
    userId: "usr123",
    userName: "Alice Johnson"
  }
];