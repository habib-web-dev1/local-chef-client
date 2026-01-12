import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUserShield,
  FaDatabase,
  FaCookieBite,
  FaEnvelope,
  FaGavel,
} from "react-icons/fa";
import Card from "../Components/UI/Card";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: FaDatabase,
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Payment information processed securely through our payment partners",
        "Order history and preferences to improve your experience",
        "Location data to facilitate meal delivery services",
        "Device and usage information to optimize our platform performance",
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: FaUserShield,
      content: [
        "Process and fulfill your meal orders",
        "Communicate with you about orders, promotions, and updates",
        "Improve our services and develop new features",
        "Ensure platform security and prevent fraudulent activities",
        "Comply with legal obligations and resolve disputes",
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: FaShieldAlt,
      content: [
        "We share order details with chefs to fulfill your requests",
        "Payment information is processed by secure third-party payment processors",
        "We may share aggregated, non-personal data for business analytics",
        "Legal authorities may receive information when required by law",
        "We never sell your personal information to third parties",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: FaCookieBite,
      content: [
        "We use essential cookies to maintain your login session",
        "Analytics cookies help us understand how you use our platform",
        "Preference cookies remember your settings and choices",
        "You can control cookie settings through your browser",
        "Some features may not work properly if cookies are disabled",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: FaGavel,
      content: [
        "We implement industry-standard security measures to protect your data",
        "All sensitive information is encrypted during transmission",
        "Regular security audits and updates to maintain protection",
        "Limited access to personal information on a need-to-know basis",
        "Immediate notification in case of any security breaches",
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: FaEnvelope,
      content: [
        "Access and review your personal information at any time",
        "Request corrections to inaccurate or incomplete data",
        "Delete your account and associated personal information",
        "Opt-out of marketing communications while keeping your account",
        "Export your data in a portable format upon request",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | LocalChefBazaar - Your Data Protection</title>
        <meta
          name="description"
          content="Learn how LocalChefBazaar protects your privacy and handles your personal information. Transparent data practices for your peace of mind."
        />
      </Helmet>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-8">
                <FaShieldAlt className="text-3xl text-blue-600" />
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                Privacy <span className="text-blue-600">Policy</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Your privacy matters to us. Learn how we collect, use, and
                protect your personal information.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-left">
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
                  Our Commitment to Your Privacy
                </Card.Title>
                <Card.Description className="text-base leading-relaxed">
                  At LocalChefBazaar, we are committed to protecting your
                  privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use,
                  share, and protect your information when you use our platform
                  to connect with local chefs and order homemade meals.
                </Card.Description>
                <Card.Description className="text-base leading-relaxed mt-4">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. We encourage you
                  to read this policy carefully and contact us if you have any
                  questions.
                </Card.Description>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Privacy Sections */}
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
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                        <section.icon className="text-xl text-blue-600" />
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
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-black mb-6">
                Questions About Privacy?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                We're here to help you understand how we protect your data and
                respect your privacy rights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Contact Our Privacy Team
                </a>
                <a
                  href="mailto:privacy@localchefbazaar.com"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors"
                >
                  privacy@localchefbazaar.com
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
