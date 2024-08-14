import { Role } from "../models/User/User";

export const BOOK_PAGE_ROLES = [
  Role.CASHIER,
  Role.MANAGER,
  Role.CUSTOMER,
  Role.STOREKEEPER,
];

export const BOOK_ENTRY_ROLES = [Role.MANAGER, Role.STOREKEEPER];

export const INVOICE_ROLES = [Role.CASHIER, Role.MANAGER];

export const PAYMENT_ROLES = [Role.CASHIER, Role.MANAGER];

export const REGULATION_ROLES = [Role.MANAGER];

export const REPORT_ROLES = [Role.MANAGER];

export const USER_ROLES = [Role.MANAGER];
