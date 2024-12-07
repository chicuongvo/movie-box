import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";

function LandingContainer({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default function SignUp() {
  const [yourName, setYourName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handlesignup() {
    console.log(username, yourName, email, password);
    const res = await fetch(
      "https://backend-movie-app-0pio.onrender.com/user",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          name: yourName,
          gmail: email,
        }),
      }
    );
    const data = await res.json();
    if (data.message === "Register succesfully") {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } else
      toast.error(data.message, {
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
  return (
    <>
      <LandingContainer>
        <section
          className={`${styles["section-signup-form"]} ${styles["justify-content-center"]}`}
        >
          <div
            className={`${styles["signup-panel"]} ${styles["justify-content-center"]} ${styles["text-center"]}`}
          >
            <h1 className="mb--large">SIGN UP</h1>
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
                  If you already have an account,{" "}
                  <Link to="/login">Sign In</Link>
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
      </LandingContainer>
    </>
  );
}
