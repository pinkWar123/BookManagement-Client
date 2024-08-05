import { App, Button, Col, Flex, Input, Pagination, Row } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import BookCard from "../../../components/BookCard/BookCard";
import styles from "./BookSearchPage.module.scss";
import { Plus } from "react-feather";
import AddBookModal from "./AddBookModal";
import { BookViewDto } from "../../../models/Book/Dto/BookViewDto";
import { callGetAllBooks } from "../../../services/bookService";
import { handleAxiosError } from "../../../helpers/errorHandling";
import useQueryParams from "../../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../../../constants/pagination";
interface BookSearchPageProps {}

const BookSearchPage: FunctionComponent<BookSearchPageProps> = () => {
  const navigate = useNavigate();
  const [openAddModal, setAddModal] = useState<boolean>(false);
  const { message } = App.useApp();
  const { handleChangePage, pagination, setPagination, getQuery } =
    useQueryParams();
  const [books, setBooks] = useState<BookViewDto[]>();

  const fetchBooks = useCallback(async () => {
    try {
      const res = await callGetAllBooks(getQuery());
      console.log(res);
      setBooks(res.data);
      setPagination({
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
        total: res.totalRecords,
      });
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
  }, [message, setPagination, getQuery]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearchByTitle = (title: string) => {
    navigate(
      `/book?pageNumber=${DEFAULT_PAGE_NUMBER}&pageSize=${DEFAULT_PAGE_SIZE}&title=${title}`
    );
  };

  return (
    <>
      <AddBookModal
        open={openAddModal}
        closeModal={() => setAddModal(false)}
        fetchBook={fetchBooks}
      />
      <Flex gap="large">
        <Input.Search
          placeholder="Tìm kiếm sách..."
          className={styles["search-bar"]}
          onSearch={handleSearchByTitle}
        />
        <Button icon={<Plus />} onClick={() => setAddModal(true)}>
          Thêm sách mới
        </Button>
      </Flex>
      <Flex justify="center" className={styles["second-container"]}>
        <Row style={{ width: "100%" }} gutter={16}>
          {books?.map((book) => (
            <Col
              span={8}
              key={`${book.title}-${book.bookId}`}
              style={{ marginBottom: "40px" }}
            >
              <BookCard info={book} />
            </Col>
          ))}
        </Row>
      </Flex>
      <Pagination
        defaultCurrent={pagination.pageNumber}
        current={pagination.pageNumber}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page) => handleChangePage(page)}
      />
    </>
  );
};

export default BookSearchPage;
