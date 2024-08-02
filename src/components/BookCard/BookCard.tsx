import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { FunctionComponent } from "react";
import { Plus, Trash2 } from "react-feather";
import { IBook } from "../../models/Book/Book";

interface BookCardProps {
  info: IBook;
}

const BookCard: FunctionComponent<BookCardProps> = ({ info }) => {
  return (
    <Card
      style={{ width: 300 }}
      extra={<span>Số lượng: {info.stockQuantity}</span>}
      // cover={
      //   <img
      //     alt="example"
      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //   />
      // }
      title={info.title}
      actions={[<Trash2 key="delete" />, <Plus key="add" />]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={info.author}
        description={info.genre}
      />
    </Card>
  );
};

export default BookCard;
