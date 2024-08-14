import { FunctionComponent } from "react";
import Guard, { PageGuardProps } from "./Guard";
import { BOOK_PAGE_ROLES } from "../../routes/permission";

export interface BookPageGuardProps extends PageGuardProps {}

const BookPageGuard: FunctionComponent<BookPageGuardProps> = ({ children }) => {
  return <Guard roles={BOOK_PAGE_ROLES}>{children}</Guard>;
};

export default BookPageGuard;
