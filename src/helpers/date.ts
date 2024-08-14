export const getToday = () => {
  const today = new Date();
  const targetDate = today.toISOString().split("T")[0];
  return targetDate;
};

export const getCurrentMonthYear = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return { month, year };
};
