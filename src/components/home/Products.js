import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Pagination, Row } from "antd";
import "antd/dist/antd.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import {
  getListProduct,
  getSearchProduct,
  productsSelector,
  searchProductSelector,
} from "../redux/slice/ProductsSlice";

const AppProducts = () => {
  const nav = useNavigate();

  const { products } = useSelector(productsSelector);
  const searchProducts = useSelector(searchProductSelector);
  console.log("search: " + searchProducts);
  console.log(products);
  console.log(products.length);
  let count = 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());
  }, []);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12);
  const numEachPage = 12;
  const length = parseInt(products.length);

  const handleChange = (e) => {
    setMinValue((e - 1) * numEachPage);
    setMaxValue(e * numEachPage);
  };

  return (
    <>
      <div className="block" style={{ marginTop: "70px" }}>
        <div className="products" style={{ margin: "10px" }}>
          <Row gutter={[16, 16]}>
            {products.slice(minValue, maxValue).map((product) => {
              return (
                <Col
                  key={product.key}
                  onClick={() => nav(`/${product.key}`)}
                  sx={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 6 }}
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
            })}
          </Row>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={numEachPage} //default size of page
            onChange={handleChange}
            total={length} //total number of card data available
            prevIcon={<DoubleLeftOutlined />}
            nextIcon={<DoubleRightOutlined />}
            hideOnSinglePage="true"
          />
        </div>
      </div>
    </>
  );
};

export default AppProducts;
