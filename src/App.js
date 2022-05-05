import React from "react";

import "./App.css";
import "antd/dist/antd.min.css";

import AppHeader from "./components/common/Header";
import AppFooter from "./components/common/Footer";

import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNike from "./components/home/Nike";
import AppSandal from "./components/home/Sandal";
import AppAdidas from "./components/home/Adidas";
import AppDetail from "./components/home/Detail";
import AppPuma from "./components/home/Puma";
import AppHero from "./components/home/Hero";
import AppProducts from "./components/home/Products";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <AppHero />
      <AppAdidas />
      <AppNike />
      <AppPuma />
      <AppSandal />
    </>
  );
}

export default App;
