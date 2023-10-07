import { useEffect, useState } from "react";
import classes from "./styles.module.scss";

const ScrollLine = ({ className }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      const currentScrollPercentage =
        (scrollTop / (scrollHeight - windowHeight)) * 100;
      setScrollPercentage(currentScrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${classes.scroll} ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scrollPercentage}%`,
        height: "4px",
        backgroundColor: "#00bbff",
        zIndex: 9999,
      }}
    ></div>
  );
};

export default ScrollLine;
