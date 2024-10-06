import netflixLogo from "../assets/featured_logo/netflix.png";
import appleLogo from "../assets/featured_logo/apple-tv.png";
import youtubeLogo from "../assets/featured_logo/youtube-premium.png";
import imdbLogo from "../assets/featured_logo/imdb.jpg";

const logos = [netflixLogo, appleLogo, youtubeLogo, imdbLogo];

export default function Featured() {
  return (
    <section className="section-featured">
      <p className="section-subtitle text--center">As featured in</p>
      <div className="featured-logos">
        {logos.map(logo => (
          <img src={logo} className="featured-logo"></img>
        ))}
      </div>
    </section>
  );
}
