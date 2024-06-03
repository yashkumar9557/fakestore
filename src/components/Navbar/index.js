import { Menu } from "antd";
import "./style.css";
import {
  LogoutOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { useEffect, useState } from "react";
import { LOGOUT } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { SHOW_NOTIFICATION } from "../../redux/reducers/notification";
import AsyncModal from "../Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteName } from "../../routes/Routes";
const Navbar = () => {
  const location = useLocation();
  console.log(location);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("/products");
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);
  const handleLogout = () => {
    dispatch(LOGOUT());
    dispatch(
      SHOW_NOTIFICATION({
        type: "success",
        message: "Logout",
        description: "You have been logged out",
      })
    );
  };
  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      setShow(true);
    }
    if (e.key === "/cart") {
      setCurrent("/cart");
      navigate(RouteName.cart.CART);
    }
    if (e.key === "/products") {
      setCurrent("/product");
      navigate(RouteName.product.PRODUCT);
    }
  };
  return (
    <div className="navbar">
      <AsyncModal
        show={show}
        footer={true}
        onHide={() => setShow(false)}
        title="Are you sure you want to logout?"
        onConfirm={() => handleLogout()}
      />
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        onClick={onClick}
        //   style={{ justifyContent: "flex-end", backgroundColor: "#f0f2f5" }}
      >
        <Menu.Item key="/products" icon={<ProductOutlined />}>
          Products
        </Menu.Item>
        <Menu.Item key="/cart">
          <ShoppingCartOutlined />
          Cart
        </Menu.Item>
        <SubMenu key="/profile" title="Profile" icon={<UserOutlined />}>
          <Menu.Item icon={<SettingOutlined />} key="profile">
            Setting
          </Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} key="logout">
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};
export default Navbar;
