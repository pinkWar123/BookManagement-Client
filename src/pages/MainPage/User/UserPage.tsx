import { FunctionComponent, useState } from "react";
import UserTable from "./UserTable";
import { Button, Flex, Input, Select } from "antd";
import { USERS } from "../../../data/users";
import { IUser, Role } from "../../../models/User";

interface UserPageProps {}

interface UserQuery {
  fullName?: string;
  role?: Role;
}
// const findBooksByName = (bookList: IBook[], searchString: string) => {
//   const regex = new RegExp(searchString, "i"); // 'i' for case-insensitive search
//   return bookList.filter((book) => regex.test(book.title));
// };
const UserPage: FunctionComponent<UserPageProps> = () => {
  const [users, setUsers] = useState<IUser[]>(USERS);
  const [userQueries, setUserQueries] = useState<UserQuery | undefined>({
    fullName: undefined,
    role: undefined,
  });
  const removeUser = (id: string) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  };
  const updateUserRole = (record: IUser, role: Role) => {
    setUsers((users) =>
      users.map((user) => (user.id === record.id ? { ...record, role } : user))
    );
  };
  const searchUsers = () => {
    let _users = USERS;
    if (userQueries?.fullName) {
      const regex = new RegExp(userQueries.fullName, "i");
      _users = _users.filter((user) => regex.test(user.fullName));
    }
    if (userQueries?.role) {
      _users = _users.filter((user) => user.role === userQueries.role);
    }
    setUsers(_users);
  };
  return (
    <>
      <Flex gap="small">
        <Input
          placeholder="Nhập tên người dùng..."
          style={{ width: "30%" }}
          onChange={(e) =>
            setUserQueries((prev) => ({
              ...prev,
              fullName: e.target.value,
            }))
          }
        />
        <Select
          style={{ width: "20%" }}
          placeholder="Vai trò..."
          options={USERS.map((user) => ({
            label: user.role,
            value: user.role,
          }))}
          onChange={(value) =>
            setUserQueries((prev) => ({ ...prev, role: value }))
          }
        />
        <Button onClick={searchUsers}>Tìm kiếm</Button>
      </Flex>
      <UserTable
        users={users}
        removeUser={removeUser}
        updateUserRole={updateUserRole}
      />
    </>
  );
};

export default UserPage;
