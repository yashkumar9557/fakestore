import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN } from "../../../../redux/reducers/authSlice/index.js";
import { RouteName } from "../../../../routes/Routes.js";
import { Formik } from "formik";
import { LoginSchema } from "../../validationSchema.js/index.js";
import { login } from "../../api/index.js";
import { Form, Input, Button, Typography } from "antd";
import { SHOW_NOTIFICATION } from "../../../../redux/reducers/notification/index.js";

const { Text } = Typography;
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (values, actions) => {
    actions.setSubmitting(true);
    const payload = {
      username: values.username,
      password: values.password,
    };

    const response = await login(payload);
    if (response) {
      actions.setSubmitting(false);
      const userInfo = jwtDecode(response.token);
      console.log("userInfo", userInfo);
      dispatch(
        LOGIN({
          isUser: true,
          token: response.token,
          id: userInfo.sub,
          name: userInfo.user,
        })
      );
      dispatch(
        SHOW_NOTIFICATION({
          type: "success",
          message: "Login",
          description: "User login successfully",
        })
      );
      
      navigate(RouteName.product.PRODUCT);
    }
  };
  return (
    <Formik
      initialValues={{ username: "johnd", password: "m38rmF$" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        errors,
        touched,
      }) => (
        <Form onFinish={handleSubmit} className="auth-form">
          <Form.Item
            validateStatus={errors.username && touched.username ? "error" : ""}
            help={errors.username && touched.username ? errors.username : null}
          >
            <Input
              type="username"
              name="username"
              placeholder="username"
              value={values.username}
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
          <Form.Item className="signup-link-container">
            <Text>Don't have an account? </Text>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
              className="auth-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
