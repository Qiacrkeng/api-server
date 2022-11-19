/* eslint-disable react/prop-types */
import { init } from "echarts";
import React, { useEffect, useRef } from "react";

const barChartFactory = (node, names, datas, title) => {
  const myChart = init(node);
  myChart.setOption({
    title: {
      text: title,
    },
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: names,
      source: datas,
    },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  });
};

/**
 *
 * @param {{
 *  style : import("react").CSSProperties,
 *  names : string[]
 *  datas : { [index:any]:number } []
 * }} param0
 * @returns
 */
const BarChart = ({ style, names, datas, title }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    barChartFactory(nodeRef.current, names, datas, title);
  }, [datas, names]);

  return <div ref={nodeRef} style={style} />;
};
export default BarChart;
