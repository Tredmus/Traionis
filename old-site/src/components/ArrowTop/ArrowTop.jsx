import { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { Icons } from "../../Assets/Icons/Icons";

const ArrowTop = () => {
  const [isVisible, setIsVisible] = useState(
    window.pageYOffset > 300 ? true : false
  );

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    console.log("scroll");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        className={`${classes.arrow} ${!isVisible && classes.disabled}`}
        onClick={scrollToTop}
      >
        <span>
          <Icons.ImArrowUp2 />
        </span>
      </div>
    </div>
  );
};

export default ArrowTop;
