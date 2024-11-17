<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./MovieDetail/MovieDetail.tsx";
import Catalog from "./Catalog/Catalog.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="movies" element={<Catalog />}></Route>
          <Route path="movies/:id" element={<MovieDetail />}></Route>
        </Routes>
      </BrowserRouter>
=======
// import { useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import FeaturedIn from "../components/FeaturedIn";
import HowItWorks from "../components/HowItWorks";
import CoreProblem from "../components/CoreProblem.tsx";
import Archive from "../components/Archive.tsx";
import Story from "../components/Story.tsx";
import Plan from "../components/Plan.tsx";
import Question from "../components/Question.tsx";
import EndPage from "../components/EndPage.tsx";
import Cart from "../components/Cart/Cart.tsx";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage.tsx";
function App() {
  return (
    <>
      <NavBar></NavBar>
      <LandingContainer>
        <Hero></Hero>
        <FeaturedIn></FeaturedIn>
        <CoreProblem></CoreProblem>
        <HowItWorks></HowItWorks>
        <Archive></Archive>
        <Story></Story>
        <Plan></Plan>
        <Question></Question>
        <EndPage></EndPage>
        <Cart />
        <CheckoutPage />
      </LandingContainer>
>>>>>>> nguyenxduc
    </>
  );
}

export default App;
