Here’s a **GitHub README.md** for your **Neighborhood Resource Sharing App**. It’s structured professionally and clearly showcases your work, with badges and markdown formatting that make it visually appealing and informative:

---

# 🏘️ Neighborhood Resource Sharing App

A modern, fully-featured web application that enables community members to share resources within their neighborhood — helping promote sustainability, trust, and collaboration.

![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn/ui-FF69B4)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 🚀 Live Demo

> Currently running locally at: [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

### ✅ Core Pages & Functionality

#### 🏠 Home / Catalog Page (`/`)

* Grid layout of items with images, names, and availability
* Full search functionality (name + description)
* Filters: by category and availability
* Responsive and mobile-friendly UI
* Easy navigation to all other pages

#### 📄 Item Details Page (`/items/:id`)

* Detailed item view: image, owner, category, condition, availability
* "Request to Borrow" feature with mock API integration
* Community guidelines section for safe lending
* Availability and condition indicators

#### ➕ Add New Item Page (`/add-item`)

* Full item submission form with validation
* Category and condition dropdowns
* Image URL input + random image generator
* Success/failure feedback after submission

### 🎁 Bonus Features

#### 📬 My Requests Page (`/my-requests`)

* Track borrowing requests (pending, approved, returned, rejected)
* Cancel request functionality
* Request statistics dashboard
* Notifications for updates

#### 🗺️ Map View Page (`/map`)

* Interactive map with item location pins
* Color-coded availability
* Filters for category and availability
* Sidebar showing item details and map legend

#### 👤 User Profile Page (`/profile`)

* User info display with edit functionality
* Trust score and community achievements
* Item management (owned/lent/borrowed)
* Lending and borrowing statistics

#### ❌ 404 Not Found Page

* Friendly UI with helpful suggestions
* Navigation back to home

---

## 📡 API Endpoints

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/api/items`               | Fetch all items                  |
| GET    | `/api/items/:id`           | Fetch item details by ID         |
| POST   | `/api/items`               | Add new item                     |
| POST   | `/api/items/:id/request`   | Request to borrow an item        |
| GET    | `/api/requests`            | Get user request history         |
| GET    | `/api/map-items`           | Get items with map location data |
| GET    | `/api/trust-score/:userId` | Fetch user’s trust score         |

---

## 🛠 Tech Stack

### 🔧 Frontend

* **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
* **Language**: TypeScript 5
* **Styling**: Tailwind CSS 4
* **Components**: [shadcn/ui](https://ui.shadcn.dev)
* **Icons**: [Lucide React](https://lucide.dev)
* **State Management**: React hooks + local state
* **Data Fetching**: Native fetch API + `useEffect`

### ⚙️ Backend

* **API**: RESTful API using [Next.js API Routes](https://nextjs.org/docs/pages/api-reference)
* **Data**: In-memory mock data (no persistent DB)
* **Validation**: Client and server-side form validation
* **Error Handling**: HTTP status codes with descriptive error messages
* **Mock Behavior**: Randomized success/failure simulations

---

## 🧠 Data Model

* **Items**: Name, image, condition, availability, location
* **Requests**: Status tracking (pending, approved, returned, rejected)
* **Trust Score**: Simulated user reputation system
* **Map Items**: Geolocation mock data

---

## 🎨 UI/UX Highlights

* Responsive mobile-first layout
* Search + advanced filtering
* Smooth transitions and hover effects
* Status indicators (badges for availability & request status)
* Accessible with semantic HTML & ARIA roles
* Meaningful error and loading states

---

## 📁 Folder Structure

```
src/
├── app/                 # App router pages (Next.js 15)
├── components/          # Reusable UI components (shadcn/ui based)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helper functions
└── data/                # Mock data (items, requests, map, users)
```

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/neighborhood-resource-sharing.git

# 2. Navigate into the project directory
cd neighborhood-resource-sharing

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev

# 5. Open in browser
http://localhost:3000
```

---

## ✅ Status

The project is **100% complete** with all core and bonus features implemented. It follows modern best practices in Next.js, TypeScript, and responsive UI development.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).




