import { axios } from "../../../lib/axios";
import { product } from "../../../lib/apiList";
const getAllProducts = () => {
  return axios.get(product.allProduct);
};
const getProductById = (id) => {
  return axios.get(`${product.productById}${id}`);
};

export { getAllProducts, getProductById };
