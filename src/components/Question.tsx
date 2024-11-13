const mockData = [
  'How does the chatbot app work?',
  'What types of files can I upload?',
  'Is the chatbot app suitable for large organizations?',
  'How can the chatbot app improve productivity?'
]

export default function Question() {
  return (
    <>
      <section className="section-question mb--large">
        <div className="container mt--large">
          <ul className="question-box question_items">
            <li>
              <div>
                <h1 className="question-title">Frequently Asked Questions</h1>
                <p className="question-subtitle">Get answers to common questions about our chatbot app.</p>
              </div>
            </li>
            <li>
              <div>
                <ul className="question-box-2">
                  {mockData.map(value => (
                    <li>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}