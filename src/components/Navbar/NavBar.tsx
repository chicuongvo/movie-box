import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/favicon.png";
import { useUser } from "../../contexts/userContext";
import styles from "./NavBar.module.css";
import type { NavigateFunction } from "react-router-dom";

const getLocalUser = () => {
  return localStorage.getItem("username");
};

const handleLogOutClick = (
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  localStorage.setItem("username", "");
  setUsername("");
  navigate("login");
};

export default function NavBar() {
  const navigate = useNavigate();
  const { setUsername } = useUser();
  let { username } = useUser();
  username ||= getLocalUser() || "";
  let navItems = [
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

    {
      title: `History`,
      link: `history`,
    },
  ];
  if (username === "admin")
    navItems = [
      ...navItems,
      {
        title: `Admin`,
        link: `admin`,
      },
      {
        title: `Stats`,
        link: `stats`,
      },
    ];

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
          <Link to="/account">
            <div className={styles["user-container"]}>
              <p className={styles["username"]}>👤 {username}</p>
              <button
                className={styles["btn"]}
                onClick={e => {
                  e.preventDefault();
                  handleLogOutClick(setUsername, navigate);
                }}
              >
                Log out &rarr;
              </button>
            </div>
          </Link>
        ) : (
          <Link
            className={`btn btn--primary ${styles["btn-sign-in"]}`}
            to="login"
          >
            Log in
          </Link>
        )}
      </nav>
    </div>
  );
}
