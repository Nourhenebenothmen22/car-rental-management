# Car Rental Management - Frontend

A premium, high-impact car rental platform built with **React** and **Vite**, featuring modern design principles like glassmorphism, fluid animations, and a seamless user experience.

## ✨ Key Features

- **🚀 Immersive Hero Section**: A high-impact entrance with scroll-reveal animations and a floating car centerpiece.
- **🔍 Advanced Search**: Real-time filtering and search console for finding the perfect vehicle.
- **💎 Premium Car Details**: In-depth view for each vehicle with technical specifications, interactive price calculation, and a "vivid" booking console.
- **📅 Booking Management**: Tracking system for users to manage their reservations.
- **📊 Owner Dashboard**: A professional admin interface for fleet management, revenue tracking, and booking approvals.
- **📱 Ultra-Responsive**: Perfectly optimized for Desktop, Tablet, and Mobile.
- **🎨 Glassmorphism & Animations**: Sophisticated UI using translucency and staggered reveal animations.

## 🏗️ Component Architecture

The project follows a modular, component-based architecture for maximum maintainability:

### 📱 Main Layouts

- **MainLayout**: Orchestrates the user-facing side with the premium Navbar and Footer.
- **AdminLayout**: A specialized sidebar-driven layout for the Owner/Admin dashboard.

### 🧩 Core Components

- **CarSearch**: The primary entry point featuring a complex search console and visual hero section.
- **CarDetail**: A high-impact vehicle page with sticky booking logic and spec capsules.
- **Navbar**: A glassmorphic, responsive navigation bar with interactive active states.
- **ProtectedRoute**: A higher-order component ensuring secure access to owner-only features.

## 🎨 Design System & Styling

The frontend utilizes a custom-built design system centered around modern aesthetics:

- **CSS Variables**: A comprehensive set of tokens defined in `index.css` for colors (`--primary-color`), shadows (`--shadow-lg`), and transitions.
- **Glassmorphism**: Extensive use of `backdrop-filter: blur()` and semi-transparent backgrounds to create a layered, premium feel.
- **Scroll Reveal**: A custom `useScrollReveal` hook coupled with global CSS keyframes (`fadeUp`, `zoomIn`) to build anticipation as the user scrolls.
- **Micro-animations**: Subtle hover transitions and floating effects for high-value visual elements.

## ⚙️ State Management & Data

- **Zustand**: Used for lightweight, reactive state management across core features.
- **Intersection Observer**: Leveraged for the reveal animations to maintain high performance.
- **Routing**: Sophisticated nested routing using `react-router-dom` v7, handles dynamic vehicle IDs and multi-level admin paths.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Navigation**: [React Router DOM 7](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: Vanilla CSS (Modern Design System)
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Typography**: [Outfit (Google Fonts)](https://fonts.google.com/specimen/Outfit)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   ```

2. Navigate to the frontend directory:

   ```bash
   cd car-rental-management/frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📁 Project Structure

```bash
frontend/
├── src/
│   ├── assets/       # Static assets (images, icons, etc.)
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks (e.g., useScrollReveal)
│   ├── pages/        # Main page components (Home, CarSearch, etc.)
│   ├── App.jsx       # Routing and core logic
│   └── index.css     # Global design system & tokens
└── package.json      # Dependencies and scripts
```

## 📄 License

This project is licensed under the MIT License.
