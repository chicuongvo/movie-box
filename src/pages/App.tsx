// import { useState } from "react";

import Login from "./Login/Login";

function App() {
  return (
    <>
      <Login />
    </>
  );
}

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default App;
