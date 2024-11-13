import JohnDoe from '../assets/story/JohnDoe.png'
import MichaelBrown from '../assets/story/user.png'
import DavidGreen from '../assets/story/user.png'
import JaneSmith from '../assets/story/user.png'
import EmilyWhite from '../assets/story/user.png'
import SophiaBlue from '../assets/story/user.png'

const mockData = [
  {
    logo: JohnDoe,
    name: 'John Doe',
    job: 'Project Manager',
    description: 'This chatbot app has revolutionized the way our team accesses information. It has significantly reduced the time we spend searching for documents.'
  },
  {
    logo: MichaelBrown,
    name: 'Michael Brown',
    job: 'IT Support',
    description: 'The chatbot app has streamlined our workflow and improved our productivity. It`s a game-changer!'
  },
  {
    logo: DavidGreen,
    name: 'David Green',
    job: 'Healthcare Administrator',
    description: 'A must-have for any organization looking to improve efficiency and productivity.'
  },
  {
    logo: JaneSmith,
    name: 'Jane Smith',
    job: 'HR Specialist',
    description: 'An invaluable tool for our organization. The centralized knowledge base has made our processes much more efficient.'
  },
  {
    logo: EmilyWhite,
    name: 'Emily White',
    job: 'Financial Analyst',
    description: 'Quick and easy access to information has made our decision-making process faster and more accurate.'
  },
  {
    logo: SophiaBlue,
    name: 'Sophia Blue',
    job: 'Educator',
    description: 'The chatoot app has been a fantastic addition to our institution. Ithas made accessing information so much easier for our staff.'
  },
];

export default function Story() {
  return (
    <>
      <section className="section-story">
        <div className="text--center mt--large">
          <div>
            <h1 className="hero-title">Success Stories</h1>
            <p className="story-subtitle">See how our chatbot app has helped other organizations achieve their goals.</p>
          </div>
          <ul className="story-box story_items mb--large">
            {mockData.map(value => (
              <li className="story-card">
                <div className="container-left">
                  <div className="avt-container">
                    <img src={value.logo} className="archive-logo" />
                  </div>
                  <div className="name-container">
                    <h4><b>{value.name}</b></h4>
                    <h5>{value.job}</h5>
                  </div>
                </div>
                <p>{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}