import classes from "./styles.module.scss";
// import { Icons } from "../../Assets/Icons/Icons";

const Footer = () => {
  return (
    <div className={classes.footer} id="contact-us">
      <div className={classes.inner}>
        <div className={classes.left}>
          <div className={classes.leftInner}>
            <img
              src="images/traionis-small.png"
              alt=""
              className={classes.logo}
            />
            <h2>Want to talk with us?</h2>
            <h1>miro@traionis.com</h1>
          </div>
        </div>
        <div className={classes.right}>
          © 2023 Traionis. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
