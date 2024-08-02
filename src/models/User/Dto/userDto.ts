export interface UserDto {
  message?: string;
  errors?: string[];
  isAuthenticated: boolean;
  username: string;
  email?: string;
  token?: string;
  roles: string[];
}
