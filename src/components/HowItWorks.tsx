const mockData = [
  {
    id: 1,
    title: "Upload Your Knowledge",
    description: "Easily upload files and URLs to create a centralized repository of information.",
  },
  {
    id: 2,
    title: "Query the Chatbot",
    description: "Ask the chatbot questions to retrieve precise answers based on the uploaded data.",
  },
  {
    id: 3,
    title: "Access Information Quickly",
    description: "Get the information you need in seconds, reducing the time spent searching for documents.",
  },
  {
    id: 4,
    title: "Enhance Productivity",
    description: "Streamline workflows and improve decision-making with easy access to information.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-how mb--medium" id="how">
      <h1 className="hero-title text--center">How it works</h1>
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
