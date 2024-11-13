import productLogo from "../assets/featured_logo/product.svg";
import xLogo from "../assets/featured_logo/x.png"
import redditLogo from "../assets/featured_logo/reddit.png"
import hackernewsLogo from "../assets/featured_logo/hackernews.png"

const logos = [productLogo, hackernewsLogo, xLogo, redditLogo];

export default function Featured() {
  return (
    <section className="section-featured mb--medium">
      <p className="section-subtitle text--center">Featured on</p>
      <div className="featured-logos">
        {logos.map(logo => (
          <img src={logo} className="featured-logo"></img>
        ))}
      </div>
    </section>
  );
}
