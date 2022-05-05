import {
  ArrowRightOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  notification,
  Radio,
  Row,
} from "antd";
import "antd/dist/antd.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import { getProductById, productSelector } from "../redux/slice/ProductSlice";
import { getListProduct, productsSelector } from "../redux/slice/ProductsSlice";
import { addToCart } from "../redux/slice/CartSlice";

const AppDetail = () => {
  const { product } = useSelector(productSelector);
  const { products } = useSelector(productsSelector);
  const dispatch = useDispatch();
  const param = useParams();
  const nav = useNavigate();
  const productId = parseInt(param.productId);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  let count = 0;

  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getListProduct());
  }, [productId]);

  const handleChangeQuantity = (e) => {
    console.log(e);
    setQuantity(e);
  };

  const handleChangeSize = (e) => {
    console.log(e.target.value);
    setSize(e.target.value);
  };

  const handleBuyNow = (productId, size, quantity) => {
    if (size === "") {
      notification["warning"]({
        message: "Please choose size!",
      });
    } else {
      dispatch(addToCart({ productId, size, quantity }));
      nav("/your-cart");
    }
  };

  return (
    <div className="block">
      <Row className="detailArea" gutter={[0, 0]} style={{ minWidth: "100%" }}>
        <Col span={10} className="productImgArea">
          <Carousel
            className="productCarousel"
            autoPlay
            interval="2000"
            transitionTime="500"
          >
            {product.img.arrImg.map((idx) => {
              return (
                <div key={idx}>
                  <img src={idx} />
                </div>
              );
            })}
          </Carousel>
        </Col>

        <Col span={14} className="productInfoArea">
          <div>
            <h1 className="proName">{product.name}</h1>

            <h4>SKU: {product.productKey}</h4>

            <h4>
              Price:
              <span className="proPrice">
                {product.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </h4>

            <h4>
              Size:
              <span style={{ marginLeft: "5px" }}>
                <Radio.Group
                  name="radiogroup"
                  defaultValue={product.size[0]}
                  onChange={handleChangeSize}
                >
                  {product.size.map((idx) => {
                    return (
                      <Radio.Button
                        style={{ marginLeft: "5px" }}
                        value={idx}
                        key={idx}
                      >
                        {idx}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </span>
            </h4>

            <h4>
              Quantity:
              <span style={{ marginLeft: "5px" }}>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={handleChangeQuantity}
                />
              </span>
            </h4>
          </div>
          <div className="btnBuyArea">
            <Button
              className="btnAddCart"
              onClick={
                () => dispatch(addToCart({ productId, size, quantity }))
                //nav("/your-cart")
              }
            >
              <ShoppingCartOutlined style={{ fontSize: "25px" }} />
              ADD TO CART
            </Button>
            <Button className="btnBuyNow" onClick={() => handleBuyNow(productId, size, quantity)}>
              <HeartFilled style={{ fontSize: "25px", color: "red" }} />
              BUY NOW
            </Button>
          </div>
        </Col>
      </Row>

      <Divider>
        <span className="proName">RELATED PRODUCT</span>
      </Divider>

      <div className="products" style={{ margin: "10px" }}>
        <Row gutter={[16, 16]}>
          {products.map((p) => {
            if (
              p.type.toLowerCase() === product.type &&
              p.key !== product.key
            ) {
              count++;
              if (count <= 8) {
                return (
                  <Col
                    sx={{ span: 24 }}
                    sm={{ span: 12 }}
                    md={{ span: 6 }}
                    key={p.key}
                    onClick={() => (
                      dispatch(getProductById(p.key)),
                      (<Link to={`/${p.key}`} />)
                    )}
                  >
                    <Card
                      hoverable
                      bordered={false}
                      cover={<img alt="example" src={p.img.mainImg} />}
                    >
                      <h4>{p.name}</h4>
                      <div className="currency">
                        <h4>
                          {p.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h4>
                        <Button
                          className="btnView"
                          onClick={() => {
                            <Link to={`/${p.key}`} />;
                          }}
                        >
                          VIEW
                        </Button>
                      </div>
                    </Card>
                  </Col>
                );
              }
            }
          })}
        </Row>
        <Button className="btnViewMore" onClick={() => nav("/products")}>
          SEE MORE <ArrowRightOutlined color="blue" />
        </Button>
      </div>
    </div>
  );
};

export default AppDetail;
