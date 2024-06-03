import { auth } from "../../../lib/apiList";
import { axios } from "../../../lib/axios";
const login = (data) => {
  return axios.post(auth.login, data);
};
const signup = (data) => {
  return axios.post(auth.signup, data);
};
export { login, signup };
