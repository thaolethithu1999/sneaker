import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Store } from "./components/redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppDetail from "./components/home/Detail";
import AppProducts from "./components/home/Products";
import { Layout } from "antd";
import AppHeader from "./components/common/Header";
import AppFooter from "./components/common/Footer";
import Cart from "./components/home/Cart";
import Search from "./components/home/Search";

const { Header, Content, Footer } = Layout;

const root = ReactDOM.createRoot(document.getElementById("root"));

window.scroll({
  top: 0,
  left: 0,
  behavior: "smooth",
});

root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Layout className="mainLayout">
        <Header>
          <AppHeader />
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:productId" element={<AppDetail />} />
            <Route path="/products" element={<AppProducts />} />
            <Route path="/search" element={<Search />} />
            <Route path="/your-cart" element={<Cart />} />
          </Routes>
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
