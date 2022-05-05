import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListProduct, productsSelector } from "../redux/slice/ProductsSlice";

const AppSandal = () => {
  const nav = useNavigate();

  const { products } = useSelector(productsSelector);
  console.log(products);

  let count = 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());
  }, []);

  return (
    <div id="sandal" className="block sandalBlock">
      <div className="titleHolder">
        <h2 className="proName">SANDAL</h2>
      </div>

      <div className="products" style={{ margin: "10px" }}>
        <Row gutter={[16, 16]}>
          {products.map((product) => {
            if (
              product.type.toLowerCase() === "spuma" ||
              product.type.toLowerCase() === "snike" ||
              product.type.toLowerCase() === "sadidas"
            ) {
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
                      cover={
                        <img
                          alt="example"
                          src={product.img.mainImg}
                          className="productImg"
                        />
                      }
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
        <Button onClick={() => nav("/products")} className="btnViewMore">
          SEE MORE <ArrowRightOutlined color="blue" />
        </Button>
      </div>
    </div>
  );
};

export default AppSandal;
