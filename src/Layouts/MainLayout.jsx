import React from "react";
import { Outlet } from "react-router";

import { ToastContainer } from "react-toastify"; // For notifications
import Container from "../Components/Shared/Container";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const MainLayout = () => {
  return (
    <Container>
      <div className="flex flex-col min-h-screen">
        {/* 1. Navbar/Header (Navigation) */}
        <Navbar />

        {/* 2. Main Content Area */}
        {/* The <Outlet /> renders the content of the matched child route (e.g., Home, AllMeals) */}

        <Outlet />

        {/* 3. Footer */}
        <Footer />

        {/* Global Toast Container for notifications */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Container>
  );
};

export default MainLayout;
