import classes from "./styles.module.scss";
import { Icons } from "../../assets/Icons/Icons";

const Pricing = ({ className }) => {
  const features = [
    {
      icon: <Icons.MdOutlineDesignServices className={classes.icon} />,
      text: "Custom Design",
    },
    {
      icon: <Icons.RiPagesLine className={classes.icon} />,
      text: "5 Pages",
    },
    {
      icon: <Icons.BsPhone className={classes.icon} />,
      text: "Responsive Design",
    },
    {
      icon: <Icons.FaWordpressSimple className={classes.icon} />,
      text: "Wordpress Integration",
    },
    {
      icon: <Icons.FaSearchengin className={classes.icon} />,
      text: "SEO",
    },
  ];

  return (
    <div className={`${classes.pricing} ${className}`} id="pricing">
      <h2 className="section">Web Starter Pack</h2>
      <div>
        <div className={classes.body}>
          <h1 className={classes.price}>
            <span className={classes.thin}>Starting from </span>
            <span>1300$</span>
          </h1>

          <ul className={classes.features}>
            {features.map((feature, index) => (
              <li key={index}>
                {feature.icon}
                {feature.text}
              </li>
            ))}
          </ul>

          <img src="images/man-laptop.png" alt="" className={classes.picture} />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
