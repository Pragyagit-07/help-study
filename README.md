#  Web Application

This is a responsive Help your study web application built with **Next.js**, **Material-UI (MUI)**, and **Zustand** for state management. It integrates with the public API [DummyJSON](https://dummyjson.com/) to manage users and products.

---

##  Features

### Authentication
- Admin login using DummyJSON auth API
- Token stored in Zustand + localStorage
- Protected routes (dashboard, users, products)
- Logout functionality

### Dashboard
- Quick overview of total users and products
- Cards with links to Users and Products sections

### Users Management
- List all users in a table
- Search users by name, email, etc.
- Pagination
- View single user details (avatar, email, phone, company, gender)

### Products Management
- List all products in a responsive grid
- Search products by name
- Filter products by category
- Pagination
- View single product details (image, price, brand, category, description)
- “Back to Products” navigation

### UI/UX
- Fully responsive design using Material-UI
- Clean layout for dashboard, lists, and details
- Desktop and mobile support with Navbar + mobile menu
- Smooth transitions and hover effects

### State Management
- Zustand used for managing:
  - Authentication state
  - Users data
  - Products data
- Async API calls inside Zustand store
- Client-side caching to reduce API calls

---



### Why Zustand

Zustand was chosen for state management because:

- **Lightweight and simple:** Minimal boilerplate compared to Redux, easy to set up and use.
- **Built-in async support:** Allows handling asynchronous API calls directly in the store.
- **Small footprint:** Perfect for small to medium-sized projects without adding unnecessary complexity.
- **Reactivity:** Components automatically re-render when state changes.
- **Client-side caching:** Easy to store and retrieve cached data, reducing unnecessary API requests.

Overall, Zustand provides a clean, efficient, and maintainable solution for managing authentication, users, and products state in this project.


##  Tech Stack
- **Next.js** (React framework)
- **Material-UI (MUI)** (UI components)
- **Zustand** (state management)
- **Axios** (API requests)
- **React Hook Form** (form handling)
- **DummyJSON API** (backend data)

---

##  Project Structure
```

/pages
/auth/login.tsx # Admin login
/dashboard.tsx # Admin dashboard
/users/index.tsx # Users list
/users/[id].tsx # User detail
/products/index.tsx # Products list
/products/[id].tsx # Product detail
/components
DashboardLayout.tsx # Layout wrapper
Navbar.tsx # Top navigation bar
/store
authStore.ts # Auth state
usersStore.ts # Users state
productsStore.ts # Products state

```





##  Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/pragyagit-07/help-study.git
cd help-study
npm install
npm run dev

```


2.  *** Open in browser ***

 http://localhost:3000
 
 or 

 http://192.168.1.3:3000


 3.  *** Admin Login Credential ***
    
  username: kminchelle,
  password: 0lelplR



### Completion Status

Part 1: Frontend Development

Authentication –  Complete

Admin login page built with MUI

Login API integrated with DummyJSON

Token stored in Zustand and localStorage

Protected dashboard, users, and products routes

Logout implemented

Users List + Single User View –  Complete

Users displayed in responsive MUI table

Search and pagination implemented

Single user detail page shows avatar, email, phone, gender, and company

“Back to Users” navigation included

Products List + Single Product View –  Complete

Products displayed in responsive MUI grid

Search and category filter implemented

Pagination implemented

Single product detail page shows image, price, brand, category, description

“Back to Products” navigation included

Part 2: State Management with Zustand

 Complete

Auth, users, and products state managed with Zustand

Async API calls handled in stores

Client-side caching implemented to reduce API calls

Part 3: UI/UX & Optimization

- UI & Responsiveness –  Complete

- Fully responsive layout for all pages using Material-UI

- Desktop and mobile support, including navbar and mobile menu

- Performance Optimization –  Partially Complete

- API-side pagination used

- Some components optimized with useMemo / useCallback and React.memo

- Could further optimize re-renders if needed

- Client-Side Caching –  Complete

- Products and users list cached in Zustand

- Comments included explaining caching strategy

