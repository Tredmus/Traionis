import classes from "./styles.module.scss";

const Hero = ({ className }) => {
  return (
    <div className={`${classes.hero} ${className}`} id="hero">
      <div className={classes.heroInner}>
        <div className={classes.left}>
          <h1>
            Elevate Your Online Presence{" "}
            <span>with Custom Web Development</span>
          </h1>
          <p>
            Creating beautifully functional websites tailored to your vision
          </p>
          <div className="btn">
            Get started
            <div className="btn__icon">
              <img src="icons/arrow-transparent.svg" alt="" />
              <img src="icons/arrow.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <img src="images/hero-image.png" alt="" className={classes.heroImage} />
      </div>
    </div>
  );
};

export default Hero;
