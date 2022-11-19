/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { init } from "echarts";

const echartFactory = (node, title, xDatas, valueDatas) => {
  const myChart = init(node);
  myChart.setOption({
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
    ],
    title: [
      {
        top: "5%",
        left: "center",
        text: title,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        data: xDatas,
      },
    ],
    yAxis: [{}],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: valueDatas,
      },
    ],
  });
};
/**
 *
 * @param {{style:import("react").CSSProperties}} param0
 * @returns
 */
const LineChart = ({ style, title, nameDatas, valueDatas }) => {
  const refDom = useRef(null);

  useEffect(() => {
    echartFactory(refDom.current, title, nameDatas, valueDatas);
  }, [nameDatas, valueDatas]);

  return <div ref={refDom} style={style}></div>;
};

export default LineChart;
