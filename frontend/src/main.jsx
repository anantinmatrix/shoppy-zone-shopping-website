import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/LogIn.jsx";
import Homepage from "./pages/Homepage.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ContextProvider from "./cartContext/CartContext.jsx";

const login = localStorage.getItem('token')
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
       element: <Login/>,
      },
      {
        path: "/homepage",
        element: <Homepage />,
      },
      {
        path: "/products/:productId",
        element: <SingleProduct />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/categories/:category",
        element: <CategoryPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/orders",
        element: <OrderPage />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={appRouter}>
        <App />
    </RouterProvider>
  </ContextProvider>
);
