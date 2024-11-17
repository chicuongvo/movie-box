import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./MovieDetail/MovieDetail.tsx";
import Catalog from "./Catalog/Catalog.tsx";
import Cart from "./Cart/Cart.tsx";
import HomePage from "./HomePage/HomePage.tsx";
import Login from "./Login/Login.tsx";
import Checkout from "../components/CheckoutPage/CheckoutPage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="movies" element={<Catalog />}></Route>
          <Route path="movies/:id" element={<MovieDetail />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
