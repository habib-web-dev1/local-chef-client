import React from "react";
import { Outlet } from "react-router";

import { ToastContainer } from "react-toastify";
import Container from "../Components/Shared/Container";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const MainLayout = () => {
  return (
    <Container>
      <div className="flex flex-col min-h-screen">
        {/*  Navbar/Header (Navigation) */}
        <Navbar />

        {/*  Main Content Area */}

        <Outlet />

        {/*  Footer */}
        <Footer />

        {/* Global Toast Container for notifications */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Container>
  );
};

export default MainLayout;
