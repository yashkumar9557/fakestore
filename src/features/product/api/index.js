import { axios } from "../../../lib/axios";

const getAllProducts = () => {
  return axios.get("/products");
};
const getProductById = (id) => {
  return axios.get(`/products/${id}`);
};
const addToCart = ( payload) => {
  return axios.post(`/carts`, payload);
};
export { getAllProducts, getProductById, addToCart };
