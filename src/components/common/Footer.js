import { ToTopOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackTop, Col, Row } from "antd";
import Paragraph from "antd/lib/skeleton/Paragraph";
import React from "react";
import fb from '../../assets/images/fb1.png'
import ins from '../../assets/images/insta.png'
import twit from '../../assets/images/twitter.png'
const AppFooter = () => {
  return (
    <>
      <div className="block footer">
        <h1 className="proName">KTSNEAKER</h1>
        
        <p className="paragraph">BE THE FIRST CHOICE AND PROVIDE GREAT PRODUCTS TO YOU</p>
        <a href="https://google.com" target="_blank"><img src={fb} alt="fb" className="icon"/></a>
        <a href="https://google.com" target="_blank"><img src={ins} alt="fb" className="icon"/></a>
        <a href="https://google.com" target="_blank"><img src={twit} alt="fb" className="icon"/></a>
        <h4 className="paragraph">2022 @Copyright</h4>

        <BackTop className="btnBack">
          <div className="goTop">
            <ToTopOutlined className="toTop" />
          </div>
        </BackTop>
      </div>
    </>
  );
};

export default AppFooter;
