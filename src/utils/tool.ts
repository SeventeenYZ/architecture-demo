// 金额每三位插入逗号，'2000.00' => '2,000.00',
export const formatAmount1 = (amount: number | string): string => {
    const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    return amount.toString().replace(regForm, '$1,');
};

// 另一个金额插入逗号的方法 1000.00 => 1,000.00
export const formatAmount2 = (amount: string | number) => {
    const initialVal = typeof amount === 'string' ? amount : String(amount);
    let num = initialVal.split('.')[0] || '0';
    const decimal = initialVal.split('.')[1] || '00';
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${result}.${decimal}`;
};


// 判断输入框是否为空
export const isEmpty = (value: any): boolean => {
    return value === undefined || value === null || value === ''
}