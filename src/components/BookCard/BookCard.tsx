import { App, Avatar, Card, Flex, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { FunctionComponent, useState } from "react";
import { Edit3 } from "react-feather";
import { BookViewDto } from "../../models/Book/Dto/BookViewDto";
import UpdateBookModal from "../../pages/MainPage/BookSearch/UpdateBookModal";
import { UpdateBookDto } from "../../models/Book/Dto/UpdateBookDto";
import { callUpdateBook } from "../../services/bookService";
import { handleAxiosError } from "../../helpers/errorHandling";

interface BookCardProps {
  info: BookViewDto;
  fetchBooks: () => Promise<void>;
}

const BookCard: FunctionComponent<BookCardProps> = ({ info, fetchBooks }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { message } = App.useApp();
  const handleCloseModal = () => setOpenUpdateModal(false);
  const handleOpenModal = () => setOpenUpdateModal(true);
  const handleUpdateBook = async (updateBookDto: UpdateBookDto) => {
    try {
      await callUpdateBook(info.bookId, updateBookDto);
      await fetchBooks();
      handleCloseModal();
      message.success({ content: "Cập nhật sách thành công" });
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
  };

  return (
    <>
      <Flex justify="center">
        <Card
          style={{ width: 300 }}
          extra={<span>Số lượng: {info.stockQuantity}</span>}
          title={info.title}
          actions={[
            <Flex justify="center" onClick={handleOpenModal}>
              <Tooltip title="Cập nhật sách">
                <Edit3 key="add" />
              </Tooltip>
              ,
            </Flex>,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title={info.author}
            description={info.genre}
          />
        </Card>
      </Flex>
      {openUpdateModal && (
        <UpdateBookModal
          info={info}
          onUpdate={handleUpdateBook}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default BookCard;
