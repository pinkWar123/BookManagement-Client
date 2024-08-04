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
import {  Trash } from "react-feather";
import { Role } from "../../../models/User/User";
import { UserViewDto } from "../../../models/User/Dto/userViewDto";
import { TableParams } from "./UserPage";
import { TablePaginationConfig } from "antd/es/table/interface";

interface UserTableProps {
  users: UserViewDto[];
  removeUser: (id: string) => void;
  updateUserRole: (record: UserViewDto, newRole: Role) => void;
  tableParams: TableParams;
  onChange: (pagination: TablePaginationConfig) => void;
}

const UserTable: FunctionComponent<UserTableProps> = ({
  users,
  removeUser,
  updateUserRole,
  tableParams,
  onChange,
}) => {
  const { notification } = App.useApp();
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
          defaultValue={value[0]}
          options={Object.entries(Role).map(([key, value]) => ({
            label: key,
            value: value,
          }))}
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
        </Flex>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        pagination={tableParams.pagination}
        onChange={(pagination: TablePaginationConfig) => {
          console.log(pagination);
          onChange(pagination);
        }}
      />
    </>
  );
};

export default UserTable;
