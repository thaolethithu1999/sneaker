import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListProduct, productsSelector } from "../redux/slice/ProductsSlice";

const AppPuma = () => {
  const nav = useNavigate();

  const { products } = useSelector(productsSelector);
  console.log(products);

  let count = 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());
  }, []);

  return (
    <div id="puma" className="block pumaBlock">
      <div className="titleHolder">
        <h2 className="prosName">PUMA</h2>
        <p className="paraPart">
          Puma “to be the most desirable and sustainable Sportlifestyle company
          in the world.”
        </p>
      </div>

      <div className="products" style={{ margin: "10px" }}>
        <Row gutter={[16, 16]}>
          {products.map((product) => {
            if (product.type.toLowerCase() === "puma") {
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

export default AppPuma;
