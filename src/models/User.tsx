export enum Role {
  MANAGER = "Manager",
  CASHIER = "Cashier",
  CUSTOMER = "Customer",
  STOREKEEPER = "StoreKeeper",
}

export interface IUser {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  userLogin?: string;
  password?: string;
  role: Role;
}
