/* eslint-disable react/prop-types */
import { init } from "echarts";
import React, { useEffect, useRef } from "react";

const PieChartFactory = (node, datas, title) => {
  const myChart = init(node);
  myChart.setOption({
    title: {
      text: title,
      top: "2%",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "8%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: datas,
      },
    ],
  });
};

/**
 *
 * @param {{style:import("react").CSSProperties,datas:{value:number,name:string}[]}} param0
 * @returns
 */
const PieChart = ({ style, datas, title }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    PieChartFactory(nodeRef.current, datas, title);
  }, [datas]);

  return <div ref={nodeRef} style={style} />;
};
export default PieChart;
