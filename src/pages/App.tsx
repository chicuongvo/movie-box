import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import NavBar from "../components/Navbar/NavBar.tsx";
import MovieDetail from "./MovieDetail/MovieDetail.tsx";
import Catalog from "./Catalog/Catalog.tsx";
import Cart from "./Cart/Cart.tsx";
import HomePage from "./HomePage/HomePage.tsx";
import Login from "./Login/Login.tsx";
import Checkout from "./CheckoutPage/CheckoutPage.tsx";
import SignUp from "./SignUp/SignUp.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import { UserProvider } from "../contexts/userContext";
import { CartProvider } from "../contexts/cartContext";
import History from "./History/History.tsx";
import Admin from "./Admin/Admin.tsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <ScrollToTop />
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="movies" element={<Catalog />}></Route>
              <Route path="movies/:id" element={<MovieDetail />}></Route>
              <Route path="cart" element={<Cart />}></Route>
              <Route path="checkout" element={<Checkout />}></Route>
              <Route path="signup" element={<SignUp />}></Route>
              <Route path="history" element={<History />}></Route>
              <Route path="admin" element={<Admin />}></Route>
            </Routes>
            <ProtectedRoute />
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
