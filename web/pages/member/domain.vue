<template>
  <v-container fluid class="pt-0 containerDiv">
    <v-row no-gutters color="white" elevation class="px-10">
      <v-col md="10" offset-md="1" class="baseLayout mt-10">
        <div class="titleSection pa-5">
          <h1>Domains</h1>
        </div>
        <div class="pa-5">
          <k-list-form
            ref="listForm"
            :show-select="false"
            :show-delete="false"
            :show-new="true"
            list-meta="/ui/domain/listconfig"
            list-source="/api/domain/populate"
            form-meta="/ui/domain/formconfig"
            form-source="/api/domain/get"
            form-save="/api/domain/save"
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
  name: "AdminDomain",
  components: { KListForm },
};
</script>