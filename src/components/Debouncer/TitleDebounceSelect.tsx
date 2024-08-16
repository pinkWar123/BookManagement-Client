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
  getExistedValues: () => { title: string; author: string; genre: string }[];
}

const TitleDebounceSelect: React.FC<IProps> = ({
  items,
  onChange,
  id,
  getExistedValues,
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
    let returnObj = res.data.map((item) => ({
      label: item.title,
      value: item.bookId.toString(),
      id: item.bookId,
      ...item,
    }));
    // if (alreadyPickedIds && alreadyPickedIds.length > 0) {
    //   returnObj = returnObj.filter(
    //     (item) => !alreadyPickedIds?.includes(item.id)
    //   );
    // }
    const existedValues = getExistedValues();
    console.log(existedValues);
    if (existedValues) {
      const existedBooks = Object.values(existedValues);
      returnObj = returnObj.filter(
        (value) =>
          !existedBooks.some(
            (book) =>
              book.title === value.title &&
              book.author === value.author &&
              book.genre === value.genre
          )
      );
    }
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
