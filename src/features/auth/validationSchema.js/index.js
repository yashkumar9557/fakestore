import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const LoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const SignUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.string().max(10).min(10).matches(phoneRegExp, 'Phone number is not valid').required(), 
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  username: yup.string().min(4).required(),
  name: yup.string().required(),
});

export { LoginSchema, SignUpSchema };
