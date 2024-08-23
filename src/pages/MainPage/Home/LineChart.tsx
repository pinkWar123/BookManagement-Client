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
