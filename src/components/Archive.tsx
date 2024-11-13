import fileLogo from '../assets/archive_logo/file.png'
import clockLogo from '../assets/archive_logo/clock.png'
import searchLogo from '../assets/archive_logo/search.png'
import linkLogo from '../assets/archive_logo/link.png'
import penLogo from '../assets/archive_logo/pen.png'
import userLogo from '../assets/archive_logo/user.png'

const mockDataLine = [
  {
    logo: fileLogo,
    title: 'Centralized Knowledge Base',
    description: 'Upload files and URLs to create a comprehensive repository of organizational knowledge.'
  },
  {
    logo: searchLogo,
    title: 'Efficient Information Retrieval',
    description: 'Query the chatbot to get precise answers quickly, reducing time spent searching for information.'
  },
  {
    logo: clockLogo,
    title: 'Enhanced Productivity',
    description: 'Streamline workflows and improve decision-making with easy access to information.'
  },
  {
    logo: userLogo,
    title: 'Collaborative Environment',
    description: 'Enable employees to share and access knowledge seamlessly, fostering a collaborative work culture.'
  },
  {
    logo: linkLogo,
    title: 'Versatile Data Handling',
    description: 'Supports various forms of knowledge, including documents and web links.'
  },
  {
    logo: penLogo,
    title: 'Scalable Solution',
    description: 'Ideal for medium to large organizations across multiple industries.'
  },
];

export default function Archive() {
  return (
    <>
      <section className="section-archive mb--medium">
        <div>
          <h1 className="hero-title">Achieve Your Goals with Our Chatbot App</h1>
          <p className="archive-subtitle">Discover how our features can help you streamline information retrieval and enhance productivity.</p>
        </div>
        <ul className="archive-box archive_items mb--large">
          {mockDataLine.map(value => (
            <li>
              <div className="container-left">
                <div className="mr--small">
                <img src={value.logo} className="archive-logo" />
                </div>
                <div>
                  <h1 className="archive-title">{value.title}</h1>
                  <p className="archive-description">{value.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}