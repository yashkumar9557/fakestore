import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { RouteName } from "../../../routes/Routes.js";
import { signup } from "../api/index.js";
import SignupForm from "../components/forms/SignupForm.js";
import AuthLayout from "../components/Layout/layout.js";

const { Title, Text } = Typography;
const Signup = () => {
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
      navigate(RouteName.auth.LOGIN);
    }
  };
  return (
    <AuthLayout title="Signup Page">
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
