import { useEffect, useState } from "react";
import classes from "./styles.module.scss";

const Card = ({
  icon,
  name,
  subServices,
  selected,
  onClick,
  animate,
  delay,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setIsAnimated(true);
      }, delay);
    }
  }, [animate, delay]);

  console.log("icon", icon);

  return (
    <div
      className={`${classes.card} ${selected && classes.active} ${
        isAnimated ? classes.waveEffect : ""
      }`}
      onClick={onClick}
    >
      <div className={classes.background}></div>
      <div className={classes.content}>
        {/* <img src={`icons/${icon}.svg`} alt="" className={classes.icon} /> */}
        <div className={classes.icon}>{icon}</div>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Card;
