<div align="center">

# 🍽️ LocalChef Bazaar — Client

### _Discover fresh, affordable, home-cooked food made by local chefs in your neighborhood._

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Visit_Now-orange?style=for-the-badge)](https://local-chef-client.vercel.app)
[![Client Repo](https://img.shields.io/badge/GitHub-Client_Repo-181717?style=for-the-badge&logo=github)](https://github.com/habib-web-dev1/local-chef-client)
[![Server Repo](https://img.shields.io/badge/GitHub-Server_Repo-181717?style=for-the-badge&logo=github)](https://github.com/habib-web-dev1/local-chef-server)

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat-square&logo=stripe&logoColor=white)

</div>

---

## ✨ About The Project

**LocalChef Bazaar** is a full-stack web platform that connects food lovers with talented local chefs. Customers can browse homemade meals, place orders, leave reviews, and manage their food experience — all in one place. Chefs get a dedicated dashboard to manage their menu and orders, while admins oversee the entire platform.

---

## 🚀 Live Demo

🔗 **[https://local-chef-client.vercel.app](https://local-chef-client.vercel.app)**

---

## 📸 Features at a Glance

### 🏠 Home Page

- Animated **Hero Section** with call-to-action
- **Features Section** — Why choose LocalChef
- **How It Works** — Step-by-step guide
- **Daily Meals** — Featured meals of the day
- **Statistics** — Platform impact numbers
- **Customer Reviews & Testimonials**
- **Top Chefs Showcase**
- **FAQ Section**
- **Newsletter Signup**

### 🍱 Meals

- Browse all available meals with filters and search
- Detailed **Meal Details** page (protected route)
- Place orders with **Stripe payment integration**

### 🔐 Authentication

- Email/password login and registration
- **Firebase Authentication**
- JWT-secured protected routes

### 📊 Role-Based Dashboard

| Role      | Features                                                 |
| --------- | -------------------------------------------------------- |
| **User**  | Profile, Order history, Favorite meals, My reviews       |
| **Chef**  | Create/Update/Delete meals, View & manage order requests |
| **Admin** | Platform statistics, Manage users, Manage all requests   |

### 🎨 UI & UX

- **Dark / Light mode** toggle
- Fully **responsive** design (mobile-first)
- Smooth animations via **Framer Motion**
- Skeleton loaders for better loading experience
- Toast notifications & SweetAlert2 dialogs
- Reusable design system with custom UI components

---

## 🛠️ Tech Stack

| Category       | Technology                   |
| -------------- | ---------------------------- |
| Framework      | React 19 + Vite 7            |
| Styling        | Tailwind CSS v4 + DaisyUI    |
| Routing        | React Router v7              |
| Data Fetching  | TanStack Query v5 + Axios    |
| Authentication | Firebase v12                 |
| Payments       | Stripe (react-stripe-js)     |
| Animations     | Framer Motion                |
| Charts         | Recharts                     |
| Forms          | React Hook Form              |
| Notifications  | React Toastify + SweetAlert2 |
| SEO            | React Helmet Async           |
| Icons          | React Icons + Lucide         |

---

## 📁 Project Structure

```
src/
├── assets/              # Static assets
├── Components/
│   ├── Shared/          # Navbar, Footer, HeroSection, MealCard...
│   └── UI/              # Button, Card, Input, Select, FormField...
├── context/             # AuthContext, DesignSystemContext
├── Firebase/            # Firebase config
├── Hooks/               # useAuth, useAxiosSecure, useTitle
├── Layouts/             # MainLayout
├── Pages/
│   ├── Auth/            # Login, Register
│   ├── Dashboard/
│   │   ├── Admin/       # ManageUsers, ManageRequests, PlatformStatistics
│   │   ├── Chef/        # CreateMeal, MyMeals, OrderRequests, UpdateMeal
│   │   └── User/        # MyProfile, MyOrders, FavoriteMeals, MyReviews
│   └── Shared/          # ErrorPage, PaymentSuccess
└── routes/              # Router config, PrivateRoute, AdminRoute, ChefRoute
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- A Firebase project
- A Stripe account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/habib-web-dev1/local-chef-client.git
cd local-chef-client

# 2. Install dependencies
npm install

# 3. Create environment variables
cp .env.local.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root with the following:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

VITE_SERVER_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Run Locally

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🔗 Related

- 🖥️ **Server Repository:** [local-chef-server](https://github.com/habib-web-dev1/local-chef-server)
- 🌐 **Live Site:** [local-chef-client.vercel.app](https://local-chef-client.vercel.app)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/habib-web-dev1">habib-web-dev1</a>
</div>
>>>>>>> 2629a0c (Readme file added)
