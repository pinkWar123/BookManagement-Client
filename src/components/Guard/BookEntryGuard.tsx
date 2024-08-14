import { FunctionComponent } from "react";
import Guard, { PageGuardProps } from "./Guard";
import { BOOK_ENTRY_ROLES } from "../../routes/permission";

export interface BookEntryGuardProps extends PageGuardProps {}

const BookEntryGuard: FunctionComponent<BookEntryGuardProps> = ({
  children,
}) => {
  return <Guard roles={BOOK_ENTRY_ROLES}>{children}</Guard>;
};

export default BookEntryGuard;
