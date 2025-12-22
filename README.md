LocalChefBazaar — Marketplace for Local Home-Cooked Meals

LocalChefBazaar is a modern MERN stack platform that bridges the gap between talented home cooks and customers seeking fresh, healthy, and affordable homemade meals. The platform provides a seamless experience for browsing daily menus, placing orders, and tracking them in real-time, while offering chefs a digital storefront to earn from their own kitchens.
+2

🚀 Live Demo

https://local-chef-client.vercel.app/

🛠️ Key Features
🔐 User Authentication & Roles

Role-Based Access Control: Three distinct roles: Admin, Chef, and Normal User.

Firebase Authentication: Secure registration and login using email and password.
+2

JWT Security: Implementation of JSON Web Tokens for secure API access and route protection.
+1

🍽️ Customer Features (Normal User)

Dynamic Meal Browsing: View 6 featured meals on the home page and a full list on the Meals page with sorting and pagination (10 items per page).
+3

Meal Details: Access in-depth information including ingredients, chef experience, and estimated delivery time.
+2

Reviews & Ratings: Leave feedback on meals and view existing reviews from other users.
+1

Favorites List: Save preferred meals to a personal "Favorites" collection.
+1

Stripe Integration: Securely pay for orders once they are accepted by the chef.

👨‍🍳 Chef Features

Menu Management: Create, update, and delete meal listings with image upload capabilities.
+3

Order Management: Accept, cancel, or mark orders as "delivered" in real-time.

Personal Dashboard: Track personal profile, active meals, and incoming order requests.

🛠️ Admin Features

User Management: Oversee all users and the ability to mark accounts as "fraud".
+1

Request Handling: Approve or reject user requests to become a Chef or an Admin.

Platform Statistics: Visualize data like total payments, user count, and order statuses using Recharts.
+4

💻 Tech Stack

Frontend: React.js, Tailwind CSS, Framer Motion (Animations).
+1

Backend: Node.js, Express.js.

Database: MongoDB.

Authentication: Firebase & JWT.
+2

Payment Gateway: Stripe.

Other Tools: React Hook Form, Axios, Recharts, SweetAlert2/Toast.
