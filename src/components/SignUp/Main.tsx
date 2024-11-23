import { useState } from "react";
import styles from "../../pages/signup/SignUp.module.css";

export default function Main() {
  const [yourName, setYourName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handlesignup() {
    console.log(username, password);
    const res = await fetch(
      "https://backend-movie-app-0pio.onrender.com/user",
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
    // if (data.message === "Logined") navigate("/");
    console.log(data);
  }

  return (
    <>
      <section
        className={`${styles["section-signup-form"]} ${styles["justify-content-center"]}`}
      >
        <div
          className={`${styles["signup-panel"]} ${styles["justify-content-center"]} ${styles["text-center"]}`}
        >
          <h1 className="mb--large">Sign Up</h1>
          <form
            onSubmit={e => e.preventDefault()}
            className={styles["justify-content-center"]}
          >
            <div className={`${styles["mb-medium"]}`}>
              <input
                type="text"
                placeholder="Your Name..."
                className={styles["form-input"]}
                value={yourName}
                onChange={e => setYourName(e.target.value)}
              />
            </div>
            <div className={`${styles["mb-medium"]}`}>
              <input
                type="text"
                placeholder="Username..."
                className={styles["form-input"]}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className={`${styles["mb-medium"]}`}>
              <input
                type="text"
                placeholder="Email..."
                className={styles["form-input"]}
                value={email}
                onChange={e => setEmail(e.target.value)}
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
            <div className={`${styles["text-center"]} ${styles["mb-large"]}`}>
              <button
                type="submit"
                className={styles["btn_sign_in"]}
                onClick={handlesignup}
              >
                Sign Up
              </button>
            </div>
            <div>
              <p>
                If you already have an account, <a href="/login">Sign In</a>
              </p>
            </div>
          </form>
        </div>
      </section>

      <section className="section-signup text--center">
        <div>
          <p>© 2024 All Rights Reserved. Terms of Use.</p>
        </div>
      </section>
    </>
  );
}
