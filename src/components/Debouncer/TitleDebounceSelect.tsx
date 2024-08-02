import { useState } from "react";
import { IBook } from "../../models/Book/Book";
import { BOOKS } from "../../pages/MainPage/BookSearch/BookData";
import DebounceSelect from "./DebounceSelect";

export interface BookValue extends IBook {
  label: string;
  value: string;
}

interface IProps {
  items?: BookValue;
  onChange: (id: string, value?: BookValue) => void;
  id: string;
}
const findBooksByName = (bookList: IBook[], searchString: string) => {
  const regex = new RegExp(searchString, "i"); // 'i' for case-insensitive search
  return bookList.filter((book) => regex.test(book.title));
};

const TitleDebounceSelect: React.FC<IProps> = ({
  items,
  onChange,
  id,
}: IProps) => {
  const [bookValues, setBookValues] = useState<BookValue[] | undefined>();
  const fetchTitleList = async (value: string): Promise<BookValue[]> => {
    if (value === "") return [];
    const res = await findBooksByName(BOOKS, value);
    console.log(
      res.map((item) => ({
        label: item.title,
        ...item,
      }))
    );
    const returnObj = res.map((item) => ({
      label: item.title,
      value: item.stockQuantity.toString(),
      ...item,
    }));
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
