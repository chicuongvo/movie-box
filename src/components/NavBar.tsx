import Logo from "../assets/favicon.png";

const navItems = [
  {
    title: `Home`,
    link: `/`,
  },
  {
    title: `Movies`,
    link: `/movies`,
  },
  {
    title: `Pricing`,
    link: `#pricing`,
  },
];

export default function NavBar() {
  return (
    <div className="nav-wrapper">
      <nav className="nav container">
        <img src={Logo} alt="Movid App logo" className="logo" />
        <p className="nav-app">cognifyAI</p>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.title}>
              <a href={item.link} className="nav-link">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn--primary" href="#">
          Get Started
        </a>
      </nav>
    </div>
  );
}
