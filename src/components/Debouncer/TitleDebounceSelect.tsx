import { useState } from "react";
import { IBook } from "../../models/Book/Book";
import DebounceSelect from "./DebounceSelect";
import { callGetAllBooks } from "../../services/bookService";

export interface BookValue extends IBook {
  label: string;
  value: string;
}

interface IProps {
  items?: BookValue;
  onChange: (id: string, value?: BookValue) => void;
  id: string;
}

const TitleDebounceSelect: React.FC<IProps> = ({
  items,
  onChange,
  id,
}: IProps) => {
  const [bookValues, setBookValues] = useState<BookValue[] | undefined>();
  const fetchTitleList = async (value: string): Promise<BookValue[]> => {
    if (value === "") return [];
    const res = await callGetAllBooks({
      pageNumber: 1,
      pageSize: 5,
      title: value,
    });
    console.log(
      res.data.map((item) => ({
        label: item.title,
        ...item,
      }))
    );
    const returnObj = res.data.map((item) => ({
      label: item.title,
      value: item.bookId.toString(),
      id: item.bookId,
      ...item,
    }));
    console.log(returnObj);
    setBookValues(returnObj);
    return returnObj;
  };
  return (
    <DebounceSelect
      maxCount={1}
      mode="multiple"
      value={items}
      placeholder="Select tags"
      fetchOptions={fetchTitleList}
      onChange={(value) => {
        const _value = value as unknown as BookValue[];
        const itemToUpate =
          _value.length === 1
            ? bookValues?.find((item) => item.title === _value[0].label)
            : undefined;
        onChange(id, itemToUpate);
      }}
      style={{ width: "100%" }}
    />
  );
};

export default TitleDebounceSelect;
