import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaGavel,
  FaUserCheck,
  FaUtensils,
  FaCreditCard,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "../Components/UI/Card";

const TermsOfService = () => {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FaUserCheck,
      content: [
        "By accessing and using LocalChefBazaar, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our platform",
        "We may update these terms from time to time, and continued use constitutes acceptance",
        "You must be at least 18 years old to use our services",
        "You are responsible for ensuring your use complies with local laws",
      ],
    },
    {
      id: "user-accounts",
      title: "User Accounts and Responsibilities",
      icon: FaUserCheck,
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the security of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "One person may not maintain multiple accounts without our permission",
        "You are liable for all activities that occur under your account",
      ],
    },
    {
      id: "platform-use",
      title: "Platform Use and Conduct",
      icon: FaUtensils,
      content: [
        "Use our platform only for lawful purposes and in accordance with these terms",
        "Do not attempt to interfere with or disrupt our services or servers",
        "Respect other users and maintain appropriate conduct in all interactions",
        "Do not post false, misleading, or inappropriate content",
        "Report any violations of these terms or suspicious activities to us",
      ],
    },
    {
      id: "orders-payments",
      title: "Orders and Payments",
      icon: FaCreditCard,
      content: [
        "All orders are subject to acceptance by the respective chef",
        "Prices are clearly displayed and include applicable taxes and fees",
        "Payment is required at the time of order placement",
        "We use secure third-party payment processors for all transactions",
        "Refunds are processed according to our refund policy",
      ],
    },
    {
      id: "chef-responsibilities",
      title: "Chef Responsibilities",
      icon: FaUtensils,
      content: [
        "Chefs must comply with all local food safety and business regulations",
        "Provide accurate descriptions and images of meals offered",
        "Maintain high standards of food quality and hygiene",
        "Fulfill orders promptly and communicate any delays to customers",
        "Handle customer complaints professionally and work toward resolution",
      ],
    },
    {
      id: "liability-disclaimers",
      title: "Liability and Disclaimers",
      icon: FaShieldAlt,
      content: [
        "LocalChefBazaar acts as a platform connecting customers with independent chefs",
        "We are not responsible for the quality, safety, or legality of meals provided by chefs",
        "Our liability is limited to the maximum extent permitted by law",
        "We provide the platform 'as is' without warranties of any kind",
        "Users assume responsibility for their interactions with other platform users",
      ],
    },
    {
      id: "termination",
      title: "Account Termination",
      icon: FaExclamationTriangle,
      content: [
        "We may suspend or terminate accounts that violate these terms",
        "You may delete your account at any time through your profile settings",
        "Upon termination, your access to the platform will be immediately revoked",
        "We reserve the right to retain certain information as required by law",
        "Termination does not affect any outstanding obligations or liabilities",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service | LocalChefBazaar - Platform Guidelines</title>
        <meta
          name="description"
          content="Read LocalChefBazaar's Terms of Service to understand your rights and responsibilities when using our platform to connect with local chefs."
        />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-8">
                <FaGavel className="text-3xl text-green-600" />
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                Terms of <span className="text-green-600">Service</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Understanding your rights and responsibilities when using
                LocalChefBazaar platform
              </p>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-left">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Last Updated:</strong> January 12, 2026
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Effective Date:</strong> January 1, 2026
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="mb-8">
                <Card.Title size="lg" className="mb-4">
                  Welcome to LocalChefBazaar
                </Card.Title>
                <Card.Description className="text-base leading-relaxed">
                  These Terms of Service ("Terms") govern your use of the
                  LocalChefBazaar platform, which connects food enthusiasts with
                  talented local chefs offering homemade meals. By using our
                  services, you enter into a legal agreement with us.
                </Card.Description>
                <Card.Description className="text-base leading-relaxed mt-4">
                  Please read these terms carefully before using our platform.
                  Your access to and use of our service is conditioned on your
                  acceptance of and compliance with these Terms. If you disagree
                  with any part of these terms, you may not access the service.
                </Card.Description>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                        <section.icon className="text-xl text-green-600" />
                      </div>
                      <div className="flex-1">
                        <Card.Title size="lg" className="mb-4">
                          {section.title}
                        </Card.Title>
                        <ul className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                            >
                              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10">
                <div className="flex items-start gap-4">
                  <FaExclamationTriangle className="text-2xl text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <Card.Title
                      size="md"
                      className="mb-3 text-amber-800 dark:text-amber-200"
                    >
                      Important Legal Notice
                    </Card.Title>
                    <Card.Description className="text-amber-700 dark:text-amber-300 leading-relaxed">
                      LocalChefBazaar operates as a marketplace platform
                      connecting customers with independent chefs. We facilitate
                      transactions but are not directly responsible for food
                      preparation, quality, or delivery. All chefs operate as
                      independent contractors and are responsible for complying
                      with local health, safety, and business regulations.
                    </Card.Description>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-black mb-6">
                Questions About Our Terms?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Need clarification on any of our terms? Our legal team is here
                to help you understand your rights and obligations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Contact Legal Team
                </a>
                <a
                  href="mailto:legal@localchefbazaar.com"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-600 transition-colors"
                >
                  legal@localchefbazaar.com
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TermsOfService;
