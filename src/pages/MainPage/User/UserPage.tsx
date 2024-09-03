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
  DEFAULT_TOTAL,
} from "../../../constants/pagination";

interface UserPageProps {}
export interface TableParams {
  pagination?: TablePaginationConfig;
}

interface UserFilter {
  fullName?: string;
  role?: string;
}

interface UserQuery extends UserFilter {
  pageNumber?: number;
  pageSize?: number;
}

const UserPage: FunctionComponent<UserPageProps> = () => {
  const [users, setUsers] = useState<UserViewDto[]>();
  const { pagination, setPagination, getQuery, params } = useQueryParams();
  const navigate = useNavigate();
  const [userFilters, setUserFilters] = useState<UserFilter>({
    fullName: (params && params["fullName"]) ?? "",
    role: (params && params["role"]) ?? "",
  });

  const { message } = App.useApp();

  const searchUsers = useCallback(async () => {
    const res = await callGetAllUsers(getQuery());
    if (res?.data) {
      setUsers(res.data);
      setPagination({
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
        total: res.totalRecords,
      });
    }
  }, [getQuery, setPagination]);

  const handleSearch = async () => {
    let queryString = `pageNumber=${DEFAULT_PAGE_NUMBER}&pageSize=${DEFAULT_PAGE_SIZE}`;
    const queryObj: UserQuery = {
      pageNumber: DEFAULT_PAGE_NUMBER,
      pageSize: DEFAULT_PAGE_SIZE,
    };
    if (userFilters.fullName !== "" && userFilters.fullName) {
      queryObj.fullName = userFilters.fullName;
      queryString += `&fullName=${userFilters.fullName}`;
    }
    if (userFilters.role !== "" && userFilters.role) {
      queryString += `&role=${userFilters.role}`;
      queryObj.role = userFilters.role;
    }
    navigate(`/user?${queryString}`);

    const res = await callGetAllUsers(queryObj);
    setUsers(res.data);
    setPagination({
      pageNumber: res.pageNumber ?? DEFAULT_PAGE_NUMBER,
      pageSize: res.pageSize ?? DEFAULT_PAGE_SIZE,
      total: res.totalRecords ?? DEFAULT_TOTAL,
    });
  };

  useEffect(() => {
    searchUsers();
  }, []);
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

  const handleTableChange = async (pageNumber: number, pageSize: number) => {
    const searchParams = new URLSearchParams(location.search);

    // Update the pageNumber parameter with the new value
    searchParams.set("pageNumber", pageNumber.toString());
    searchParams.set("pageSize", pageSize.toString());

    // Update the URL with the new query string
    navigate(`${location.pathname}?${searchParams.toString()}`);
    const res = await callGetAllUsers({ ...params, pageNumber, pageSize });
    if (res?.data) {
      setUsers(res.data);
      setPagination({
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
        total: res.totalRecords,
      });
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
          defaultValue={(params && params["fullName"]) ?? ""}
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
                label: "Tất cả",
                value: "ALL",
              },
            ]}
            defaultValue={(params && params["role"]) ?? "ALL"}
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
        tableParams={{
          current: pagination.pageNumber,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default UserPage;
