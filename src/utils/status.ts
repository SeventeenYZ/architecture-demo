const statusData = {
    // 还款状态
    repayment_status: [
        [0, '未还款'],
        [1, '已还部分'],
        [2, '已还清'],
    ],
};

type IType = keyof typeof statusData

export const formatStatus = (type: IType, status: number | string) => {
    const res = statusData[type] || [];
    const statusMap = new Map(res as Iterable<any>);
    return (statusMap.get(status) as string) || '--';
};
