const mockData = [
  {
    pack: 'Basic',
    price: '9',
    description: [
      'Centralized Knowledge Base',
      'Efficient Information Retrievali'
    ]
  },
  {
    pack: 'Pro',
    price: '29',
    description: [
      'All Basic Features',
      'Enhanced Productivity',
      'Collaborative Environment'
    ]
  },
  {
    pack: 'Enterprise',
    price: '99',
    description: [
      'All Pro Features',
      'Versatile Data Handling',
      'Scalable Solution'
    ]
  },
];

export default function Plan() {
  return (
    <>
      <section className="section-plan mb--large">
        <div className="text--center mt--large">
          <div>
            <h1 className="hero-title">Choose the Right Plan for Your Needs</h1>
            <p className="hero-subtitle">Find the perfect plan to help you resolve your pain points and boost productivity.</p>
          </div>
          <ul className="plan-box plan_items mb--large">
            {mockData.map(value => (
              <li>
                <div>
                  <h2>{value.pack}</h2>
                  <p>${value.price}/mo</p>
                  <ul className="plan-box-description plan_items-description">
                    {value.description.map(item => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}