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
        <title>Home | LocalChefBazaar - Homemade Meals Delivered</title>
      </Helmet>
      <main className="min-h-screen">
        <HeroSection />
        <HowItWorks />
        <DailyMeals />
        <CustomerReviews />
        <TopChefs></TopChefs>
      </main>
    </>
  );
};

export default Home;
