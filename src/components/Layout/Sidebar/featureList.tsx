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
import BookPageGuard from "../../Guard/BookPageGuard";
import { ComponentType } from "react";
import { PageGuardProps } from "../../Guard/Guard";
import BookEntryGuard from "../../Guard/BookEntryGuard";
import InvoiceGuard from "../../Guard/InvoiceGuard";
import PaymentGuard from "../../Guard/PaymentGuard";
import ReportGuard from "../../Guard/ReportGuard";
import RegulationGuard from "../../Guard/RegulationGuard";
import UserGuard from "../../Guard/UserGuard";
import {
  BOOK_ENTRY_ROLES,
  BOOK_PAGE_ROLES,
  INVOICE_ROLES,
  PAYMENT_ROLES,
  REGULATION_ROLES,
  REPORT_ROLES,
  USER_ROLES,
} from "../../../routes/permission";

const iconSize = 25;
interface Feature {
  title: string | React.ReactElement;
  icon: JSX.Element;
  to: string;
  roles: string[];
  guard?: ComponentType<PageGuardProps>; // Use ComponentType with the guard's props
}

export const FEATURES: Feature[] = [
  {
    title: "Trang chủ",
    icon: <Home size={iconSize} />,
    to: HOME_PAGE_URL,
    roles: BOOK_PAGE_ROLES,
    guard: BookPageGuard,
  },
  {
    title: "Tra cứu sách",
    icon: <Search size={iconSize} />,
    to: BOOK_PAGE_URL,
    roles: BOOK_PAGE_ROLES,
    guard: BookPageGuard,
  },
  {
    title: "Lập phiếu nhập sách",
    icon: <Download size={iconSize} />,
    to: BOOK_ENTRY_PAGE_URL,
    roles: BOOK_ENTRY_ROLES,
    guard: BookEntryGuard,
  },
  {
    title: "Lập hóa đơn",
    icon: <FileText size={iconSize} />,
    to: INVOICE_PAGE_URL,
    roles: INVOICE_ROLES,
    guard: InvoiceGuard,
  },
  {
    title: "Lập phiếu thu tiền",
    icon: <DollarSign size={iconSize} />,
    to: PAYMENT_PAGE_URL,
    roles: PAYMENT_ROLES,
    guard: PaymentGuard,
  },
  {
    title: "Lập báo cáo tháng",
    icon: <BarChart2 size={iconSize} />,
    to: REPORT_PAGE_URL,
    roles: REPORT_ROLES,
    guard: ReportGuard,
  },
  {
    title: "Thay đổi quy định",
    icon: <Sliders size={iconSize} />,
    to: REGULATION_PAGE_URL,
    roles: REGULATION_ROLES,
    guard: RegulationGuard,
  },
  {
    title: "Quản lý user",
    icon: <User size={iconSize} />,
    to: USER_PAGE_URL,
    roles: USER_ROLES,
    guard: UserGuard,
  },
];
