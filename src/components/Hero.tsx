import heroImg from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="grid-2-cols section-hero">
      <div className="hero-text-box">
        <h1 className="hero-title">
          Chat with your data seamlessly
        </h1>
        <p className="hero-subtitle">
          Turn enterprise knowledge (PDFs, URLs, text) into an Al assistant and talk to your data naturally
        </p>
        <a href="#" className="btn btn--primary mr--small">
          Get Started
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
