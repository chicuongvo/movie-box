import { useState } from "react";
import styles from "../../pages/Login/Login.module.css";

export default function Main() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log({ username, password });
  }

  return (
    <>
      <section className="text--center mb--large">
        <h1 className="container">
          <div></div>
          <form onSubmit={e => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="Username"
                className={styles["input"]}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className={styles["input"]}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className={styles["btn"]}
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>
          </form>
        </h1>
      </section>
    </>
  );
}
