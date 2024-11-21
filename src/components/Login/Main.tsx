import { useState } from "react";
import styles from "../../pages/Login/Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    console.log(username, password);
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
    if (data.message === "Logined") navigate("/");
    console.log(data);
  }

  return (
    <>
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
            <div className={`${styles["text-center"]} ${styles["mb-medium"]}`}>
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
    </>
  );
}
