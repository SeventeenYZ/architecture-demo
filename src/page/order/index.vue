<script setup lang="ts">
import { onMounted } from 'vue'
import { fieldList, tableColumns } from './data'
import { useFormTable } from "@/hooks/useFormTable";

const { formDom, formData, search, reset, tableData, getTableData } = useFormTable()

const handleSubmit = (data) => {
  console.log(data)
}

onMounted(() => {
  getTableData()
})
</script>

<template>
  <div class='form-box'>
    <CMForm
        :formDom="formDom"
        :fieldList="fieldList"
        :formData="formData"
        @submit="handleSubmit" />
  </div>
  <div class='button-box'>
    <a-button @click="search" type="primary">查询</a-button>
    <a-button @click="reset">重置</a-button>
  </div>
  <div class='table-box'>
      <a-table :columns="tableColumns" :data="tableData" />
  </div>
</template>

<style scoped>
</style>
