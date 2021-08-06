<template>
  <div>
    <h1>My Link</h1>
    <k-grid-form
      :show-select="false"
      :auto-add-line="false"
      list-mode="grid"
      list-meta="/ui/link-list/gridconfig"
      list-source="/api/link/populate"
      form-meta="/ui/link-form-owner/formconfig"
      form-source="/api/link/get"
      form-save="/api/link/save"
    >
    </k-grid-form>
  </div>
</template>

<script>
import KGridForm from '@shared/components/k-vue/KGridForm.vue'
export default {
  name: 'MyLink',
  components: {KGridForm},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>