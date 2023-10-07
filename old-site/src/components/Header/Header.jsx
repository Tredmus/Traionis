import { useEffect, useState } from "react";
import { Icons } from "../../assets/Icons/Icons";
import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

const navLinks = [
  {
    label: "Home",
    id: "hero",
    route: "/#hero",
  },
  {
    label: "Services",
    id: "services",
    route: "/#services",
  },
  {
    label: "About Us",
    id: "about-us",
    route: "/#about-us",
  },
  {
    label: "Portfolio",
    id: "portfolio",
    route: "/#portfolio",
  },
  {
    label: "Pricing",
    id: "pricing",
    route: "/#pricing",
  },
  {
    label: "FAQ",
    id: "faq",
    route: "/#faq",
  },
  {
    label: "Contact Us",
    id: "contact-us",
    route: "/#contact-us",
  },
];

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isHeaderSticky, setHeaderSticky] = useState(false);
  const [selectedLink, setSelectedLink] = useState(0);
  const [prevScroll, setPrevScroll] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const menuRef = useRef();

  console.log("menuOpened", menuOpened);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const stickyCheck = scrollY > 0 && scrollY < prevScroll;
      setTimeout(() => {
        setMenuOpened(false);
      }, 750);

      setHeaderScrolled(scrollY > 100);
      setHeaderSticky(stickyCheck);
      setPrevScroll(scrollY);

      const inView = navLinks.findIndex(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        const offset = 10; // Adjust this value as needed

        return rect.top >= 0 && rect.top < window.innerHeight - offset;
      });

      setSelectedLink(inView === -1 ? 0 : inView);
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll]);

  useEffect(() => {
    console.log("menuOpened", menuOpened);
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`${classes.header} ${headerScrolled && classes.scrolled} ${
        isHeaderSticky && classes.sticky
      }`}
    >
      <nav
        className={`${classes.menu} ${menuOpened && classes.active}`}
        ref={menuRef}
      >
        <div className={classes.menuLine}>
          <div
            className={classes.dot}
            style={{ top: selectedLink * (23 + 16) + 11.5 }} // 23 - height of li, 16 - margin-bottom of li, 11.5 - half of li height
          ></div>
        </div>
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.label}>
              <a
                href={link.route}
                className={`underline ${
                  index === selectedLink && "underline-active"
                }`}
                onClick={() => {
                  setSelectedLink(index);
                  setTimeout(() => {
                    setMenuOpened(false);
                  }, 750);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={classes.headerInner}>
        <div className={classes.element}>
          <label
            for="check"
            className={`${classes.burger} ${menuOpened && classes.active}`}
          >
            <input
              type="checkbox"
              id="check"
              onClick={() => {
                // if (menuRef.current && !menuRef.current.contains(event.target))
                setMenuOpened(!menuOpened);

                console.log("menuOpened", menuOpened);
              }}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <NavLink to={"."} className={classes.element}>
          <img src="images/traionis.png" alt="" className={classes.logo} />
        </NavLink>
        <a
          className={`${classes.element} ${classes.contact}`}
          href="/#contact-us"
        >
          {/* <span>Get in touch today!</span> */}
          <div className={classes.contactUs}>
            <img src="icons/contact.svg" alt="" />
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
