import { DatePicker, Form } from "antd";
import { FunctionComponent } from "react";
import dayjs from "dayjs";
import customParseFromat from "dayjs/plugin/customParseFormat";
import BookEntryTable from "./BookEntryTable";
import { dateFormat } from "../../../constants/dateFormat";

dayjs.extend(customParseFromat);

interface BookEntryPageProps {}

const BookEntryPage: FunctionComponent<BookEntryPageProps> = () => {
  return (
    <>
      <Form.Item label="Ngày nhập sách" name="date" key="date">
        <DatePicker
          onChange={(date) => console.log(date.format(dateFormat))}
          format={dateFormat}
          defaultValue={dayjs()}
        />
      </Form.Item>
      <BookEntryTable />
    </>
  );
};

export default BookEntryPage;
