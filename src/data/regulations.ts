import { IRegulation } from "../models/IRegulation";

export const REGULATIONS: IRegulation[] = [
  {
    id: "1",
    code: "QD1.1",
    content: "Số lượng nhập ít nhất là ",
    status: true,
    value: 150,
  },
  {
    id: "2",
    code: "QD1.2",
    content: "Chỉ nhập các đầu sách có lượng tồn ít hơn ",
    status: true,
    value: 300,
  },
  {
    id: "3",
    code: "QD2.1",
    content: "Chỉ bán cho các khách hàng không nợ quá ",
    status: true,
    value: 20000,
  },
  {
    id: "4",
    code: "QD2.2",
    content: "Chỉ bán đầu sách có lượng tồn sau khi bán ít nhất là ",
    status: true,
    value: 20,
  },
  {
    id: "5",
    code: "QD4",
    content: "Số tiền thu không vượt quá số tiền khách hàng đang nợ",
    status: true,
    value: 1,
  },
];
