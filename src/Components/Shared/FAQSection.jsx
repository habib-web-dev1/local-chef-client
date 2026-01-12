import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does LocalChef work?",
      answer:
        "LocalChef connects you with talented home chefs in your neighborhood. Browse daily menus, place orders, and enjoy fresh homemade meals delivered to your door. Our chefs prepare each meal with love and care, just like home cooking should be.",
    },
    {
      question: "Are the chefs verified and safe?",
      answer:
        "Absolutely! All our chefs go through a thorough verification process including background checks, kitchen inspections, and food safety certifications. We maintain strict hygiene standards and regularly monitor our chef partners to ensure your safety.",
    },
    {
      question: "What areas do you deliver to?",
      answer:
        "We currently serve 12 cities and are rapidly expanding. Check our website or app to see if we deliver to your area. We're constantly adding new neighborhoods and would love to bring LocalChef to your community soon!",
    },
    {
      question: "How fresh are the meals?",
      answer:
        "All meals are prepared fresh daily by our chef partners using locally-sourced ingredients. Most meals are cooked within 2-4 hours of delivery to ensure maximum freshness and flavor. We never serve reheated or day-old food.",
    },
    {
      question: "What if I have dietary restrictions?",
      answer:
        "Many of our chefs offer vegetarian, vegan, gluten-free, and other dietary options. You can filter meals by dietary preferences and communicate directly with chefs about specific requirements. We believe everyone deserves delicious homemade food!",
    },
    {
      question: "How do payments work?",
      answer:
        "We accept all major credit cards, debit cards, and digital wallets. Payment is processed securely through our platform only after your order is confirmed by the chef. You can also save your preferred payment methods for faster checkout.",
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer:
        "Your satisfaction is our priority! If you're not happy with your meal, contact our support team within 24 hours. We'll work with you and the chef to resolve any issues, and if needed, provide a full refund or replacement meal.",
    },
    {
      question: "Can I become a chef on LocalChef?",
      answer:
        "Yes! We're always looking for passionate home cooks to join our community. Apply through our website, complete the verification process, and start sharing your culinary creations with neighbors. It's a great way to earn income doing what you love.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl mb-6">
            <FaQuestionCircle className="text-2xl text-orange-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Frequently Asked <span className="text-orange-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Got questions? We've got answers! Here are the most common questions
            about LocalChef and how our platform works.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <FaChevronDown className="text-orange-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-lg mb-6 opacity-90">
              Our friendly support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/help"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Help Center
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
