import { useState } from "react";
import { IBook } from "../../models/Book";
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
  const fetchTagList = async (value: string): Promise<BookValue[]> => {
    if (value === "") return [];
    const res = await findBooksByName(BOOKS, value);
    console.log(
      res.map((item) => ({
        label: item.title,
        value: item.stockQuantity.toString(),
        author: item.author,
        genre: item.genre,
        stockQuantity: item.stockQuantity,
        title: item.title,
      }))
    );
    const returnObj = res.map((item) => ({
      label: item.title,
      value: item.stockQuantity.toString(),
      author: item.author,
      genre: item.genre,
      stockQuantity: item.stockQuantity,
      title: item.title,
    }));
    setBookValues(returnObj);
    return returnObj;
  };
  return (
    <DebounceSelect
      maxCount={1}
      id="tagInput"
      mode="multiple"
      value={items}
      placeholder="Select tags"
      fetchOptions={fetchTagList}
      onChange={(value) => {
        console.log("you ve just changed");
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
