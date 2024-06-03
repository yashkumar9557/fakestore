//api end points
const auth = {
  login: "auth/login",
  signup: "users",
};
const product = {
  allProduct: "/products",
  productById: "/products/",
  removeFromCart: "cart",
};
const cart = { 
  getCartProduct: "/carts/user/",
  addToCart: "/carts",
};
export { auth, product, cart };
