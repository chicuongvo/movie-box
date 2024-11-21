import Main from "../../components/SignUp/Main.tsx";

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default function SignUp() {
  return (
    <>
      <LandingContainer>
        <Main />
      </LandingContainer>
    </>
  );
}
