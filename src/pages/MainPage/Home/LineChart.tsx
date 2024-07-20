import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { FunctionComponent } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const LineChartComponent: FunctionComponent = () => {
  const data = {
    labels: ["23 Nov", "24", "25", "26", "27", "28", "29", "30"],
    datasets: [
      {
        label: "Tổng thu nhập tháng tích lũy",
        data: [25000, 27000, 29000, 31000, 35000, 38000, 42000, 47000],
        borderColor: "black",
        borderWidth: 2,
        pointBackgroundColor: "black",
        pointBorderColor: "black",
        pointHoverBackgroundColor: "grey",
        pointHoverBorderColor: "grey",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointRadius: 4,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartComponent;
