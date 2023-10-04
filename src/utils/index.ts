/** 돈 표시 */
export const getMoneyValue = (money: number, removeCurrency?: boolean) => {
  const commaMoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return commaMoney ? `${commaMoney}${removeCurrency ? '' : '원'}` : `${money}`;
};
