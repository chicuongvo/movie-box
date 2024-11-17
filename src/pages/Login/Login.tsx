import Header from "../../components/Login/Header.tsx";
import Main from "../../components/Login/Main.tsx";
import End from "../../components/Login/End.tsx";

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default function Login() {
  return (
    <>
      <LandingContainer>
        <Header />
        <Main />
        <End />
      </LandingContainer>
    </>
  );
}
