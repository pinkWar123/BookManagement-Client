export interface RegisterDto {
  username: string;
  password: string;
  passwordConfirm: string;
  email?: string;
  fullName: string;
}
