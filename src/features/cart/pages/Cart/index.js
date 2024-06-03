import { useSelector } from "react-redux";
import { getAllProducts } from "../../../product/api";
import { useEffect, useState } from "react";
import { getCartProduct } from "../../api";
import Rating from "react-rating-stars-component";
import { Button, Card, Col, Row } from "antd";
import "./index.css";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalValue, setTotalValue] = useState(0);
  const { id } = useSelector((state) => state.persistedReducers.auth);
  const getCart = async () => {
    const response = await getCartProduct(id);
    const productQuantities = response
      .flatMap((order) => order.products)
      .reduce((acc, { productId, quantity }) => {
        if (!acc[productId]) {
          acc[productId] = 0;
        }
        acc[productId] += quantity;
        return acc;
      }, {});
    const result = Object.entries(productQuantities).map(
      ([productId, quantity]) => ({
        productId: Number(productId),
        quantity,
      })
    );
    const allProduct = await getAllProducts();
    const cartProducts = allProduct.filter((product) =>
      result.some((cartProduct) => cartProduct.productId === product.id)
    );
    cartProducts.forEach((product) => {
      product.quantity = result.find(
        (cartProduct) => cartProduct.productId === product.id
      ).quantity;
    });
    setCartProducts(cartProducts);
    setQuantities(productQuantities);
    calculateTotalValue(cartProducts);
  };

  const calculateTotalValue = (products) => {
    const total = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setTotalValue(total);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 0) return;

    const updatedQuantities = { ...quantities, [productId]: newQuantity };
    setQuantities(updatedQuantities);

    const updatedCartProducts = cartProducts.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setCartProducts(updatedCartProducts);
    calculateTotalValue(updatedCartProducts);

    // if (newQuantity === 0) {
    //   await removeCartProduct(productId);
    // } else {
    //   await updateCartProduct(productId, newQuantity);
    // }
  };

  const handleDecrease = (productId) => {
    const currentQuantity = quantities[productId];
    updateQuantity(productId, currentQuantity - 1);
  };

  const handleIncrease = (productId) => {
    const currentQuantity = quantities[productId];
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleRemove = async (productId) => {
    // await removeCartProduct(productId);
    const updatedCartProducts = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedCartProducts);
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[productId];
    setQuantities(updatedQuantities);
    calculateTotalValue(updatedCartProducts);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="cart">
        <div className="cart-total">
          <h3>Total Value: ${totalValue.toFixed(2)}</h3>
        </div>
        {cartProducts.map((product) => (
          <div className="cart-item" key={product.id}>
            <Card className="cart-card">
              <Row>
                <Col span={8}>
                  <img
                    className="cart-item-image"
                    alt={product.title}
                    src={product.image}
                  />
                </Col>
                <Col span={16}>
                  <div className="cart-item-details">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>
                      <strong>Price: </strong>${product.price}
                    </p>
                    <Col style={{ display: "flex" }} span={24}>
                      <strong>Rating: </strong>{" "}
                      <Rating
                        count={5}
                        value={Math.floor(product?.rating?.rate)}
                        size={15}
                        activeColor="#ffd700"
                        edit={false}
                      />
                      <span style={{ marginLeft: "8px" }}>
                        ({product?.rating?.count})
                      </span>
                    </Col>
                    <Row style={{ alignItems: "center" }}>
                      Quantity:{" "}
                      <Button onClick={() => handleDecrease(product.id)}>
                        -
                      </Button>
                      <span>{quantities[product.id]}</span>
                      <Button onClick={() => handleIncrease(product.id)}>
                        +
                      </Button>
                      {quantities[product.id] === 0 && (
                        <Button onClick={() => handleRemove(product.id)}>
                          Remove Product
                        </Button>
                      )}
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
export default Cart;
