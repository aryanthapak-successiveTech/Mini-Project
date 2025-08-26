
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const HorizontalBars = ({ seriesData, xAxisLabels }) => {
  
  const monthNames = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formattedLabels = xAxisLabels.map(month => monthNames[month]);

  return (
    <BarChart
      height={300}
      series={[{ data: seriesData, label: "Books Issued" }]}
      xAxis={[{
        id: "months",
        data: formattedLabels,
        scaleType: "band",
        label: "Month",
      }]}
      yAxis={[{
        label: "Books Issued",
      }]}
    />
  );
};

export default HorizontalBars;
