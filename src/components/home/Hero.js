import React from "react";
import { Card, Carousel, Col, Row, Divider } from "antd";
import ban1 from '../../assets/images/ban3.jpg'
import ban2 from '../../assets/images/ban2.png'

const AppHero = () => {
  return (
    <div id="hero" className="block heroBlock">
      <Carousel autoplay>
        <div>
          <img alt="Clean and Elegant" src={ban1} />
        </div>
        <div>
          <img alt="Clean and Elegant" src={ban2} />
        </div>
      </Carousel>
    </div>
  );
};

export default AppHero;
