import {useState} from "react";

export default function Main() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log({username, password});
  }

  return (
    <>
      <section className="text--center mb--large">
        <h1 className="container">
          <div>
            <h3>Sign In</h3>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="hero-subtitle"
                onClick={handleLogin}
              >Sign In</button>
            </div>
          </form>
        </h1>
      </section>
    </>
  );
}