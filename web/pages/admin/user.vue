<template>
  <v-container fluid class="pt-0 containerDiv">
    <v-row no-gutters color="white" elevation class="px-10">
      <v-col md="10" offset-md="1" class="baseLayout mt-10">
        <div class="titleSection pa-5">
          <h1>User</h1>
        </div>
        <div class="pa-5">
          <k-list-form
            ref="listForm"
            :show-select="false"
            :show-delete="false"
            :show-new="false"
            list-meta="/ui/admin-user/listconfig"
            list-source="/api/admin-user/populate"
            form-meta="/ui/admin-user/formconfig"
            form-source="/api/admin-user/get"
            form-save="/api/admin-user/save"
            delete-data="/api/admin-user/get"
            :form-tabs="['General', 'License', 'Change Password']"
            @selectData="selectData"
            @newData="newData"
            @formAfterSubmit="afterSubmit"
          >
            <template v-slot:form_tab_2>
              <k-form
                meta="/ui/admin-user-changepass/formconfig"
                post="/api/admin-user/changepass"
                :source="changePass"
                @afterSubmit="afterChangePass"
              >
              </k-form>
            </template>

            <template v-slot:form_tab_1>
              <k-grid
                meta="/ui/admin-user-licenseitem/gridconfig"
                :source="licenseItems"
                :show-select="false"
                :auto-add-line="false"
                save-url="/api/admin-user/saveli"
                delete-url="/api/admin-user/deleteli"
                @newData="newLicenseItem"
                @editData="editLicenseItem"
                @afterDelete="afterDelete"
              >
              </k-grid>
            </template>
          </k-list-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KListForm from "@shared/components/k-vue/KListForm.vue";
import KGrid from "@shared/components/k-vue/KGrid.vue";
import KForm from "@shared/components/k-vue/KForm.vue";

export default {
  name: "AdminUser",
  components: { KListForm, KGrid, KForm },

  data() {
    return {
      selectedUserID: "",
      recordSelected: false,
      licenseItems: [],
      changePass: {
        _id: "",
        Password: "",
        Confirm: "",
      },
    };
  },

  methods: {
    newData(item) {
      //this.$refs.listForm.changeFormMode('edit')
    },

    selectData(item) {
      this.selectedUserID = item._id;
      this.recordSelected = true;
      this.changePass._id = item._id;
      this.$refs.listForm.changeFormMode("view");

      this.$axios
        .post("/api/admin-user/licenseitems", this.selectedUserID)
        .then(
          (r) => {
            this.licenseItems = r.data;
          },
          (e) => {
            this.$tool.error(e);
          }
        );
    },

    cancelEdit(item) {
      this.selectedUserID = "";
      this.recordSelected = false;
      this.changePass._id = "";
      this.licenseItems = [];
      this.$refs.listForm.changeFormMode("view");
    },

    afterChangePass(item) {
      this.changePass.Password = "";
      this.changePass.Confirm = "";
      this.$tool.info("Password has been changed");
    },

    newLicenseItem(item) {
      item.UserID = this.selectedUserID;
      item.Expire = this.$moment("31-Dec-2999");
    },

    editLicenseItem(item) {
      item.UserID = this.selectedUserID;
    },

    afterDelete(data) {
      this.licenseItems = data;
    },

    afterSubmit(data) {
      this.$tool.info("Data has been saved successfully");
      this.$refs.listForm.changeFormMode("view");
    },
  },
};
</script>