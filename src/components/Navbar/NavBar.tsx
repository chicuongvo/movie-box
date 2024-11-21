import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/favicon.png";

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

export default function NavBar() {
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
        <Link className="btn btn--primary" to="login">
          Log in
        </Link>
      </nav>
    </div>
  );
}
