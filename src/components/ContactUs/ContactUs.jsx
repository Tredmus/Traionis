import { useForm } from "react-hook-form";
import classes from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { validations } from "./validations";
// import { Icons } from "../../Assets/Icons/Icons";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validations), mode: "onChange" });

  return (
    <div className={classes.contactUs} id="contact-us">
      <div className={classes.inner}>
        <div className={classes.left}>
          <img src="images/contact-us.png" alt="" />
        </div>
        <div className={classes.right}>
          <h2 className="section">Ask us anything!</h2>
          <form
            className={classes.form}
            onSubmit={handleSubmit((data) => {
              console.log("data", data);
            })}
          >
            <div className={classes.row}>
              <input
                className={classes.field}
                type="text"
                {...register("name")}
                placeholder="Name"
              />
              <input
                className={classes.field}
                type="text"
                {...register("email")}
                placeholder="Email"
              />
              <input
                className={classes.field}
                type="text"
                {...register("subject")}
                placeholder="Subject"
              />
            </div>
            <div className={classes.row}>
              <textarea
                className={classes.field}
                {...register("details")}
                placeholder="Details"
                rows={7}
              />
            </div>
            <input type="submit" className={classes.btn} value={"Send"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
