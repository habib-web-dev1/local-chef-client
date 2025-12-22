import React from "react";

import HeroSection from "../Components/Shared/HeroSection";
import HowItWorks from "../Components/Shared/HowItWorks";
import DailyMeals from "../Components/Shared/DailyMeals";
import CustomerReviews from "../Components/Shared/CustomerReviews";
import TopChefs from "../Components/Shared/TopChefs";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        {/* Dynamic Title Requirement */}
        <title>Home | LocalChefBazaar - Homemade Meals Delivered</title>
      </Helmet>

      <main className="min-h-screen">
        {/* 1. Animated Hero/Banner Section (Framer Motion) */}
        <HeroSection />

        {/* 2. Extra Section: How It Works */}
        <HowItWorks />

        {/* 3. Dynamic Daily Meals Section (Shows 6 Data in Card Layout) */}
        <DailyMeals />

        {/* 4. Customer Reviews section */}
        <CustomerReviews />
        <TopChefs></TopChefs>
      </main>
    </>
  );
};

export default Home;
