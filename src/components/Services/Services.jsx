import classes from "./styles.module.scss";
import { Icons } from "../../Assets/Icons/Icons";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";

const services = [
  {
    icon: <Icons.MdDesignServices />,
    name: "Web Design",
    subServices: [
      {
        icon: <Icons.MdWeb />,
        title: "UI/UX design",
        description:
          "We craft bespoke user interfaces and experiences tailored to your brand and audience, ensuring your website is both visually appealing and user-friendly.",
      },
      {
        icon: <Icons.FaMobileAlt />,
        title: "Responsive Design",
        description:
          "We design websites that look and function beautifully across all device types, from desktops to smartphones, ensuring a seamless user experience.",
      },
      {
        icon: <Icons.FaTags />,
        title: "Branding & Logo Design",
        description:
          "Elevating your brand identity with our custom logo and branding services, ensuring a memorable and recognizable presence in your market.",
      },
    ],
  },
  {
    icon: <Icons.BiCodeAlt />,

    name: "Web Development",
    subServices: [
      {
        icon: <Icons.FaWordpress />,
        title: "WordPress Integration",
        description:
          "Harness the power of WordPress with our integration services. Whether you're looking to transform an existing site or start afresh, we seamlessly incorporate the robust features of WordPress to cater to your needs.",
      },
      {
        icon: <Icons.FaShoppingCart />,
        title: "E-commerce Solutions",
        description:
          "Launching an online store? Our team offers seamless e-commerce solutions, making the buying process effortless for your customers and management simple for you.",
      },
      {
        icon: <Icons.FaReact />,
        title: "Application Development",
        description:
          "Dive into the dynamic world of single-page applications with our React expertise. We build fast, scalable, and interactive apps that engage users and drive results.",
      },
    ],
  },
  {
    icon: <Icons.FaSearchengin />,

    name: "SEO",
    subServices: [
      {
        icon: <Icons.FaSearch />,
        title: "Keyword Research & Strategy",
        description:
          "We pinpoint the optimal keywords for your niche and craft strategies to propel your website to the top of search engine results, maximizing your online visibility.",
      },
      {
        icon: <Icons.RiPagesFill />,
        title: "On-page SEO",
        description:
          "Our team fine-tunes your website's content, structure, and meta-elements, ensuring search engines recognize and favor your content.",
      },
      {
        icon: <Icons.FaCogs />,
        title: "Technical SEO",
        description:
          " We optimize the backend of your website, ensuring fast load times, mobile responsiveness, and clear indexing, laying a solid foundation for superior search engine visibility.",
      },
    ],
  },
  {
    icon: <Icons.BsWrenchAdjustableCircle />,

    name: "Site Maintenance",
    subServices: [
      {
        icon: <Icons.FaHeadset />,
        title: "Technical Support",
        description:
          "We offer dedicated support for any technical challenges you may face, ensuring your website runs smoothly and remains accessible to your audience.",
      },
      {
        icon: <Icons.FaHdd />,
        title: "Content Updates & Backups",
        description:
          "We keep your content fresh, relevant, and safely backed up, ensuring your site remains up-to-date and can be swiftly restored in case of unforeseen issues.",
      },
      {
        icon: <Icons.FaTachometerAlt />,
        title: "Performance Optimization",
        description:
          "Our regular checks and tweaks guarantee your website operates at peak performance, ensuring fast load times and smooth user experiences.",
      },
    ],
  },
];

const Services = ({ className }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);
  console.log("className", className);
  return (
    <div className={`${classes.services} ${className}`} id="services">
      {" "}
      <h2 className="section">We will help you grow your business with</h2>
      <div className={classes.cards}>
        {services.map(({ icon, name, subServices }, index) => (
          <Card
            key={name}
            icon={icon}
            name={name}
            subServices={subServices}
            selected={index === selected}
            animate={shouldAnimate}
            delay={index * 200} // Adjust the delay time between cards here
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
      <div className={classes.divider}></div>
      <div className={classes.subServices}>
        {services[selected].subServices.map(({ icon, title, description }) => (
          <div key={title} className={classes.subService}>
            <div className={classes.icon}>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
