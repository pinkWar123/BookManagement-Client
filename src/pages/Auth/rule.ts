export const passwordRule = [
  {
    required: true,
    message: "Mật khẩu không được để trống",
  },
  {
    min: 12,
    message: "Mật khẩu phải chứa ít nhất 12 kí tự",
  },
  {
    pattern: /[A-Z]/,
    message: "Mật khẩu phải chứa ít nhất 1 kí tự in hoa",
  },
  {
    pattern: /[a-z]/,
    message: "Mật khẩu phải chứa ít nhất 1 kí tự viết thường",
  },
  {
    pattern: /[0-9]/,
    message: "Mật khẩu phải chứa ít nhất 1 chữ số",
  },
  {
    pattern: /[^A-Za-z0-9]/,
    message: "Mật khẩu phải chứa ít nhất 1 kí tự đặc biệt",
  },
];
