import { Button, Col, Flex, Input, Row } from "antd";
import { FunctionComponent, useState } from "react";
import { BOOKS } from "./BookData";
import BookCard from "../../../components/BookCard/BookCard";
import styles from "./BookSearchPage.module.scss";
import { Plus } from "react-feather";
import AddBookModal from "./AddBookModal";
interface BookSearchPageProps {}

const BookSearchPage: FunctionComponent<BookSearchPageProps> = () => {
  const [openAddModal, setAddModal] = useState<boolean>(false);
  return (
    <>
      <AddBookModal open={openAddModal} closeModal={() => setAddModal(false)} />
      <Flex gap="large">
        <Input.Search
          placeholder="Tìm kiếm sách..."
          loading
          className={styles["search-bar"]}
        />
        <Button icon={<Plus />} onClick={() => setAddModal(true)}>
          Thêm sách mới
        </Button>
      </Flex>
      <Flex justify="center" className={styles["second-container"]}>
        <Row style={{ width: "100%" }}>
          {BOOKS.map((book) => (
            <Col span={8} key={book.title} style={{ marginBottom: "40px" }}>
              <BookCard info={book} />
            </Col>
          ))}
        </Row>
      </Flex>
    </>
  );
};

export default BookSearchPage;
