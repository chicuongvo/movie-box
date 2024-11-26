import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/favicon.png";
import { useUser } from "../../contexts/userContext";
import styles from "./NavBar.module.css";

const navItems = [
  {
    title: `Home`,
    link: ``,
  },
  {
    title: `Movies`,
    link: `movies`,
  },
  {
    title: `Cart`,
    link: `cart`,
  },
];

const getLocalUser = () => {
  return localStorage.getItem("username");
};

const handleLogOutClick = (
  setUsername: React.Dispatch<React.SetStateAction<string>>
) => {
  localStorage.setItem("username", "");
  setUsername("");
};

export default function NavBar() {
  const { setUsername } = useUser();
  let { username } = useUser();
  username ||= getLocalUser() || "";

  return (
    <div className="nav-wrapper">
      <nav className="nav container">
        <Link to="/">
          <img src={Logo} alt="Movid App logo" className="logo" />
        </Link>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.title}>
              <NavLink to={item.link} className="nav-link">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {username ? (
          <div className={styles["user-container"]}>
            <p className={styles["username"]}>👤 {username}</p>
            <button
              className={styles["btn"]}
              onClick={() => handleLogOutClick(setUsername)}
            >
              Log out &rarr;
            </button>
          </div>
        ) : (
          <Link className="btn btn--primary" to="login">
            Log in
          </Link>
        )}
      </nav>
    </div>
  );
}
