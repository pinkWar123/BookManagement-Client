import { DatePicker, Form, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { monthFormat } from "../../../constants/dateFormat";
import dayjs from "dayjs";
import InventoryTable from "./InventoryTable";
import DeptTable from "./DebtTable";

interface ReportPageProps {}

export interface Month {
  month: number;
  year: number;
}

const ReportPage: FunctionComponent<ReportPageProps> = () => {
  const [month, setMonth] = useState<Month>(() => {
    const today = dayjs();
    return {
      month: today.month() + 1,
      year: today.year(),
    };
  });

  console.log(month);

  const getDefaultValue = () => {
    let dateString = `${month.month}/${month.year}`;
    if (month.month < 10) {
      dateString = "0" + dateString;
    }
    return dateString;
  };

  const handleMonthChange = (dateString: string) => {
    const parts = dateString.split("/");
    setMonth({
      month: parseInt(parts[0]),
      year: parseInt(parts[1]),
    });
  };

  return (
    <>
      <Form.Item label="Ngày nhập sách" name={["date"]} key="date">
        <DatePicker
          onChange={(_, dateString) => handleMonthChange(dateString as string)}
          format={monthFormat}
          defaultValue={dayjs(getDefaultValue(), monthFormat)}
          picker="month"
        />
      </Form.Item>
      <Typography.Title>
        Báo cáo tháng {month.month} / {month.year}
      </Typography.Title>

      <InventoryTable month={month} />
      <DeptTable month={month} />
    </>
  );
};

export default ReportPage;
