import {
  BarChart2,
  DollarSign,
  Download,
  FileText,
  Home,
  Search,
  Sliders,
  User,
} from "react-feather";
import {
  BOOK_ENTRY_PAGE_URL,
  BOOK_PAGE_URL,
  HOME_PAGE_URL,
  INVOICE_PAGE_URL,
  PAYMENT_PAGE_URL,
  REGULATION_PAGE_URL,
  REPORT_PAGE_URL,
  USER_PAGE_URL,
} from "../../../routes/url";

const iconSize = 25;

export const FEATURES = [
  {
    title: "Trang chủ",
    icon: <Home size={iconSize} />,
    to: HOME_PAGE_URL,
  },
  {
    title: "Tra cứu sách",
    icon: <Search size={iconSize} />,
    to: BOOK_PAGE_URL,
  },
  {
    title: "Lập phiếu nhập sách",
    icon: <Download size={iconSize} />,
    to: BOOK_ENTRY_PAGE_URL,
  },
  {
    title: "Lập hóa đơn",
    icon: <FileText size={iconSize} />,
    to: INVOICE_PAGE_URL,
  },
  {
    title: "Lập phiếu thu tiền",
    icon: <DollarSign size={iconSize} />,
    to: PAYMENT_PAGE_URL,
  },
  {
    title: "Lập báo cáo tháng",
    icon: <BarChart2 size={iconSize} />,
    to: REPORT_PAGE_URL,
  },
  {
    title: "Thay đổi quy định",
    icon: <Sliders size={iconSize} />,
    to: REGULATION_PAGE_URL,
  },
  {
    title: "Quản lý user",
    icon: <User size={iconSize} />,
    to: USER_PAGE_URL,
  },
];
