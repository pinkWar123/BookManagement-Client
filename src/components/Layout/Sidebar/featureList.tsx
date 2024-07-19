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

const iconSize = 25;

export const FEATURES = [
  {
    title: "Trang chủ",
    icon: <Home size={iconSize} />,
  },
  {
    title: "Tra cứu sách",
    icon: <Search size={iconSize} />,
  },
  {
    title: "Lập phiếu nhập sách",
    icon: <Download size={iconSize} />,
  },
  {
    title: "Lập hóa đơn",
    icon: <FileText size={iconSize} />,
  },
  {
    title: "Lập phiếu thu tiền",
    icon: <DollarSign size={iconSize} />,
  },
  {
    title: "Lập báo cáo tháng",
    icon: <BarChart2 size={iconSize} />,
  },
  {
    title: "Thay đổi quy định",
    icon: <Sliders size={iconSize} />,
  },
  {
    title: "Quản lý user",
    icon: <User size={iconSize} />,
  },
];
