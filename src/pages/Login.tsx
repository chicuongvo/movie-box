import NavBar from "../components/NavBar.tsx";
import Header from "../components/Login/Header.tsx";
import Main from "../components/Login/Main.tsx";
import End from "../components/Login/End.tsx";

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default function Login() {
  return (
    <>
      <NavBar />
      <LandingContainer>
        <Header />
        <Main />
        <End />
      </LandingContainer>
    </>
  );
}