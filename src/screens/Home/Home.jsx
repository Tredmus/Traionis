import classes from "./styles.module.scss";
import { Hero } from "../../components/Hero";
import { Services } from "../../components/Services";
import { AboutUs } from "../../components/AboutUs";
import { Portfolio } from "../../components/Portfolio";
import { Pricing } from "../../components/Pricing";
import { FAQ } from "../../components/Faq";
import { ContactUs } from "../../components/ContactUs";
import { Footer } from "../../components/Footer";

const Home = () => {
  return (
    <div className={classes.home}>
      <Hero className={classes.hero} />
      <Services className={classes.services} />
      <AboutUs className={classes.aboutUs} />
      {/* <Portfolio className={classes.portfolio} /> */}
      <Pricing className={classes.pricing} />
      <FAQ className={classes.faq} />
      <ContactUs className={classes.contactUs} />
      <Footer className={classes.footer} />
    </div>
  );
};

export default Home;
