import heroImg from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="grid-2-cols section-hero">
      <div className="hero-text-box">
        <h1 className="hero-title">
          Your favorite films delivered to your door.
        </h1>
        <p className="hero-subtitle">
          The ultimate film hub for cinema lovers. Access thousands of titles
          from the comfort of your home.
        </p>
        <a href="#" className="btn btn--primary mr--small">
          Start watching now
        </a>
        <a href="#how" className="btn btn--secondary">
          Learn more &darr;
        </a>
      </div>
      <div className="hero-img-box">
        <img
          src={heroImg}
          alt="Money Heist movie on mobile app"
          className="hero-img"
        />
      </div>
    </section>
  );
}
