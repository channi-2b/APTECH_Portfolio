import './Works.css'

const works = [
  {
    num: "01",
    title: "My Resume",
    tag: "Web Design",
    url: "https://channi-2b.github.io/APTECH1_FGLab1/",
  },
  {
    num: "02",
    title: "Enrollment Status Checker",
    tag: "Frontend",
    url: "https://channi-2b.github.io/FG_Lab2_Carino/",
  },
  {
    num: "03",
    title: "Package",
    tag: "Frontend",
    url: "https://channi-2b.github.io/FG_Lab3_Carino/",
  },
  {
    num: "04",
    title: "Event Dashboard",
    tag: "Dashboard",
    url: "https://channi-2b.github.io/MG_Lab4_APTECH/",
  },
  {
    num: "05",
    title: "Student Portal",
    tag: "Web App",
    url: "https://channi-2b.github.io/APTECH_MG_Lab5/",
  },
  {
    num: "06",
    title: "Book Requesting Form",
    tag: "Web App",
    url: "https://channi-2b.github.io/APTECH_MGLab_6/",
  },
  {
    num: "07",
    title: "Feedback App",
    tag: "Web App",
    url: "https://channi-2b.github.io/Finals_Lab1_APTECH/",
  },
];

function Works() {
  return (
    <div className="works">

      <section className="works__hero">
        <h1 className="works__title">Works</h1>
        <p className="works__sub">A collection of projects built along the way.</p>
      </section>

      <section className="works__grid">
        {works.map((work) => (
          <a
            key={work.num}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card"
          >
            <div className="work-card__top">
              <span className="work-card__num">{work.num}</span>
              <span className="work-card__tag">{work.tag}</span>
            </div>
            <div className="work-card__bottom">
              <h5 className="work-card__title">{work.title}</h5>
              <span className="work-card__arrow">→</span>
            </div>
          </a>
        ))}
      </section>

    </div>
  )
}

export default Works