import React from "react";

import HeroSection from "../Components/Shared/HeroSection";
import FeaturesSection from "../Components/Shared/FeaturesSection";
import HowItWorks from "../Components/Shared/HowItWorks";
import DailyMeals from "../Components/Shared/DailyMeals";
import StatisticsSection from "../Components/Shared/StatisticsSection";
import CustomerReviews from "../Components/Shared/CustomerReviews";
import TopChefs from "../Components/Shared/TopChefs";
import FAQSection from "../Components/Shared/FAQSection";
import NewsletterSection from "../Components/Shared/NewsletterSection";
import CTASection from "../Components/Shared/CTASection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        {/* Dynamic Title Requirement */}
        <title>Home | LocalChefBazaar - Homemade Meals Delivered</title>
        <meta
          name="description"
          content="Discover fresh, affordable, home-cooked food made by local chefs in your neighborhood. Order authentic homemade meals delivered to your door."
        />
      </Helmet>

      <main className="min-h-screen">
        {/* 1. Enhanced Hero Section with Slider */}
        <HeroSection />

        {/* 2. Features Section - Why Choose LocalChef */}
        <FeaturesSection />

        {/* 3. How It Works Section */}
        <HowItWorks />

        {/* 4. Featured Daily Meals Section */}
        <DailyMeals />

        {/* 5. Statistics Section - Our Impact */}
        <StatisticsSection />

        {/* 6. Customer Reviews & Testimonials */}
        <CustomerReviews />

        {/* 7. Top Chefs Showcase */}
        <TopChefs />

        {/* 8. FAQ Section */}
        <FAQSection />

        {/* 9. Newsletter Signup */}
        <NewsletterSection />

        {/* 10. Final Call to Action */}
        <CTASection />
      </main>
    </>
  );
};

export default Home;
