import { ref, reactive } from 'vue'
import { useTable } from "@/hooks/useTable";

export function useFormTable() {
  const formDom = ref()

  const formData = reactive({
    page: 1,
    pageSize: 10,
  })

  const { tableData, getTableData } = useTable(formData)

  const reset = () => {
    formDom.value.resetFields()
    getTableData()
  }

  const search = () => {
    getTableData()
  }

  return {
    formDom,
    formData,
    reset,
    search,
    tableData,
    getTableData,
  }
}
