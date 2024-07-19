import { Form } from "antd";
import { useState } from "react";
import { BookValue } from "../components/Debouncer/TitleDebounceSelect";

interface DataType {
  order: number;
  key: number;
  title: string;
  genre: string;
  author: string;
  stockQuantity: number;
}

export const useBookTable = () => {
  const [data, setData] = useState<DataType[] | undefined>();
  const [count, setCount] = useState<number>(1);
  const [form] = Form.useForm();
  const handleAdd = () => {
    const newData: DataType = {
      title: "",
      key: count,
      order: count,
      genre: "",
      author: "",
      stockQuantity: 0,
    };
    setData((prev) => {
      if (!prev) return [newData];
      return [...prev, newData];
    });
    setCount((prev) => prev + 1);
  };
  const handleRemove = (key: number) => {
    console.log(key);
    if (!data || data.length === 0) return;
    const itemToRemove = data.find((item) => item.key === key);
    if (!itemToRemove) return;
    const newData = data.filter((item) => item.key !== key);
    setData(
      newData.map((item) =>
        item.order < itemToRemove?.order
          ? item
          : { ...item, order: item.order - 1 }
      )
    );
  };
  const handleSelect = (id: string, item?: BookValue) => {
    console.log("change");
    form.setFieldValue(id, item);
  };

  return { data, form, handleAdd, handleRemove, handleSelect };
};
