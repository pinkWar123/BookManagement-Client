import { App, Card, Flex, Tag, Tooltip, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { FunctionComponent, useState } from "react";
import { Edit3 } from "react-feather";
import { BookViewDto } from "../../models/Book/Dto/BookViewDto";
import UpdateBookModal from "../../pages/MainPage/BookSearch/UpdateBookModal";
import { UpdateBookDto } from "../../models/Book/Dto/UpdateBookDto";
import { callUpdateBook } from "../../services/bookService";
import { handleAxiosError } from "../../helpers/errorHandling";
import { BOOK_GENRE_COLORS } from "../../constants/bookGenres";
import { useUser } from "../../hooks/useUser";
import { Role } from "../../models/User/User";

interface BookCardProps {
  info: BookViewDto;
  fetchBooks: () => Promise<void>;
}

const BookCard: FunctionComponent<BookCardProps> = ({ info, fetchBooks }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { user } = useUser();
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

  const canUpdateBook = () =>
    user?.roles.includes(Role.MANAGER) ||
    user?.roles.includes(Role.STOREKEEPER);

  return (
    <>
      <Flex justify="center">
        <Card
          style={{ width: "100%" }}
          hoverable
          // extra={<span>Số lượng: {info.stockQuantity}</span>}
          // title={info.title}
          cover={
            <img
              src={
                info.imagePath ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3s1Jli4Zl-o5em_cHB8Uph5-M5U6ojX_9w&s"
              }
              alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3s1Jli4Zl-o5em_cHB8Uph5-M5U6ojX_9w&s"
              height={"300px"}
              style={{
                objectFit: "contain",
                width: "100%",
              }}
            />
          }
          actions={
            canUpdateBook()
              ? [
                  <Flex justify="center" onClick={handleOpenModal}>
                    <Tooltip title="Cập nhật sách">
                      <Edit3 key="add" />
                    </Tooltip>
                    ,
                  </Flex>,
                ]
              : undefined
          }
        >
          <Meta
            // avatar={
            //   <Avatar src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTM1LWJvb2stMDJhXzEucG5n.png" />
            // }
            title={
              <>
                <Tag
                  color={
                    BOOK_GENRE_COLORS[
                      info.genre as keyof typeof BOOK_GENRE_COLORS
                    ] ?? "blue"
                  }
                >
                  {info.genre}
                </Tag>
                <div>
                  <Typography.Text
                    ellipsis
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#714356",
                      marginTop: "12px",
                    }}
                  >
                    {info.title}
                  </Typography.Text>
                </div>
                <Typography.Text>{info.author}</Typography.Text>
              </>
            }
            description={
              <Flex justify="space-between">
                <Typography.Text type="secondary">
                  Tồn kho: {info.stockQuantity}
                </Typography.Text>
                <Typography.Text type="secondary">
                  Giá bán: {info.price}
                </Typography.Text>
              </Flex>
            }
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
