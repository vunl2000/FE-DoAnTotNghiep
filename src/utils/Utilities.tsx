export const formartMoney = (val: any) => {
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ';
};
