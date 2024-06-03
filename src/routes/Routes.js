import { LoginPage, SignUp } from "../features/auth/routes";
import { Landing } from "../features/misc/routes";
import { Product } from "../features/product/routes";
import { Cart } from "../features/cart/routes";
const RouteName = {
  misc: {
    LANDING: "/",
  },
  auth: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT: "/forgot",
  },
  product: {
    PRODUCT: "/products",
  },
  cart: {
    CART: "/cart",
  },
};
const publicRoutes = [
  {
    path: RouteName.misc.LANDING,
    component: <Landing />,
  },
  {
    path: RouteName.auth.LOGIN,
    component: <LoginPage />,
  },
  {
    path: RouteName.auth.SIGNUP,
    component: <SignUp />,
  },
];
const protectedRoutes = [
  {
    path: RouteName.product.PRODUCT,
    component: <Product />,
  },
  {
    path: RouteName.cart.CART,
    component: <Cart />,
  },
];
export { publicRoutes, protectedRoutes, RouteName };
