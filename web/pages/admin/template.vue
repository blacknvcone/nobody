<template>
  <v-container fluid class="pt-0 containerDiv">
    <v-row no-gutters color="white" elevation class="px-10">
      <v-col md="10" offset-md="1" class="baseLayout mt-10">
        <div class="titleSection pa-5">
          <h1>Message Template</h1>
        </div>
        <div class="pa-5">
    <k-grid-form
      list-meta="/ui/template/gridconfig"
      list-source="/api/template/gets"
      list-delete-url="/api/template/delete"
      form-meta="/ui/template/formconfig"
      form-source="/api/template/get"
      form-save="/api/template/save"
      :external-editor="true"
    ></k-grid-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KGridForm from '@shared/components/k-vue/KGridForm.vue'
export default {
  name : 'MsgTemplate',
  components : {KGridForm},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>