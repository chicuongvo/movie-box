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
        <Cart />
        <CheckoutPage />
      </LandingContainer>
    </>
  );
}

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default App;
