import {
  App,
  Flex,
  Popconfirm,
  Select,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { FunctionComponent } from "react";
import { Edit, Trash } from "react-feather";
import { IUser, Role } from "../../../models/User";

interface UserTableProps {
  users: IUser[];
  removeUser: (id: string) => void;
  updateUserRole: (record: IUser, newRole: Role) => void;
}

const UserTable: FunctionComponent<UserTableProps> = ({
  users,
  removeUser,
  updateUserRole,
}) => {
  const { notification } = App.useApp();
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "ID",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      width: "30%",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      key: "email",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "total",
      width: "20%",
      render: (value: Role, record) => (
        <Select
          defaultValue={value}
          options={Object.keys(Role).map((key) => ({ lalel: key, value: key }))}
          onChange={(e) => updateUserRole(record, e)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Flex gap="middle">
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này không?"
            onConfirm={() => {
              removeUser(record.id);
              notification.success({ message: "Delete user succesfully" });
            }}
          >
            <Tooltip title="Xóa user">
              <a>
                <Trash color="red" size={20} />
              </a>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
            title="Lưu thay đổi?"
            onConfirm={() =>
              notification.success({ message: "Update user succesfully" })
            }
          >
            <Tooltip title="Sửa user">
              <a>
                <Edit color="red" size={20} />
              </a>
            </Tooltip>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={users} />
    </>
  );
};

export default UserTable;
