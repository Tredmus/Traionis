import classes from "./styles.module.scss";
import { Icons } from "../../Assets/Icons/Icons";
import { useState } from "react";

const questions = [
  {
    title: "Do you offer maintenance?",
    description: (
      <span>
        Yes, our monthly maintenance is part of our comprehensive service
        offering. It includes:
        <ul>
          <li>Traffic reports</li>
          <li>Security reports</li>
          <li>Plugin updates</li>
          <li>Site backups</li>
          <li>Content updates</li>
        </ul>
      </span>
    ),
  },
  {
    title: "Will I have access to my website during development?",
    description: (
      <span>
        Absolutely. Every client is granted access details to monitor the
        progress. You can witness the transformation firsthand, contribute to
        refining your website, and immerse yourself in modern web design.
        Through this interaction, you're always in the loop about how we're
        positioning your brand to the audience.
      </span>
    ),
  },
  {
    title: "What's the typical timeline for website completion?",
    description: (
      <span>
        On average, website development takes 2 weeks from the moment we gather
        all the necessary details from the client.
      </span>
    ),
  },
  {
    title: "How will my website appear across devices?",
    description: (
      <span>
        We ensure that your site looks and functions impeccably across a range
        of devices – from desktops and laptops to tablets and smartphones.
        Living in a digitized age, it's crucial your online presence is
        versatile and user-friendly across all platforms.
      </span>
    ),
  },
  {
    title: "Do I need web hosting?",
    description: (
      <span>
        Yes, web hosting is essentially where your website "lives" online,
        making it accessible to internet users. If you don't have hosting, no
        worries. We provide competitive hosting options to keep your site
        accessible and running smoothly. Our annual hosting fee is competitively
        priced and ensures reliable performance and we offer 1 year for free.
      </span>
    ),
  },
  {
    title: "What about domain names?",
    description: (
      <span>
        A domain is the web address for your site, like
        "www.yourbusinessname.com." Domains are purchased separately, but we can
        guide you through the process and provide recommendations. Various
        domain extensions (.com, .net, .bg, etc.) come at different prices, and
        we can help you find the right fit.
      </span>
    ),
  },
  // {
  //   title: "What's the typical timeline for website completion?",
  //   description: (
  //     <span>
  //       On average, website development takes 2 weeks from the moment we gather
  //       all the necessary details from the client.
  //     </span>
  //   ),
  // },
];

const FAQ = ({ className }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const handleChange = (index) => {
    if (index !== activeQuestion) setActiveQuestion(index);
    else setActiveQuestion(null);
  };

  return (
    <div className={`${classes.faq} ${className}`} id="faq">
      <h2 className="section">FAQ</h2>
      <div className={classes.questions}>
        {questions.map(({ title, description }, index) => (
          <div
            key={index}
            className={`${classes.question} ${
              activeQuestion === index && classes.active
            }`}
            onClick={() => handleChange(index)}
          >
            <div className={classes.questionHead}>
              <h4>{title}</h4>
              {activeQuestion === index ? (
                <img src="/icons/arrow-faq-2.svg" />
              ) : (
                <img src="/icons/arrow-faq.svg" />
              )}
            </div>
            <p className={classes.answer}>{description}</p>
          </div>
        ))}
      </div>
      <img src="images/colors.png" alt="" className={classes.background} />
    </div>
  );
};

export default FAQ;
