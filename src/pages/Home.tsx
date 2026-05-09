import './Home.css'
import { Link } from 'react-router-dom'
import photo from '../assets/myphoto.jpg'

function Home() {
  return (
    <div className="home">

      <section className="hero">

        {/* Left — Photo */}
        <div className="hero__image">
          <img src={photo} alt="Toby" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Right — Content */}
        <div className="hero__content">
          <h1 className="hero__title">
            Welcome. I'm Toby, an animator and illustrator.
          </h1>
          <p className="hero__sub">
            Here, you can read about what I can do for you at your request.
          </p>
          <div className="hero__cta">
            <a href="#services" className="btn-primary">See My Work</a>
            <Link to="/contact" className="btn-ghost">Get in Touch</Link>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Home