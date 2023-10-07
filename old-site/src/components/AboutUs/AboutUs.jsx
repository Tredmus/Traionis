import classes from "./styles.module.scss";

const AboutUs = ({ className }) => {
  return (
    <div className={`${classes.aboutUs} ${className}`} id="about-us">
      <div className={classes.left}>
        <h2 className="underlined section">Who are we?</h2>
        {/* <h3>Traionis: Empowering Business Growth</h3> */}
        <p>
          <span>
            Welcome to <span className="underline">Traionis</span>. We're here
            to help businesses shine online. Whether you're looking to create a
            stunning website, boost your site's rankings on search engines, or
            need someone to keep your website running smoothly, we've got your
            back.
          </span>
          <br />
          <br />
          <span>
            Our services include top-notch web design, solid web development,
            effective SEO strategies, and reliable site maintenance. With our
            help, your website won't just look great; it will perform even
            better.
          </span>
        </p>
      </div>
      <div className={classes.right}>
        <img src="images/about-us.png" alt="" />
      </div>
      <img src="images/colors.png" alt="" className={classes.background} />
    </div>
  );
};

export default AboutUs;
