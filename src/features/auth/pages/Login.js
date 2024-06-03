 
import AuthLayout from "../components/Layout/layout.js";
import LoginForm from "../components/forms/LoginForm.js";

const LoginPage = () => {
  return (
    <AuthLayout title="Login Page">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
