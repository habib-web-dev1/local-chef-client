import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheck, FaBell, FaGift } from "react-icons/fa";
import Button from "../UI/Button";
import Input from "../UI/Input";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  const benefits = [
    {
      icon: FaBell,
      title: "New Chef Alerts",
      description: "Be the first to know when new chefs join your area",
    },
    {
      icon: FaGift,
      title: "Exclusive Offers",
      description: "Get special discounts and early access to promotions",
    },
    {
      icon: FaEnvelope,
      title: "Weekly Highlights",
      description: "Discover trending meals and chef recommendations",
    },
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-6"
            >
              <FaCheck className="text-3xl text-green-600" />
            </motion.div>

            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              Welcome to the Family! 🎉
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              You're now subscribed to LocalChef updates. Get ready for
              delicious discoveries and exclusive offers delivered straight to
              your inbox!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = "/meals")}
              >
                Start Exploring Meals
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsSubscribed(false)}
              >
                Subscribe Another Email
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl mb-6">
              <FaEnvelope className="text-2xl text-orange-600" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Stay in the <span className="text-orange-600">Loop</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Join over 10,000 food lovers who get the inside scoop on new
              chefs, exclusive deals, and mouth-watering meal recommendations
              delivered weekly to their inbox.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm">
                    <benefit.icon className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Get Exclusive Updates
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<FaEnvelope />}
                  required
                  size="lg"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  disabled={!email || isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </form>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                No spam, ever. Unsubscribe anytime with one click.
              </p>

              {/* Social Proof */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span>Join 10,000+ subscribers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
