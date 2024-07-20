import { DatePicker, Form, Typography } from "antd";
import { FunctionComponent } from "react";
import { dateFormat } from "../../../constants/dateFormat";
import dayjs from "dayjs";
import InventoryTable from "./InventoryTable";
import DeptTable from "./DebtTable";

interface ReportPageProps {}

const ReportPage: FunctionComponent<ReportPageProps> = () => {
  return (
    <>
      <Form.Item label="Ngày nhập sách" name={["date"]} key="date">
        <DatePicker
          onChange={(date) => console.log(date.format(dateFormat))}
          format={dateFormat}
          defaultValue={dayjs()}
        />
      </Form.Item>
      <Typography.Title>Báo cáo tháng 5</Typography.Title>

      <InventoryTable />
      <DeptTable />
    </>
  );
};

export default ReportPage;
