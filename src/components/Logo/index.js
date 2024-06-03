import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate("/")}
      src="https://fakestoreapi.com/icons/logo.png"
      alt="Logo"
      className="auth-logo"
    />
  );
};

export default Logo;
