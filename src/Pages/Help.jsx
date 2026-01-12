import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaQuestionCircle,
  FaUser,
  FaUtensils,
  FaCreditCard,
  FaTruck,
  FaCog,
  FaShieldAlt,
  FaChevronRight,
  FaBook,
  FaVideo,
  FaHeadset,
} from "react-icons/fa";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";

import { useState } from "react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: FaBook, color: "text-gray-600" },
    {
      id: "account",
      name: "Account & Profile",
      icon: FaUser,
      color: "text-blue-500",
    },
    {
      id: "ordering",
      name: "Ordering Food",
      icon: FaUtensils,
      color: "text-orange-500",
    },
    {
      id: "payment",
      name: "Payment & Billing",
      icon: FaCreditCard,
      color: "text-green-500",
    },
    {
      id: "delivery",
      name: "Delivery & Pickup",
      icon: FaTruck,
      color: "text-purple-500",
    },
    { id: "chef", name: "For Chefs", icon: FaCog, color: "text-red-500" },
    {
      id: "safety",
      name: "Safety & Security",
      icon: FaShieldAlt,
      color: "text-indigo-500",
    },
  ];

  const helpArticles = [
    {
      id: 1,
      category: "account",
      title: "How to create an account",
      description: "Step-by-step guide to signing up for LocalChef",
      readTime: "2 min read",
      popular: true,
    },
    {
      id: 2,
      category: "account",
      title: "Updating your profile information",
      description: "Learn how to edit your personal details and preferences",
      readTime: "3 min read",
      popular: false,
    },
    {
      id: 3,
      category: "ordering",
      title: "How to place your first order",
      description: "Complete guide to browsing menus and placing orders",
      readTime: "4 min read",
      popular: true,
    },
    {
      id: 4,
      category: "ordering",
      title: "Managing your favorites",
      description: "Save and organize your favorite meals and chefs",
      readTime: "2 min read",
      popular: false,
    },
    {
      id: 5,
      category: "payment",
      title: "Payment methods and security",
      description:
        "Understanding accepted payment methods and security measures",
      readTime: "3 min read",
      popular: true,
    },
    {
      id: 6,
      category: "payment",
      title: "Refunds and cancellations",
      description: "How to request refunds and cancel orders",
      readTime: "4 min read",
      popular: false,
    },
    {
      id: 7,
      category: "delivery",
      title: "Delivery times and tracking",
      description: "Understanding delivery estimates and order tracking",
      readTime: "3 min read",
      popular: true,
    },
    {
      id: 8,
      category: "delivery",
      title: "Delivery areas and fees",
      description: "Check if we deliver to your area and understand fees",
      readTime: "2 min read",
      popular: false,
    },
    {
      id: 9,
      category: "chef",
      title: "Becoming a LocalChef partner",
      description: "Requirements and application process for chefs",
      readTime: "5 min read",
      popular: true,
    },
    {
      id: 10,
      category: "chef",
      title: "Managing your chef profile",
      description: "Tips for creating an attractive chef profile",
      readTime: "4 min read",
      popular: false,
    },
    {
      id: 11,
      category: "safety",
      title: "Food safety standards",
      description: "Our commitment to food safety and hygiene",
      readTime: "3 min read",
      popular: true,
    },
    {
      id: 12,
      category: "safety",
      title: "Reporting issues and concerns",
      description: "How to report problems with orders or chefs",
      readTime: "2 min read",
      popular: false,
    },
  ];

  const quickActions = [
    {
      icon: FaHeadset,
      title: "Live Chat Support",
      description: "Chat with our support team",
      action: "Start Chat",
      color: "bg-blue-500",
    },
    {
      icon: FaVideo,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      action: "Watch Videos",
      color: "bg-red-500",
    },
    {
      icon: FaQuestionCircle,
      title: "Contact Support",
      description: "Send us a message",
      action: "Contact Us",
      color: "bg-green-500",
    },
  ];

  const filteredArticles = helpArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularArticles = helpArticles.filter((article) => article.popular);

  return (
    <>
      <Helmet>
        <title>Help Center | LocalChefBazaar - Support & Guides</title>
        <meta
          name="description"
          content="Find answers to common questions, browse help articles, and get support for LocalChefBazaar. We're here to help!"
        />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-8">
                <FaQuestionCircle className="text-3xl text-orange-600" />
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                How can we <span className="text-orange-600">help</span> you?
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Search our help center for answers, guides, and support articles
              </p>

              <div className="max-w-2xl mx-auto">
                <Input
                  size="lg"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<FaSearch />}
                  className="text-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 ${action.color} rounded-2xl mb-4`}
                    >
                      <action.icon className="text-2xl text-white" />
                    </div>
                    <Card.Title size="md" className="mb-2">
                      {action.title}
                    </Card.Title>
                    <Card.Description className="mb-4">
                      {action.description}
                    </Card.Description>
                    <Button variant="outline" size="sm">
                      {action.action}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        {searchQuery === "" && selectedCategory === "all" && (
          <section className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  Popular Articles
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Most frequently viewed help articles
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Card.Title
                            size="sm"
                            className="mb-2 group-hover:text-orange-600 transition-colors"
                          >
                            {article.title}
                          </Card.Title>
                          <Card.Description className="text-sm">
                            {article.description}
                          </Card.Description>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-orange-600 transition-colors ml-2 flex-shrink-0" />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {article.readTime}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories and Articles */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Browse by Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                        selectedCategory === category.id
                          ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <category.icon
                        className={`${category.color} ${
                          selectedCategory === category.id
                            ? "text-orange-600"
                            : ""
                        }`}
                      />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles List */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCategory === "all"
                      ? "All Articles"
                      : categories.find((c) => c.id === selectedCategory)?.name}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">
                    {filteredArticles.length} articles
                  </span>
                </div>

                {filteredArticles.length === 0 ? (
                  <Card className="text-center py-12">
                    <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
                    <Card.Title size="lg" className="mb-2">
                      No articles found
                    </Card.Title>
                    <Card.Description>
                      Try adjusting your search or browse different categories
                    </Card.Description>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Card.Title
                                  size="md"
                                  className="group-hover:text-orange-600 transition-colors"
                                >
                                  {article.title}
                                </Card.Title>
                                {article.popular && (
                                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs font-bold rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <Card.Description className="mb-2">
                                {article.description}
                              </Card.Description>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {article.readTime}
                              </div>
                            </div>
                            <FaChevronRight className="text-gray-400 group-hover:text-orange-600 transition-colors ml-4 flex-shrink-0" />
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-500">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-black mb-6">Still need help?</h2>
              <p className="text-xl mb-8 opacity-90">
                Can't find what you're looking for? Our support team is here to
                help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  Start Live Chat
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Help;
