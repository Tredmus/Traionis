import * as Yup from "yup";

export const validations = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  company: Yup.string(),
  details: Yup.string().required('Details are required')
});
