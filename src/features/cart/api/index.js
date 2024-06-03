import { axios } from "../../../lib/axios";

const getCartProduct = (id) => {
  return axios.get(`/carts/user/${id}`);
};

export { getCartProduct };
