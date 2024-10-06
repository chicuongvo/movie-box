// import { useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import FeaturedIn from "../components/FeaturedIn";
import HowItWorks from "../components/HowItWorks";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <LandingContainer>
        <Hero></Hero>
        <FeaturedIn></FeaturedIn>
        <HowItWorks></HowItWorks>
      </LandingContainer>
    </>
  );
}

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default App;
