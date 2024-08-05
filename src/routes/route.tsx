import HomePage from "../pages/MainPage/Home/HomePage";
import {
  BOOK_ENTRY_PAGE_URL,
  BOOK_PAGE_URL,
  HOME_PAGE_URL,
  INVOICE_PAGE_URL,
  PAYMENT_PAGE_URL,
  REGULATION_PAGE_URL,
  REPORT_PAGE_URL,
  USER_PAGE_URL,
} from "./url";
import BookEntryPage from "../pages/MainPage/BookEntry/BookEntryPage";
import InvoicePage from "../pages/MainPage/Invoice/InvoicePage";
import PaymentPage from "../pages/MainPage/Payment/PaymentPage";
import ReportPage from "../pages/MainPage/Report/ReportPage";
import RegulationPage from "../pages/MainPage/Regulation/RegulationPage";
import UserPage from "../pages/MainPage/User/UserPage";
import BookSearchPage from "../pages/MainPage/BookSearch/BookSearchPage";

export const MainLayoutRoutes = [
  {
    url: HOME_PAGE_URL,
    component: <HomePage />,
  },
  {
    url: BOOK_PAGE_URL,
    component: <BookSearchPage />,
  },
  {
    url: BOOK_ENTRY_PAGE_URL,
    component: <BookEntryPage />,
  },
  {
    url: INVOICE_PAGE_URL,
    component: <InvoicePage />,
  },
  {
    url: PAYMENT_PAGE_URL,
    component: <PaymentPage />,
  },
  {
    url: REPORT_PAGE_URL,
    component: <ReportPage />,
  },
  {
    url: REGULATION_PAGE_URL,
    component: <RegulationPage />,
  },
  {
    url: USER_PAGE_URL,
    component: <UserPage />,
  },
];
