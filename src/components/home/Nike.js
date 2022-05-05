import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListProduct, productsSelector } from "../redux/slice/ProductsSlice";

const AppNike = () => {
  const nav = useNavigate();

  const { products } = useSelector(productsSelector);
  console.log(products);

  let count = 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());
  }, []);

  return (
    <div id="nike" className="block nikeBlock">
      <div className="titleHolder">
        <h2 className="prosName">NIKE</h2>
        <p className="paraPart">
          We see a world where everybody is an athlete — united in the joy of
          movement. We aim to bring inspiration to every athlete in the world
          and to make sport a daily habit.
        </p>
      </div>

      <div className="products" style={{ margin: "10px" }}>
        <Row gutter={[16, 16]}>
          {products.map((product) => {
            if (product.type.toLowerCase() === "nike") {
              count++;
              if (count <= 8) {
                return (
                  <Col
                    sx={{ span: 24 }}
                    sm={{ span: 12 }}
                    md={{ span: 6 }}
                    key={product.key}
                    onClick={() => nav(`/${product.key}`)}
                  >
                    <Card
                      hoverable
                      bordered={false}
                      cover={<img alt="example" src={product.img.mainImg} />}
                    >
                      <h4 className="prosName">{product.name}</h4>
                      <div className="currency">
                        <h4>
                          {product.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h4>
                        <Button
                          className="btnView"
                          onClick={() => nav(`/${product.key}`)}
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

export default AppNike;
