const mockData = [
  {
    id: 1,
    title: "Select your films",
    description:
      "Explore our extensive library or let Cinemagic AI recommend movies based on your tastes and past views.",
  },
  {
    id: 2,
    title: "Order with ease",
    description:
      "Add movies to your cart, choose your format (DVD, Blu-Ray, 4K), and check out.",
  },
  {
    id: 3,
    title: "Enjoy fast delivery",
    description:
      "Your chosen films will be delivered to your doorstep quickly and in perfect condition.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-how" id="how">
      <p className="section-subtitle mb--medium">How it works</p>
      <h2 className="section-title">Three simple steps to movie night</h2>
      <ul className="step-box">
        {mockData.map(step => (
          <li key={step.id} className="step">
            <span className="step-number">{step.id}</span>
            <div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
