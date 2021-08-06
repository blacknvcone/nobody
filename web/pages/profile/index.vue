<template>
  <v-container fluid style="display: flex; height: 90vh;">
    <v-row no-gutters class="pt-5 d-flex justify-center" style="background-color: #f8f9fa">
      <v-col sm="10" md="10" class="mx-3">
        <v-card>
          <v-tabs
            v-model="tab"
            background-color="primary"
            slider-color="secondary"
            dark
          >
            <v-tab
              v-for="item in tabsItems"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat class="mx-10 my-10">
                <k-form
                  ref="form"
                  meta="/ui/profile/formconfig"
                  start-mode="view"
                  :source="record"
                  post="/api/profile/save"
                  @afterSubmit="afterSubmit"
                >
                </k-form>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat class="mx-10 my-10">
                <k-grid 
                  v-if="record.ID && record.ID!=''"
                  meta="ui/admin-user-licenseitem/gridconfig"
                  :source="record.License"
                  :show-new="false"
                  :show-edit="false"
                  :show-delete="false"
                  :show-select="false"
                  :show-footer="false"
                  :auto-add-line="false"
                  :show-options="false"
                  :inline-editor="false"
                >
                </k-grid>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KForm from '@shared/components/k-vue/KForm.vue'
import KGrid from '@shared/components/k-vue/KGrid.vue'
export default {
  components: { KForm, KGrid },
  name : 'ProfileIndex',

  data () {
    return {
      record: {},

      tab: null,
      tabsItems: [
        'Profile', 'License',
      ],
    }
  },

  mounted () {
    this.$axios.post('/api/profile/get','').then(r => {
      this.record = r.data
    }, e => {
    })
  },

  methods : {
    afterSubmit () {
      this.$refs.form.changeMode('view')
    }
  }
}
</script>