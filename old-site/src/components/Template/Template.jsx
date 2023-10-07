import classes from "./styles.module.scss";

const Template = ({ className }) => {
  return <div className={`${classes.template} ${className}`}>Template</div>;
};

export default Template;
