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
import { FunctionComponent, useEffect, useState } from "react";
import { IncomeByMonthDto } from "../../../models/Statistics/IncomeByMonthDto";
import { callGetIncomeHistory } from "../../../services/statisticService";

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
  const [income, setIncome] = useState<IncomeByMonthDto[]>();
  useEffect(() => {
    const fetchIncome = async () => {
      const res = await callGetIncomeHistory();
      if (res.data) {
        setIncome(res.data);
      }
    };
    fetchIncome();
  }, []);

  const data = {
    labels: income?.map((income) => income.month),

    datasets: [
      {
        label: "Tổng thu nhập tháng tích lũy",
        data: income?.map((income) => income.income),
        fill: true, // This will fill the area under the line
        backgroundColor: "white", // Background color under the line
        borderColor: "black", // Line color
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
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Biểu đồ thu nhập theo tháng",
        font: {
          size: 20,
        },
        color: "black",
        padding: {
          top: 10,
          bottom: 20,
        },
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

  return <Line data={data} options={options} height={170} />;
};

export default LineChartComponent;
