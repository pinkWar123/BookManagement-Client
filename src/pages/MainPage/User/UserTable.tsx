import {
  App,
  Flex,
  Pagination,
  Popconfirm,
  Select,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { FunctionComponent } from "react";
import { Trash } from "react-feather";
import { Role } from "../../../models/User/User";
import { UserViewDto } from "../../../models/User/Dto/userViewDto";
import { TablePaginationConfig } from "antd/es/table/interface";
import { useUser } from "../../../hooks/useUser";

interface UserTableProps {
  users: UserViewDto[];
  removeUser: (id: string) => void;
  updateUserRole: (record: UserViewDto, newRole: Role) => void;
  tableParams: TablePaginationConfig;
  onChange: (pageNumber: number, pageSize: number) => Promise<void>;
}

const UserTable: FunctionComponent<UserTableProps> = ({
  users,
  removeUser,
  updateUserRole,
  tableParams,
  onChange,
}) => {
  const { notification } = App.useApp();
  const { user } = useUser();
  const isMe = (email: string, username: string) =>
    email === user?.email && username === user.username;

  const columns: TableProps<UserViewDto>["columns"] = [
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
      title: "Vai trò",
      dataIndex: "roles",
      key: "total",
      width: "20%",
      render: (value: Role[], record) => (
        <Select
          disabled={isMe(record.email, record.userName)}
          defaultValue={value[0]}
          options={Object.entries(Role).map(([key, value]) => ({
            label: key,
            value: value,
          }))}
          onChange={(e) => updateUserRole(record, e)}
          key={`customer-${record.id}`}
        />
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Flex gap="middle">
          <Popconfirm
            placement="topLeft"
            title="Bạn có chắc muốn xóa người dùng này không?"
            onConfirm={() => {
              removeUser(record.id);
              notification.success({ message: "Delete user succesfully" });
            }}
          >
            {!isMe(record.email, record.userName) && (
              <Tooltip title="Xóa user">
                <a>
                  <Trash color="red" size={20} />
                </a>
              </Tooltip>
            )}
          </Popconfirm>
        </Flex>
      ),
    },
  ];
  return (
    <>
      <Table
        style={{ marginTop: "20px" }}
        columns={columns}
        dataSource={users}
        pagination={false}
      />
      <Flex justify="flex-end" style={{ marginTop: "20px" }}>
        <Pagination
          current={tableParams.current}
          pageSize={tableParams.pageSize}
          total={tableParams.total}
          onChange={onChange}
        />
      </Flex>
    </>
  );
};

export default UserTable;
