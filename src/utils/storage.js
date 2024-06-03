const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
const removeStorage = (key) => {
  localStorage.removeItem(key);
};
const clearStorage = () => {
  localStorage.clear();
};
export { setStorage, getStorage, removeStorage, clearStorage };
