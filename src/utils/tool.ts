// 金额每三位插入逗号，'2000.00' => '2,000.00',
export const formatAmount = (amount: number | string): string => {
    const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    return amount.toString().replace(regForm, '$1,');
};
