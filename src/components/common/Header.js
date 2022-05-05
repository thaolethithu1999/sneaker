import React, { useEffect, useState } from "react";

import { AudioOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Anchor, Button, Drawer, Input, Menu, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProduct, getKw } from "../redux/slice/ProductsSlice";
import { useNavigate } from "react-router-dom";

const { Link } = Anchor;
const { Search } = Input;
const colors = ["#f50"];

const AppHeader = () => {
  const [kw, setKw] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSearch = (e) => {
    console.log(e);
    setKw(e);
    nav(`/search/`);
  };
  console.log("kw:" + kw);

  useEffect(() => {
    dispatch(getKw(kw));
    dispatch(getSearchProduct());
  }, [kw]);

  const cart = useSelector((state) => state.cart.cartProduct);
  let length = cart.length;
  console.log(length);

  return (
    <div className="container-fluid mainLayout" >
      <div className="header" >
        <div className="logo">
          <a href="/#hero">
            {/* <img
              src="./logoktsneaker.png"
              alt="logo"
              style={{ height: "100px" }}
            /> */}
            <h1 className="storeName">KTSNEAKER</h1>
          </a>
        </div>

        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="/#hero" title="Home" />
            <Link href="/#adidas" title="Adidas" />
            <Link href="/#nike" title="Nike" />
            <Link href="/#puma" title="Puma" />
            <Link href="/#sandal" title="Sandal" />
            <Link href="/products" title="All Product" />
          </Anchor>
        </div>

        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer placement="right" onClose={onClose} visible={visible}>
            <Anchor targetOffset="65">
              <Link href="/#hero" title="Home" />
              <Link href="/#adidas" title="Adidas" />
              <Link href="/#nike" title="Nike" />
              <Link href="/#puma" title="Puma" />
              <Link href="/#sandal" title="Sandal" />
              <Link href="/products" title="All Product" />
            </Anchor>
          </Drawer>
        </div>

        <div className="search">
          <Search
            className="searchInput"
            placeholder="search..."
            onSearch={onSearch}
          />
        </div>

        <div className="btnCartHeader">
          <Tooltip placement="bottomRight" title="Your cart!" color={colors[0]}>
            <Button className="btnCart" onClick={() => nav("/your-cart")}>
              <ShoppingCartOutlined />
            </Button>
            <span className="cartLength">{length}</span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
