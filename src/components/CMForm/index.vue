<template>
  <a-form :ref="formDom" :model="formData" @submit="handleSubmit">
    <template v-for="item in fieldList">
      <a-form-item :field="item.field" :label="item.label">
        <component :is="item.component" v-model="item.field" />
      </a-form-item>
    </template>
  </a-form>
</template>

<script setup>
const props = defineProps(['formDom', 'formData', 'fieldList'])

const handleSubmit = (data) => {
  emit('submit', data)
}
</script>
