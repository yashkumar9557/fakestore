import { Button } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { RouteName } from "../../../../routes/Routes";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="main">
        <h1>Welcome to Fake Store!</h1>
        <img src="https://fakestoreapi.com/icons/logo.png" />
        <Button onClick={() => navigate(RouteName.auth.LOGIN)} type="primary">
          Go to Login
        </Button>
        
      </div>
    </div>
  );
};
export default Landing;
