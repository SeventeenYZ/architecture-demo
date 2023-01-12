// 常量定义、功能函数（formatTime）,相当于集合了薄薄的feature层和entities层

export const fieldList = [
  {
    label: '姓名',
    filed: 'name',
    component: 'a-input',
  },
  {
    label: '工资',
    filed: 'salary',
    component: 'a-input',
  },
  {
    label: '地址',
    filed: 'address',
    component: 'a-input',
  },
]

export const tableColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '工资',
    dataIndex: 'salary',
  },
  {
    title: '地址',
    dataIndex: 'address',
  }
]
