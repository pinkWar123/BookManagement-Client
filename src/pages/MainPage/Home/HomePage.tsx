import { Card, Col, Row, Statistic } from "antd";
import { FunctionComponent } from "react";
import styles from "./HomePage.module.scss";
import LineChartComponent from "./LineChart";
import TopUser from "./TopUsers/TopUsers";
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

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <Row gutter={16}>
        {statisticItems.map((item, index) => (
          <>
            <Col span={8} key={`statistic-${index}`}>
              <Card>
                <Statistic
                  title={<strong>{item.title}</strong>}
                  value={item.value}
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
