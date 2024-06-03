import { Button, Card, Col, Row } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getAllProducts } from "../../api";
import { addToCart } from "../../../cart/api";
import Rating from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { AsyncModal } from "../../../../components";
import { SHOW_NOTIFICATION } from "../../../../redux/reducers/notification";

const Product = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.persistedReducers);
  const { id } = auth;
  const [Products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const getProduct = async () => {
    const response = await getAllProducts();
    setProducts(response);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const openAddToCartModal = (product) => {
    setSelectedProduct(product);
    setShowCart(true);
  };
  const handleAddToCart = async () => {
    const payload = {
      userId: id,
      date: new Date(),
      products: [
        {
          productId: selectedProduct.id,
          quantity,
        },
      ],
    };
    const response = await addToCart(payload);
    console.log("Add to cart", response);
    setQuantity(1);
    setShowCart(false);
    dispatch(
      SHOW_NOTIFICATION({
        type: "success",
        message: "Add to cart",
        description: "Product added to cart successfully",
      })
    );

    // console.log("Add to cart", selectedProduct, quantity);
  };
  const handleQuantity = (name) => {
    if (name === "increment") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  return (
    <div className="product-listing">
      <AsyncModal
        title={"Add to Cart"}
        show={showCart}
        footer={true}
        onConfirm={handleAddToCart}
        onHide={() => {
          setShowCart(false);
          setQuantity(1);
        }}
      >
        <Card
          cover={
            <img
              style={{ height: "200px", width: "230px" }}
              alt="example"
              src={selectedProduct?.image}
            />
          }
        >
          <Card.Meta
            title={selectedProduct?.title}
            description={selectedProduct?.description}
          />
          <Row>
            Total : <span>${selectedProduct?.price * quantity}</span>
          </Row>
          <Row style={{ justifyContent: "center", alignItems: "center" }}>
            Quantity :{" "}
            <Button onClick={() => handleQuantity("decrement")}>-</Button>
            <span>{quantity}</span>
            <Button onClick={() => handleQuantity("increment")}>+</Button>
          </Row>
        </Card>
      </AsyncModal>
      <AsyncModal
        title={"Product Detail"}
        show={showProductDetailModal}
        onHide={() => setShowProductDetailModal(false)}
      >
        <Card
          cover={
            <img
              style={{ height: "200px", width: "230px" }}
              alt="example"
              src={selectedProduct?.image}
            />
          }
        >
          <Card.Meta
            title={selectedProduct?.title}
            description={selectedProduct?.description}
          />
          <Row style={{ marginTop: "20px" }}>
            <Col style={{ display: "flex" }} span={24}>
              <strong>Rating :</strong>{" "}
              <Rating
                count={5}
                value={Math.floor(selectedProduct?.rating?.rate)}
                size={15}
                activeColor="#ffd700"
                edit={false}
              />
              <span style={{ marginLeft: "8px" }}>
                ({selectedProduct?.rating?.count})
              </span>
            </Col>
            <Col span={24}>
              <strong>Price :</strong> ${selectedProduct?.price}
            </Col>
          </Row>
        </Card>
      </AsyncModal>

      <Row gutter={[16, 16]}>
        {Products.map((product) => (
          <Col span={8} key={product?.id}>
            <Card
              hoverable
              cover={
                <img
                  style={{ height: "200px", width: "230px" }}
                  alt="example"
                  src={product.image}
                />
              }
              actions={[
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      count={5}
                      value={Math.floor(product.rating.rate)}
                      size={15}
                      activeColor="#ffd700"
                      edit={false}
                    />
                    <span style={{ marginLeft: "8px" }}>
                      ({product?.rating?.count})
                    </span>
                  </div>
                </>,
                `$${product?.price}`,
                <ShoppingCartOutlined
                  onClick={() => openAddToCartModal(product)}
                  key="add-to-cart"
                />,
                // <ShoppingOutlined key="add-to-cart" />,
              ]}
            >
              <Card.Meta
                onClick={() => {
                  setSelectedProduct(product);
                  setShowProductDetailModal(true);
                }}
                style={{ height: "80px" }}
                title={product.title}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Product;
