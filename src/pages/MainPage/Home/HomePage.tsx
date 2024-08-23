import { App, Card, Col, Row, Statistic } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import LineChartComponent from "./LineChart";
import TopUser from "./TopUsers/TopUsers";
import { getCurrentMonthYear } from "../../../helpers/date";
import { handleAxiosError } from "../../../helpers/errorHandling";
import {
  callGetCustomerCount,
  callGetIncomeByMonth,
  callGetInvoiceCountByMonth,
} from "../../../services/statisticService";
interface HomePageProps {}

interface Statistic {
  income: number;
  customerCount: number;
  invoiceCount: number;
}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const [statistic, setStatistic] = useState<Statistic>();
  const { message } = App.useApp();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { month, year } = getCurrentMonthYear();
        const res = await callGetIncomeByMonth(month, year);

        const customerCount = (await callGetCustomerCount()).data;
        console.log(customerCount);

        const invoiceCount = (await callGetInvoiceCountByMonth(month, year))
          .data;
        setStatistic({ income: res.data.income, customerCount, invoiceCount });
      } catch (error) {
        message.error({ content: handleAxiosError(error) });
      }
    };
    fetch();
  }, [message]);
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng thu nhập"
              value={statistic?.income ?? 0}
              decimalSeparator=","
              suffix="VND"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số hóa đơn"
              value={statistic?.invoiceCount ?? 0}
              decimalSeparator=","
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số khách hàng"
              value={statistic?.customerCount ?? 0}
              decimalSeparator=","
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px", minHeight: "500px" }}>
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
