import { cart } from "../../../lib/apiList";
import { axios } from "../../../lib/axios";

const getCartProduct = (id) => {
  return axios.get(`${cart.getCartProduct}${id}`);
};
const addToCart = (payload) => {
  return axios.post(cart.addToCart, payload);
};

export { getCartProduct, addToCart };
