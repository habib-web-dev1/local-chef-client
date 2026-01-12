import {
  FaBell,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaUtensils,
  FaUsers,
  FaDollarSign,
  FaStar,
  FaShoppingCart,
  FaArrowUp,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../../Providers/AuthProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Card from "../../Components/UI/Card";

const DashboardHome = () => {
  const { user, dbUser } = useAuth();

  // Dynamic Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  // Sample data for charts
  const monthlyOrdersData = [
    { month: "Jan", orders: 45, revenue: 2400 },
    { month: "Feb", orders: 52, revenue: 2800 },
    { month: "Mar", orders: 48, revenue: 2600 },
    { month: "Apr", orders: 61, revenue: 3200 },
    { month: "May", orders: 55, revenue: 2900 },
    { month: "Jun", orders: 67, revenue: 3500 },
  ];

  const categoryData = [
    { name: "Italian", value: 35, color: "#ea580c" },
    { name: "Asian", value: 25, color: "#f59e0b" },
    { name: "American", value: 20, color: "#1f2937" },
    { name: "Mexican", value: 15, color: "#10b981" },
    { name: "Others", value: 5, color: "#6b7280" },
  ];

  const weeklyActivityData = [
    { day: "Mon", orders: 12, views: 45 },
    { day: "Tue", orders: 19, views: 52 },
    { day: "Wed", orders: 15, views: 38 },
    { day: "Thu", orders: 22, views: 61 },
    { day: "Fri", orders: 28, views: 73 },
    { day: "Sat", orders: 35, views: 89 },
    { day: "Sun", orders: 31, views: 76 },
  ];

  // Role-based metrics
  const getMetrics = () => {
    const role = dbUser?.role?.toLowerCase() || "user";

    if (role === "admin") {
      return [
        {
          title: "Total Users",
          value: "2,847",
          change: "+12%",
          icon: FaUsers,
          color: "text-blue-600",
        },
        {
          title: "Total Revenue",
          value: "$45,231",
          change: "+8.2%",
          icon: FaDollarSign,
          color: "text-green-600",
        },
        {
          title: "Active Chefs",
          value: "156",
          change: "+5%",
          icon: FaUtensils,
          color: "text-orange-600",
        },
        {
          title: "Orders Today",
          value: "89",
          change: "+15%",
          icon: FaShoppingCart,
          color: "text-purple-600",
        },
      ];
    } else if (role === "chef") {
      return [
        {
          title: "My Orders",
          value: "23",
          change: "+18%",
          icon: FaShoppingCart,
          color: "text-orange-600",
        },
        {
          title: "Revenue",
          value: "$1,245",
          change: "+12%",
          icon: FaDollarSign,
          color: "text-green-600",
        },
        {
          title: "Avg Rating",
          value: "4.8",
          change: "+0.2",
          icon: FaStar,
          color: "text-yellow-600",
        },
        {
          title: "Active Meals",
          value: "12",
          change: "+2",
          icon: FaUtensils,
          color: "text-blue-600",
        },
      ];
    } else {
      return [
        {
          title: "Orders Placed",
          value: "8",
          change: "+2",
          icon: FaShoppingCart,
          color: "text-orange-600",
        },
        {
          title: "Money Spent",
          value: "$156",
          change: "+$23",
          icon: FaDollarSign,
          color: "text-green-600",
        },
        {
          title: "Favorite Meals",
          value: "15",
          change: "+3",
          icon: FaStar,
          color: "text-yellow-600",
        },
        {
          title: "Reviews Given",
          value: "6",
          change: "+1",
          icon: FaUtensils,
          color: "text-blue-600",
        },
      ];
    }
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-10 pb-10">
      {/* --- WELCOME SECTION --- */}
      <section className="relative overflow-hidden rounded-4xl bg-slate-900 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              {dbUser?.role || "Member"} Portal
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {greeting}, <br />
              <span className="text-orange-500">
                {user?.displayName || "User"}!
              </span>
            </h1>
            <p className="mt-4 text-slate-400 max-w-md text-lg italic">
              "Cooking is an art, but eating is a necessity." Ready to check
              your latest activity?
            </p>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                to="/dashboard/profile"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2"
              >
                Manage Profile <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Large Abstract Graphic */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-orange-500 blur-[100px] opacity-20 rounded-full animate-pulse"></div>
            <FaUtensils className="text-[12rem] text-white/5 rotate-12 relative z-10" />
          </div>
        </div>

        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
      </section>

      {/* --- METRICS OVERVIEW CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {metrics.map((metric, index) => (
          <div key={metric.title}>
            <Card className="p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                    {metric.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {metric.value}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-medium mt-1 ${
                      metric.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {metric.change} from last month
                  </p>
                </div>
                <div
                  className={`p-2 sm:p-3 rounded-xl bg-gray-50 dark:bg-gray-800 ${metric.color} shrink-0`}
                >
                  <metric.icon className="text-lg sm:text-xl" />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* --- CHARTS AND ANALYTICS --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-10">
        {/* Monthly Performance Chart */}
        <div className="xl:col-span-2">
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <Card.Title size="lg">Monthly Performance</Card.Title>
                <Card.Description>
                  Orders and revenue trends over time
                </Card.Description>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span>Orders</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Revenue</span>
                </div>
              </div>
            </div>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrdersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#ea580c" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Category Distribution */}
        <div>
          <Card className="p-4 sm:p-6">
            <Card.Title size="lg" className="mb-2">
              Popular Categories
            </Card.Title>
            <Card.Description className="mb-6">
              Distribution of meal orders by category
            </Card.Description>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span className="font-semibold shrink-0">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* --- WEEKLY ACTIVITY AND RECENT ACTIVITY --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-7">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Card.Title size="lg">Weekly Activity</Card.Title>
                <Card.Description>
                  Daily orders and profile views
                </Card.Description>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaArrowUp className="text-green-600" />
                <span className="text-green-600 font-semibold">
                  +12% this week
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#ea580c"
                  strokeWidth={3}
                  dot={{ fill: "#ea580c", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-5">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Card.Title size="lg">Recent Activity</Card.Title>
                <Card.Description>
                  Latest updates and notifications
                </Card.Description>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-xl">
                <FaBell className="text-orange-600" />
              </div>
            </div>

            <div className="space-y-4">
              <ActivityItem
                icon={<FaCheckCircle className="text-emerald-500" />}
                title="Order Completed"
                time="2 hours ago"
                desc="Your order #7741 has been successfully delivered."
              />

              <ActivityItem
                icon={<FaClock className="text-orange-500" />}
                title="New Order Received"
                time="5 hours ago"
                desc="Order #7742 is being prepared by the chef."
              />

              <ActivityItem
                icon={<FaStar className="text-yellow-500" />}
                title="Review Received"
                time="1 day ago"
                desc="You received a 5-star review for your Italian Pasta."
              />

              <ActivityItem
                icon={<FaExclamationCircle className="text-blue-500" />}
                title="Profile Updated"
                time="2 days ago"
                desc="Your delivery address has been updated successfully."
              />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/dashboard/notifications"
                className="flex items-center justify-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors"
              >
                View All Notifications
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* --- QUICK ACTIONS --- */}
      <div className="mt-10">
        <Card className="p-6 bg-linear-to-r from-orange-600 to-amber-500 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Ready to explore more?
              </h3>
              <p className="text-orange-100">
                Discover new features and optimize your {dbUser?.role || "user"}{" "}
                experience
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/meals"
                className="px-6 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FaUtensils />
                Browse Meals
              </Link>
              <Link
                to="/dashboard/profile"
                className="px-6 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-colors flex items-center gap-2"
              >
                <FaUsers />
                Update Profile
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Sub-component for Activity Items to keep code clean
const ActivityItem = ({ icon, title, time, desc }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
          {title}
        </h4>
        <time className="text-xs text-gray-500 dark:text-gray-400">{time}</time>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default DashboardHome;
