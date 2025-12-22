import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../Pages/Shared/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import MealsPage from "../Pages/MealsPage";
import MealDetails from "../Pages/MealDetails";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import FavoriteMeals from "../Pages/Dashboard/User/FavoriteMeals";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import MyMeals from "../Pages/Dashboard/Chef/MyMeals";
import OrderRequests from "../Pages/Dashboard/Chef/OrderRequests";
import PlatformStatistics from "../Pages/Dashboard/Admin/PlatformStatistics";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageRequests from "../Pages/Dashboard/Admin/ManageRequests";
import AdminRoute from "./AdminRoute";
import ChefRoute from "./ChefRoute";
import PrivateRoute from "./PrivateRoute";
import UpdateMeal from "../Pages/Dashboard/Chef/UpdateMeal";
import OrderPage from "../Pages/OrderPage";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import CreateMeal from "../Pages/Dashboard/Chef/CreateMeal";
import PaymentSuccess from "../Pages/Shared/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/meals", element: <MealsPage /> },
      {
        path: "/meal/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
    ],
  },

  // --- DASHBOARD LAYOUT & PROTECTED ROUTES ---
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // 🎯 HOME: No extra wrapper needed (Inherits from Parent)
      { index: true, element: <DashboardHome /> },

      // --- USER ROUTES (No extra PrivateRoute needed) ---
      { path: "profile", element: <MyProfile /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "favorite-meals", element: <FavoriteMeals /> },
      { path: "my-reviews", element: <MyReviews /> },

      // --- CHEF ROUTES (Only wrap in ChefRoute) ---
      {
        path: "create-meals",
        element: (
          <ChefRoute>
            <CreateMeal />
          </ChefRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <ChefRoute>
            <MyMeals />
          </ChefRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <ChefRoute>
            <OrderRequests />
          </ChefRoute>
        ),
      },
      {
        path: "update-meal/:id",
        element: (
          <ChefRoute>
            <UpdateMeal />
          </ChefRoute>
        ),
      },

      // --- ADMIN ROUTES (Only wrap in AdminRoute) ---
      {
        path: "platform-stats",
        element: (
          <AdminRoute>
            <PlatformStatistics />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <AdminRoute>
            <ManageRequests />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
