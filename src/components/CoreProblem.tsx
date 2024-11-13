import glass from "../assets/coreproblems_logo/glass.png"
import hourglass from "../assets/coreproblems_logo/hourglass.png"
import briefcase from "../assets/coreproblems_logo/briefcase.png"

const mockData = [
  {
    logo: glass,
    description: 'The Hidden Costs of Inefficiency',
  },
  {
    logo: hourglass,
    description: 'Reduced productivity due to inefficient information retrieval',
  },
  {
    logo: briefcase,
    description: 'Difficulty in accessing organizational knowledge',
  },
];

export default function CoreProblem() {
  return (
    <>
      <section className="section-core text--center mb--medium">
        <h1 className="core-title text--center mb--large">The Hidden Costs of Inefficiency</h1>
        <ul className="core-box text--center core_items">
          {mockData.map(value => (
            <li>
              <img src={value.logo} className="core-logo" />
              <p className="core-description">{value.description}</p>
            </li>
          ))}
        </ul>
        <a href="#" className="mt--large">
          there is an easier way
        </a>
      </section>
    </>
  );
}