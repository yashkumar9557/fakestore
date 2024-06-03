import { Typography, Row, Col, Card } from "antd";
import Logo from "../../../../components/Logo";
import "./layout.css";
const { Title } = Typography;
const AuthLayout = ({ title, children }) => {
  return (
    <Row justify="center" align="middle" className="auth-container">
      <Col>
        <Card className="auth-card">
          <div className="logo-container">
            <Logo />
          </div>
          <Title level={4} className="auth-title">
            {title}
          </Title>
          {children}
        </Card>
      </Col>
    </Row>
  );
};

export default AuthLayout;
