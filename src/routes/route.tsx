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
import BookPageGuard from "../components/Guard/BookPageGuard";
import BookEntryGuard from "../components/Guard/BookEntryGuard";
import InvoiceGuard from "../components/Guard/InvoiceGuard";
import PaymentGuard from "../components/Guard/PaymentGuard";
import ReportGuard from "../components/Guard/ReportGuard";
import RegulationGuard from "../components/Guard/RegulationGuard";
import UserGuard from "../components/Guard/UserGuard";

export const MainLayoutRoutes = [
  {
    url: HOME_PAGE_URL,
    component: (
      <BookPageGuard>
        <HomePage />
      </BookPageGuard>
    ),
  },
  {
    url: BOOK_PAGE_URL,
    component: (
      <BookPageGuard>
        <BookSearchPage />
      </BookPageGuard>
    ),
  },
  {
    url: BOOK_ENTRY_PAGE_URL,
    component: (
      <BookEntryGuard>
        <BookEntryPage />
      </BookEntryGuard>
    ),
  },
  {
    url: INVOICE_PAGE_URL,
    component: (
      <InvoiceGuard>
        <InvoicePage />
      </InvoiceGuard>
    ),
  },
  {
    url: PAYMENT_PAGE_URL,
    component: (
      <PaymentGuard>
        <PaymentPage />
      </PaymentGuard>
    ),
  },
  {
    url: REPORT_PAGE_URL,
    component: (
      <ReportGuard>
        <ReportPage />
      </ReportGuard>
    ),
  },
  {
    url: REGULATION_PAGE_URL,
    component: (
      <RegulationGuard>
        <RegulationPage />
      </RegulationGuard>
    ),
  },
  {
    url: USER_PAGE_URL,
    component: (
      <UserGuard>
        <UserPage />
      </UserGuard>
    ),
  },
];
