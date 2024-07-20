import { IUser, Role } from "../models/User";

export const USERS: IUser[] = [
  {
    id: "1",
    fullName: "Võ Thành Nghĩa",
    phoneNumber: "123456789",
    email: "vtnghia22@clc.fitu.edu.vn",
    role: Role.CASHIER,
  },
  {
    id: "2",
    fullName: "Triệu Gia Huy",
    phoneNumber: "123213231",
    email: "tghuy22@clc.fitus.edu.vn",
    role: Role.CUSTOMER,
  },
  {
    id: "3",
    fullName: "Phạm Nguyên Khánh",
    phoneNumber: "123456342344",
    email: "pnkhanh22@clc.fitus.edu.vn",
    role: Role.STOREKEEPER,
  },
  {
    id: "4",
    fullName: "Nguyễn Hồng Quân",
    phoneNumber: "123124143",
    email: "nhquan22@clc.fitus.edu.vn",
    role: Role.MANAGER,
  },
];
