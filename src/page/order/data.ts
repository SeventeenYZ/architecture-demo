// 常量定义、功能函数（formatTime）,相当于集合了薄薄的feature层和entities层
// interface也可以在这里定义，不拆分成interface.d.ts文件
// 甚至组件所调用的方法里一些判断、校验、数据转化等杂活可以抽离到这里，让组件只保留核心业务逻辑
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
