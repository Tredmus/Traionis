import classes from "./styles.module.scss";

const projects = [
  {
    link: "https://roots.previews.dev",
    image: "images/rootsCreative.png",
    name: "Roots Creative",
  },
  {
    link: "http://3.126.201.78.nip.io/",
    image: "images/ibvSolar.png",
    name: "IBV Solar",
  },
  {
    link: "https://blvr.com/",
    image: "images/blvr.png",
    name: "BLVR",
  },
];

const Portfolio = () => {
  return (
    <div className={classes.portfolio} id="portfolio">
      <h2 className="section">Our latest projects</h2>
      <div className={classes.projects}>
        {projects.map(({ image, link, name }) => (
          <a href={link} key={link} target="_blank" className={classes.project}>
            <img src={image} alt="" className={classes.image} />
            <a href={link} target="_blank" className={classes.overlay} />
            <div className={classes.label}>
              <h3>{name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
