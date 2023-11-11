import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadUser } from "@/actions/userActions";
import { fetchCart } from "@/actions/cartActions";

import About from "@/components/siteInfo/about/About";
import Auth from "@/components/user/auth";
import Cart from "@/components/cart/Cart";
import CategoryPage from "@/components/product/CategoryPage";
import Contact from "@/components/siteInfo/Contact";
import Home from "@/components/home/Home";
import ManageOrders from "@/components/admin/order/Page";
import ManageProducts from "@/components/admin/product/Page";
import MyOrders from "@/components/user/MyOrders";
import NotFound from "@/components/common/NotFound";
import OemOdm from "@/components/siteInfo/OemOdm";
import PrivacyPolicy from "@/components/siteInfo/PrivacyPolicy";
import ProductInfo from "@/components/product/ProductInfo";
import ProfilePage from "@/components/user/Profile";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RefundReturnPolicy from "@/components/siteInfo/RefundReturnPolicy";
import ResetPassword from "@/components/form/ResetPassword";
import SignIn from "@/components/form/SignIn";
import SignUp from "@/components/form/SignUp";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound /> },
  { path: "about/", element: <About /> },
  { path: "admin/manage-orders", element: <ProtectedRoute isAdmin={true}><ManageOrders /></ProtectedRoute> },
  { path: "admin/manage-products", element: <ProtectedRoute isAdmin={true}><ManageProducts /></ProtectedRoute> },
  { path: "cart/", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
  { path: "category/:catname/:type", element: <CategoryPage /> },
  { path: "contact/", element: <Contact /> },
  { path: "me/", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
  { path: "me/orders/", element: <ProtectedRoute><MyOrders /></ProtectedRoute> },
  { path: "oem-odm/", element: <OemOdm /> },
  { path: "privacy-policy/", element: <PrivacyPolicy /> },
  { path: "product/:id/", element: <ProductInfo /> },
  { path: "refund-return-policy/", element: <RefundReturnPolicy /> },
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "signup/", element: <SignUp /> },
      { path: "signin/", element: <SignIn /> },
      { path: "reset-password/", element: <ResetPassword /> },
    ],
  },
]);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchCart());
    
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
