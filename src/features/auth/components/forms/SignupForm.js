import { useNavigate, Link } from "react-router-dom";
import { RouteName } from "../../../../routes/Routes.js";
import { Formik } from "formik";
import { SignUpSchema } from "../../validationSchema.js/index.js";
import { signup } from "../../api/index.js";
import { Form, Input, Button, Typography } from "antd";
import { SHOW_NOTIFICATION } from "../../../../redux/reducers/notification/index.js";
import { useDispatch } from "react-redux";

const { Text } = Typography;
const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleSignup = async (values, actions) => {
    actions.setSubmitting(true);
    const payload = {
      email: values.email,
      username: values.username,
      password: values.password,
      name: values.name,
      phone: values.phone,
    };
    const response = await signup(payload);
    if (response) {
      actions.setSubmitting(false);
      dispatch(SHOW_NOTIFICATION({
        type: "success",
        message: "Signup",
        description: "User register successfully",
      }))
      navigate(RouteName.auth.LOGIN);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={handleSignup}
    >
      {({
        values,
        handleChange,
        isSubmitting,
        handleSubmit,
        errors,
        touched,
      }) => (
        <Form onFinish={handleSubmit} className="auth-form">
          <Form.Item
            validateStatus={errors.name && touched.name ? "error" : ""}
            help={errors.name && touched.name ? errors.name : null}
          >
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.username && touched.username ? "error" : ""}
            help={errors.username && touched.username ? errors.username : null}
          >
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.phone && touched.phone ? "error" : ""}
            help={errors.phone && touched.phone ? errors.phone : null}
          >
            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.email && touched.email ? "error" : ""}
            help={errors.email && touched.email ? errors.email : null}
          >
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.password && touched.password ? "error" : ""}
            help={errors.password && touched.password ? errors.password : null}
          >
            <Input.Password
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            validateStatus={
              errors.confirmPassword && touched.confirmPassword ? "error" : ""
            }
            help={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : null
            }
          >
            <Input.Password
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item className="signup-link-container">
            <Text>Do you have account ?</Text>
            <Link to={RouteName.auth.LOGIN} className="signup-link">
              Login
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="auth-button"
              disabled={isSubmitting}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};
export default SignupForm;
