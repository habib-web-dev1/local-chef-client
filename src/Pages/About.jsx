import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaUsers,
  FaUtensils,
  FaLeaf,
  FaHandshake,
  FaAward,
  FaGlobe,
  FaRocket,
} from "react-icons/fa";
import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";

const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: "Made with Love",
      description:
        "Every meal is prepared with passion and care by talented home chefs who love what they do.",
      color: "text-red-500",
    },
    {
      icon: FaUsers,
      title: "Community First",
      description:
        "We believe in building strong communities by connecting neighbors through the love of food.",
      color: "text-blue-500",
    },
    {
      icon: FaLeaf,
      title: "Fresh & Sustainable",
      description:
        "Supporting local ingredients and sustainable cooking practices for a better tomorrow.",
      color: "text-green-500",
    },
    {
      icon: FaHandshake,
      title: "Trust & Safety",
      description:
        "Every chef is verified and every meal meets our high standards for quality and safety.",
      color: "text-orange-500",
    },
  ];

  const stats = [
    { number: "2,500+", label: "Happy Customers", icon: FaUsers },
    { number: "150+", label: "Local Chefs", icon: FaUtensils },
    { number: "12", label: "Cities", icon: FaGlobe },
    { number: "4.8", label: "Average Rating", icon: FaAward },
  ];

  const team = [
    {
      name: "Alexandra Thompson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      bio: "Former chef turned entrepreneur, passionate about connecting communities through food.",
    },
    {
      name: "Roberto Martinez",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      bio: "Operations expert ensuring smooth deliveries and happy customers across all cities.",
    },
    {
      name: "Priya Patel",
      role: "Chef Relations Manager",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      bio: "Building relationships with our amazing chef community and ensuring quality standards.",
    },
    {
      name: "James Wilson",
      role: "Technology Lead",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      bio: "Creating the technology that makes ordering homemade meals simple and delightful.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | LocalChefBazaar - Our Story & Mission</title>
        <meta
          name="description"
          content="Learn about LocalChefBazaar's mission to connect communities through homemade food. Meet our team and discover our values."
        />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-linear-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                Our <span className="text-orange-600">Story</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                LocalChefBazaar was born from a simple belief: the best meals
                come from the heart, not from industrial kitchens. We're
                connecting passionate home cooks with neighbors who crave
                authentic, homemade food.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl mb-4">
                    <stat.icon className="text-2xl text-orange-600" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl mb-6">
                  <FaRocket className="text-2xl text-orange-600" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  We're on a mission to revolutionize how people experience food
                  by creating a platform where passionate home cooks can share
                  their culinary talents with their communities. Every meal
                  tells a story, carries tradition, and brings people together.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  By supporting local chefs, we're not just delivering meals –
                  we're preserving culinary traditions, supporting local
                  economies, and building stronger, more connected communities
                  one meal at a time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Chef cooking with passion"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-2xl font-black">5000+</div>
                  <div className="text-sm opacity-90">Meals Delivered</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                Our <span className="text-orange-600">Values</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These core values guide everything we do and shape the LocalChef
                experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-6`}
                    >
                      <value.icon className={`text-2xl ${value.color}`} />
                    </div>
                    <Card.Title size="lg" className="mb-4">
                      {value.title}
                    </Card.Title>
                    <Card.Description className="text-lg leading-relaxed">
                      {value.description}
                    </Card.Description>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                Meet Our <span className="text-orange-600">Team</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The passionate people behind LocalChef who work every day to
                bring communities together through amazing food.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-orange-100 dark:ring-orange-900/20"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face";
                        }}
                      />
                    </div>
                    <Card.Title size="md" className="mb-2">
                      {member.name}
                    </Card.Title>
                    <div className="text-orange-600 font-semibold mb-4">
                      {member.role}
                    </div>
                    <Card.Description className="leading-relaxed">
                      {member.bio}
                    </Card.Description>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-linear-to-r from-orange-600 to-amber-500">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-black mb-6">
                Ready to Join Our Community?
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Whether you're a food lover looking for amazing homemade meals
                or a passionate cook ready to share your talents, we'd love to
                have you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                  onClick={() => (window.location.href = "/meals")}
                >
                  Explore Meals
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                  onClick={() => (window.location.href = "/register")}
                >
                  Become a Chef
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
