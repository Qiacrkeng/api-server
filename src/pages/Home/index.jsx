import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import cssStyles from "./index.module.css";

import LineChart from "@/components/LineChart/index.jsx";
import PieChart from "@/components/PieChart/index.jsx";
import BarChart from "@/components/BarChart/index.jsx";

const Home = () => {
  // const nowTime = new Date();
  // const aMothString = new Array(30);

  return (
    <Card className={cssStyles["home"]}>
      <Row>
        <Col span={6}>
          <Statistic title="總文章數" value={100} suffix="篇" />
        </Col>
        <Col span={6}>
          <Statistic title="日新增文章數" value={100} suffix="篇" />
        </Col>
        <Col span={6}>
          <Statistic title="評論數" value={100} suffix="條" />
        </Col>
        <Col span={6}>
          <Statistic title="日新增評論數" value={100} suffix="條" />
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={18}>
          <LineChart
            title="月新增文章數"
            nameDatas={[
              "2022-11-14",
              "2022-11-13",
              "2022-11-12",
              "2022-11-11",
              "2022-11-10",
            ]}
            valueDatas={[12, 3, 4, 13, 125, 15]}
            style={{ height: 400 }}
          />
        </Col>
        <Col span={6}>
          <PieChart
            title="文章分類數量比"
            datas={[
              { value: 3, name: "前端" },
              { value: 10, name: "PHP" },
              { value: 1, name: "後端" },
            ]}
            style={{ height: 400 }}
          />
        </Col>
      </Row>
      <Row gutter={[10, 2]}>
        <Col span={24}>
          <BarChart
            style={{ height: 400 }}
            title="文章訪問量"
            names={["product", "2020", "2021", "2022"]}
            datas={[
              { product: "Matcha Latte", 2020: 43.3, 2021: 85.8, 2022: 93.7 },
              { product: "Milk Tea", 2020: 83.1, 2021: 73.4, 2022: 55.1 },
              { product: "Cheese Cocoa", 2020: 86.4, 2021: 65.2, 2022: 82.5 },
              { product: "Walnut Brownie", 2020: 72.4, 2021: 53.9, 2022: 39.1 },
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Home;
