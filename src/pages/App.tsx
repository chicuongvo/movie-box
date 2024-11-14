// import { useState } from "react";
import NavBar from "../components/NavBar";
import HomePage from "./HomePage/HomePage";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <LandingContainer>
        <HomePage></HomePage>
      </LandingContainer>
    </>
  );
}

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default App;
