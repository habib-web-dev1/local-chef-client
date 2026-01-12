import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaQuestionCircle,
  FaHeadset,
  FaBug,
} from "react-icons/fa";
import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";
import Textarea from "../Components/UI/Textarea";
import Select from "../Components/UI/Select";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 8AM-8PM EST",
      color: "text-blue-500",
    },
    {
      icon: FaEnvelope,
      title: "Email Support",
      details: "support@localchef.com",
      description: "We'll respond within 24 hours",
      color: "text-green-500",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Main Office",
      details: "123 Culinary Street, Food City, FC 12345",
      description: "Visit us during business hours",
      color: "text-orange-500",
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: "Mon-Fri: 8AM-8PM EST",
      description: "Weekend: 10AM-6PM EST",
      color: "text-purple-500",
    },
  ];

  const supportCategories = [
    { value: "general", label: "General Inquiry" },
    { value: "order", label: "Order Support" },
    { value: "chef", label: "Chef Application" },
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing Question" },
    { value: "feedback", label: "Feedback & Suggestions" },
  ];

  const quickHelp = [
    {
      icon: FaQuestionCircle,
      title: "FAQ",
      description: "Find answers to common questions",
      link: "/faq",
    },
    {
      icon: FaHeadset,
      title: "Live Chat",
      description: "Chat with our support team",
      link: "#",
    },
    {
      icon: FaBug,
      title: "Report Issue",
      description: "Report bugs or technical problems",
      link: "#",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Message Sent | LocalChefBazaar Contact</title>
        </Helmet>
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto px-4"
          >
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
                <FaPaperPlane className="text-3xl text-green-600" />
              </div>
              <Card.Title size="lg" className="mb-4">
                Message Sent Successfully! 🎉
              </Card.Title>
              <Card.Description className="mb-6">
                Thank you for contacting us. We've received your message and
                will get back to you within 24 hours.
              </Card.Description>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Home
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            </Card>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | LocalChefBazaar - Get in Touch</title>
        <meta
          name="description"
          content="Contact LocalChefBazaar for support, questions, or feedback. We're here to help with orders, chef applications, and more."
        />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                Get in <span className="text-orange-600">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We're here to help! Whether you have questions, need support, or
                want to share feedback, our team is ready to assist you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
                    Contact Information
                  </h2>

                  <div className="space-y-6 mb-12">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center`}
                        >
                          <info.icon className={`text-xl ${info.color}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-900 dark:text-white font-semibold mb-1">
                            {info.details}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Help */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Quick Help
                  </h3>
                  <div className="space-y-4 mb-8">
                    {quickHelp.map((help, index) => (
                      <a
                        key={index}
                        href={help.link}
                        className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <help.icon className="text-orange-600 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {help.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {help.description}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Social Media */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    {[
                      { icon: FaFacebook, color: "text-blue-600", link: "#" },
                      { icon: FaTwitter, color: "text-blue-400", link: "#" },
                      { icon: FaInstagram, color: "text-pink-600", link: "#" },
                      { icon: FaLinkedin, color: "text-blue-700", link: "#" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className={`w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center ${social.color} hover:scale-110 transition-transform`}
                      >
                        <social.icon className="text-xl" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="p-8">
                    <Card.Title size="lg" className="mb-6">
                      Send us a Message
                    </Card.Title>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                        <Input
                          label="Email Address"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                          label="Category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          options={supportCategories}
                          placeholder="Select a category"
                          required
                        />
                        <Input
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief subject line"
                          required
                        />
                      </div>

                      <Textarea
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        maxLength={1000}
                        showCharCount
                        required
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isSubmitting}
                        rightIcon={<FaPaperPlane />}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                Visit Our Office
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Drop by our headquarters for a chat and some amazing local food!
              </p>
            </motion.div>

            <div className="bg-gray-200 dark:bg-gray-700 rounded-3xl h-96 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-4xl text-orange-600 mb-4 mx-auto" />
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Interactive Map Coming Soon
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  123 Culinary Street, Food City, FC 12345
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
