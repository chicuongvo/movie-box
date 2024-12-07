import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Login.module.css";
import { useUser } from "../../contexts/userContext";

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useUser();

  const { setUsername: handleLoginSuccess } = userContext;
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await fetch(
      "https://backend-movie-app-0pio.onrender.com/authen",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.message === "Logined") {
      toast.success("Login successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("username", username);
      handleLoginSuccess(username);
      navigate("/");
    } else if (data.status === "Banned") {
      toast.error("This account has been banned! Please contact admin.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Wrong username or password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>
      <LandingContainer>
        <section
          className={`${styles["section-login-form"]} ${styles["justify-content-center"]}`}
        >
          <div
            className={`${styles["login-panel"]} ${styles["justify-content-center"]} ${styles["text-center"]}`}
          >
            <h1 className="mb--large">LOGIN</h1>
            <form
              onSubmit={e => e.preventDefault()}
              className={styles["justify-content-center"]}
            >
              <div className={`${styles["mb-medium"]}`}>
                <input
                  type="text"
                  placeholder="Username"
                  className={styles["form-input"]}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className={`${styles["mb-large"]}`}>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles["form-input"]}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div
                className={`${styles["text-center"]} ${styles["mb-medium"]}`}
              >
                <button
                  type="submit"
                  className={styles["btn_sign_in"]}
                  onClick={handleLogin}
                >
                  Sign In
                </button>
              </div>
              <h2 className={`${styles["mb-medium"]}`}>OR</h2>
              <div className={`${styles["text-center"]}}`}>
                <button
                  type="submit"
                  className={styles["btn_sign_up"]}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="section-login text--center">
          <div>
            <p>© 2024 All Rights Reserved. Terms of Use.</p>
          </div>
        </section>
      </LandingContainer>
    </>
  );
}
