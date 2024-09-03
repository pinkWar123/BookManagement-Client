import { FunctionComponent, useCallback, useEffect, useState } from "react";
import UserTable from "./UserTable";
import { App, Button, Flex, Input, Select, TablePaginationConfig } from "antd";
import { USERS } from "../../../data/users";
import { Role } from "../../../models/User/User";
import {
  callChangeUserRole,
  callDeleteUser,
  callGetAllUsers,
} from "../../../services/userService";
import { UserViewDto } from "../../../models/User/Dto/userViewDto";
import { isAxiosError } from "axios";
import { handleAxiosError } from "../../../helpers/errorHandling";
import useQueryParams from "../../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../../../constants/pagination";

interface UserPageProps {}
export interface TableParams {
  pagination?: TablePaginationConfig;
}

interface UserFilter {
  fullName?: string;
  role?: string;
}

const UserPage: FunctionComponent<UserPageProps> = () => {
  const [users, setUsers] = useState<UserViewDto[]>();
  const { pagination, setPagination, handleChangePage, getQuery, params } =
    useQueryParams();
  const navigate = useNavigate();
  const [userFilters, setUserFilters] = useState<UserFilter>({
    fullName: (params && params["fullName"]) ?? "",
    role: (params && params["role"]) ?? "",
  });

  const { message } = App.useApp();

  const searchUsers = useCallback(async () => {
    const query = getQuery();
    const res = await callGetAllUsers(query);
    if (res?.data) {
      setUsers(res.data);
    }
    setPagination({
      pageNumber: res.pageNumber,
      pageSize: res.pageSize,
      total: res.totalRecords,
    });
  }, [getQuery, setPagination]);

  const handleSearch = () => {
    let queryString = `pageNumber=${DEFAULT_PAGE_NUMBER}&pageSize=${DEFAULT_PAGE_SIZE}`;
    if (userFilters.fullName !== "")
      queryString += `&genre=${userFilters.fullName}`;
    if (userFilters.role !== "") queryString += `&title=${userFilters.role}`;
    navigate(`/book?${queryString}`);
  };

  useEffect(() => {
    searchUsers();
  }, [searchUsers]);
  const removeUser = async (id: string) => {
    try {
      const res = await callDeleteUser(id);
      if (res.data) {
        searchUsers();
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

  const handleTableChange = (pageNumber: number, pageSize: number) => {
    handleChangePage(pageNumber, pageSize);
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

        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </Flex>
      <UserTable
        users={users ?? []}
        removeUser={removeUser}
        updateUserRole={updateUserRole}
        tableParams={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default UserPage;
