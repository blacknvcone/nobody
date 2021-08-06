<template>
  <div>
    <h1>Categories</h1>
    <k-grid
      :show-footer="false"
      :auto-add-line="true"
      :show-select="false"
      :inline-editor="true"
      meta="/ui/category/gridconfig"
      source="/api/category/gets"
      save-url="/api/category/save"
      delete-url="/api/category/delete"
    >
    </k-grid>
  </div>
</template>

<script>
import KGrid from '@shared/components/k-vue/KGrid.vue'

export default {
  name: 'AdminCategory',
  components: {KGrid}
}
</script>