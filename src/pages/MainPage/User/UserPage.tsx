import { FunctionComponent, useEffect, useState } from "react";
import UserTable from "./UserTable";
import { App, Button, Flex, Input, Select, TablePaginationConfig } from "antd";
import { USERS } from "../../../data/users";
import { Role } from "../../../models/User/User";
import {
  callChangeUserRole,
  callDeleteUser,
  callGetAllUsers,
} from "../../../services/userService";
import { IListUserQuery } from "../../../types/query";
import { UserViewDto } from "../../../models/User/Dto/userViewDto";
import { isAxiosError } from "axios";
import { handleAxiosError } from "../../../helpers/errorHandling";

interface UserPageProps {}
export interface TableParams {
  pagination?: TablePaginationConfig;
}

interface UserFilter {
  fullName?: string;
  role?: string;
}

const buildQuery = (tableParams: TableParams, userFilters: UserFilter) => {
  const query: IListUserQuery = {
    pageNumber: tableParams.pagination?.current,
    pageSize: tableParams.pagination?.pageSize,
    fullName: userFilters.fullName,
    role: userFilters.role,
  };

  return query;
};

const UserPage: FunctionComponent<UserPageProps> = () => {
  const [users, setUsers] = useState<UserViewDto[]>();
  const [userFilters, setUserFilters] = useState<UserFilter>({
    fullName: undefined,
    role: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });

  const { message } = App.useApp();

  const searchUsers = async (
    tableParams: TableParams,
    userFilters: UserFilter
  ) => {
    const query = buildQuery(tableParams, userFilters);
    const res = await callGetAllUsers(query);
    console.log(res.data);
    if (res?.data) {
      setUsers(res.data);
      setTableParams({
        pagination: {
          current: res.pageNumber,
          pageSize: res.pageSize,
          total: res.totalRecords,
        },
      });
    }
  };

  useEffect(() => {
    searchUsers(tableParams, userFilters);
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  const removeUser = async (id: string) => {
    try {
      const res = await callDeleteUser(id);
      if (res.data) {
        searchUsers(tableParams, userFilters);
      }
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
  };
  const updateUserRole = async (record: UserViewDto, role: Role) => {
    if (!users) return;
    try {
      const res = await callChangeUserRole(record.id, { role: role });
      console.log(res);
      const newUser = res.data;
      setUsers((prev) =>
        prev?.map((user) => (user.id === newUser.id ? newUser : user))
      );
      message.success({ content: "Thay đổi vai trò thành công" });
    } catch (error) {
      if (isAxiosError(error)) {
        message.error({ content: handleAxiosError(error) });
      }
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log("Run");
    setTableParams({ pagination });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUsers([]);
    }
  };

  return (
    <>
      <Flex gap="small">
        <Input
          placeholder="Nhập tên người dùng..."
          style={{ width: "30%" }}
          onChange={(e) =>
            setUserFilters((prev) => ({
              ...prev,
              fullName: e.target.value,
            }))
          }
        />
        <>
          <p style={{ marginLeft: "12px", marginTop: "6px" }}>Vai trò:</p>
          <Select
            style={{ width: "20%" }}
            placeholder="Vai trò..."
            options={[
              ...USERS.map((user) => ({
                label: user.role,
                value: user.role,
              })),
              {
                label: "ALL",
                value: "ALL",
              },
            ]}
            defaultValue={"ALL"}
            onChange={(value) =>
              setUserFilters((prev) => ({
                ...prev,
                role: value === "ALL" ? undefined : value,
              }))
            }
          />
        </>

        <Button
          onClick={() => {
            const tableParams: TableParams = {
              pagination: {
                current: 1,
                pageSize: 2,
              },
            };
            searchUsers(tableParams, userFilters);
          }}
        >
          Tìm kiếm
        </Button>
      </Flex>
      <UserTable
        users={users ?? []}
        removeUser={removeUser}
        updateUserRole={updateUserRole}
        tableParams={tableParams}
        onChange={handleTableChange}
      />
    </>
  );
};

export default UserPage;
