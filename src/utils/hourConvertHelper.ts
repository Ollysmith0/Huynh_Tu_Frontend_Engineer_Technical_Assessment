export const hourConvertHelper = (hour: any) => {
  const divider = hour.toString().slice(2);
  const number = hour.toString().slice(0, 2);
  const dividerNumber = (Number(divider) * 100) / 60;

  return Number(parseFloat(number) + dividerNumber);
};
