<template>
  <v-container fluid class="pt-0 containerDiv">
    <v-row no-gutters color="white" elevation class="px-10">
      <v-col md="10" offset-md="1" class="baseLayout mt-10">
        <div class="titleSection pa-5">
          <h1>Link</h1>
        </div>
        <div class="pa-5">
          <k-list-form
            ref="listForm"
            :show-select="false"
            :show-delete="false"
            :show-new="false"
            list-meta="/ui/admin-link/listconfig"
            list-source="/api/admin-link/populateall"
            form-meta="/ui/link-form-admin/formconfig"
            form-source="/api/link/get"
            form-save="/api/link/save"
          >
          </k-list-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KListForm from "@shared/components/k-vue/KListForm.vue";
export default {
  name: "AdminLink",
  components: { KListForm },
};
</script>