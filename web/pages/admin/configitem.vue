<template>
  <div>
    <h1>App Setting</h1>
    <k-grid
      class="mt-5"
      meta="/ui/configitem/gridconfig"
      :show-select="false"
      :auto-add-line="false"
      :inline-editor="true"
      :show-footer="false"
      source="/api/configitem/gets"
      save-url="/api/configitem/save"
      delete-url="/api/configitem/delete"
    >
    </k-grid>
  </div>
</template>

<script>
import KGrid from '@shared/components/k-vue/KGrid.vue'
export default {
  name : 'AdminSetting',
  components : {KGrid},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>