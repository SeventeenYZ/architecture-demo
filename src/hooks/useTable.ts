import { ref } from 'vue'
import { GET_LIST } from "@/page/order/api";

export function useTable(formData: any) {
  const tableData = ref([])

  const getTableData = async () => {
    const [err, data] = await GET_LIST(formData)
    if (err) return
    tableData.value = data.items
  }

  return { tableData, getTableData }
}
