import { App, Card, Col, Row, Statistic } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import LineChartComponent from "./LineChart";
import TopUser from "./TopUsers/TopUsers";
import { getCurrentMonthYear } from "../../../helpers/date";
import { handleAxiosError } from "../../../helpers/errorHandling";
import { callGetIncomeByMonth } from "../../../services/statisticService";
interface HomePageProps {}

const statisticItems = [
  {
    title: "Tổng thu nhập",
    extra: "+20% month over month",
    value: 45678123,
    suffix: "VND",
  },
  {
    title: "Tổng số hóa đơn",
    extra: "+33% month over month",
    value: 2405,
  },
  {
    title: "Tổng thu nhập",
    extra: "+20% month over month",
    value: 45678123,
  },
];

interface Statistic {
  income: number;
}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const [statistic, setStatistic] = useState<Statistic>();
  const { message } = App.useApp();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { month, year } = getCurrentMonthYear();
        console.log(month, year);
        const res = await callGetIncomeByMonth(month, year);
        console.log(res);
        if (res.data) {
          setStatistic({ income: res.data.income });
        }
      } catch (error) {
        message.error({ content: handleAxiosError(error) });
      }
    };
    fetch();
  }, [message]);
  return (
    <>
      <Row gutter={16}>
        {statisticItems.map((item, index) => (
          <>
            <Col span={8} key={`statistic-${index}`}>
              <Card>
                <Statistic
                  title={<strong>{item.title}</strong>}
                  value={statistic?.income ?? 0}
                  decimalSeparator=","
                  suffix={item?.suffix}
                />
                <div className={styles["extra"]}>{item.extra}</div>
              </Card>
            </Col>
          </>
        ))}
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={15}>
          <LineChartComponent />
        </Col>
        <Col span={9}>
          <TopUser />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
