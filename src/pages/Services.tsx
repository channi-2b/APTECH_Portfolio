import './Services.css'

const services = [
  {
    num: "01",
    title: "Graphic Design",
    desc: "Visual identities, logos, layouts, and print-ready artwork crafted to communicate your brand with clarity and purpose.",
  },
  {
    num: "02",
    title: "Web Design",
    desc: "Clean, responsive web layouts and UI designs built with a focus on usability, aesthetics, and a strong visual presence.",
  },
  {
    num: "03",
    title: "Storyboarding / Scriptwriting",
    desc: "Shot planning, narrative sequencing, and scripts that give your production a solid creative foundation from the start.",
  },
];

function Services() {
  return (
    <div className="services">

      <section className="services__hero">
        <h1 className="services__title">Services</h1>
        <p className="services__sub">What I can do for you.</p>
      </section>

      <section className="services__grid">
        {services.map((service) => (
          <div key={service.num} className="service-card">
            <span className="service-card__num">{service.num}</span>
            <h5 className="service-card__title">{service.title}</h5>
            <p className="service-card__desc">{service.desc}</p>
          </div>
        ))}
      </section>

    </div>
  )
}

export default Services