import {
  App,
  Button,
  Col,
  Empty,
  Flex,
  Input,
  Pagination,
  Row,
  Select,
} from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import BookCard from "../../../components/BookCard/BookCard";
import styles from "./BookSearchPage.module.scss";
import { Plus, Search } from "react-feather";
import AddBookModal from "./AddBookModal";
import { BookViewDto } from "../../../models/Book/Dto/BookViewDto";
import { callGetAllBooks } from "../../../services/bookService";
import { handleAxiosError } from "../../../helpers/errorHandling";
import useQueryParams from "../../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_BOOK_SEARCH_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
} from "../../../constants/pagination";
import { BOOK_GENRES } from "../../../constants/bookGenres";
import { Role } from "../../../models/User/User";
import { useUser } from "../../../hooks/useUser";
interface BookSearchPageProps {}
interface BookQuery {
  title: string;
  genre: string;
}

const BookSearchPage: FunctionComponent<BookSearchPageProps> = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [openAddModal, setAddModal] = useState<boolean>(false);
  const { message } = App.useApp();
  const { handleChangePage, pagination, setPagination, getQuery, params } =
    useQueryParams(DEFAULT_BOOK_SEARCH_PAGE_SIZE);
  const [bookQuery, setBookQuery] = useState<BookQuery>({
    title: "",
    genre: "",
  });
  useEffect(() => {
    setBookQuery({
      title: (params && params["title"]) ?? "",
      genre: (params && params["genre"]) ?? "",
    });
  }, [setBookQuery, params]);
  const [books, setBooks] = useState<BookViewDto[]>();

  const fetchBooks = useCallback(async () => {
    try {
      const res = await callGetAllBooks(getQuery());
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

  const handleSearch = () => {
    let queryString = `pageNumber=${DEFAULT_PAGE_NUMBER}&pageSize=${DEFAULT_BOOK_SEARCH_PAGE_SIZE}`;
    if (bookQuery.genre !== "") queryString += `&genre=${bookQuery.genre}`;
    if (bookQuery.title !== "") queryString += `&title=${bookQuery.title}`;
    navigate(`/book?${queryString}`);
  };

  const canAddBook = () =>
    user?.roles.includes(Role.MANAGER) ||
    user?.roles.includes(Role.STOREKEEPER);

  return (
    <>
      {openAddModal && (
        <AddBookModal
          open={true}
          closeModal={() => setAddModal(false)}
          fetchBook={fetchBooks}
        />
      )}
      <Flex gap="large" style={{ marginLeft: "8px" }}>
        {canAddBook() && (
          <Button icon={<Plus />} onClick={() => setAddModal(true)}>
            Thêm sách mới
          </Button>
        )}
        <Input.Search
          placeholder="Nhập tên sách..."
          className={styles["search-bar"]}
          value={bookQuery.title}
          onChange={(e) =>
            setBookQuery((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Select
          className={styles["genre"]}
          placeholder="Chọn thể loại"
          value={bookQuery.genre}
          onChange={(value) =>
            setBookQuery((prev) => ({ ...prev, genre: value }))
          }
          options={BOOK_GENRES.map((bookGenre) =>
            bookGenre === "Tất cả"
              ? { value: "", label: bookGenre }
              : {
                  value: bookGenre,
                  label: bookGenre,
                }
          )}
        />
        <Button
          icon={<Search className={styles["search-icon"]} />}
          type="primary"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Flex>
      <Flex justify="center" className={styles["second-container"]}>
        <Row style={{ width: "100%" }} gutter={16}>
          {books?.map((book) => (
            <Col
              span={6}
              key={`${book.title}-${book.bookId}`}
              style={{ marginBottom: "40px" }}
            >
              <BookCard info={book} fetchBooks={fetchBooks} />
            </Col>
          ))}
        </Row>
      </Flex>
      {books?.length === 0 && (
        <Flex justify="center">
          <Empty />
        </Flex>
      )}
      <Pagination
        defaultCurrent={pagination.pageNumber}
        current={pagination.pageNumber}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page, pageSize) => handleChangePage(page, pageSize)}
      />
    </>
  );
};

export default BookSearchPage;
