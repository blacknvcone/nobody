<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title>
        Daftar Link
      </v-card-title>
      <v-card-text>

        <v-row>
          <v-col xl="3" lg="3" md="4" sm="6">
            <k-list
              :show-new="false"
              :show-select="false"
              :show-delete="false"
              meta="/api/linklist/listconfig"
              source="/api/link/populate"
              @selectData="selectData"
            >
            </k-list>
          </v-col>
          <v-col>
            <div v-if="selectedData._id!=undefined">
              <h1 style="font-size:1.3em;font-weight:bold;">{{ selectedData.Slug }}</h1>
              
              <k-form
                class="mt-5"
                meta="/ui/link-grid/formconfig"
                :tabs="['General','Visit Analysis','History','QR Code']"
                :show-tabs="true"
                :source="selectedData"
                @tabChange="tabChange"
              >
                <template v-slot:buttons>
                  <v-btn color="warning" @click="cancelSelect">Cancel</v-btn>
                </template>

                <template v-slot:tab_1>
                  <v-row>
                    <v-col>
                      <k-input field-type="date" value="01/01/2001" label="From" />
                    </v-col>
                    <v-col>
                      <k-input field-type="date" value="01/01/2001" label="To" />
                    </v-col>
                    <v-col cols="8" align="start">
                      <v-btn color="primary" small>Refresh</v-btn>
                    </v-col>
                  </v-row>
                </template>

                <template v-slot:tab_3="item">
                  <v-row>
                    <v-col align="center" justify="center">
                      QR Code for {{ item.URI }}
                    </v-col>
                  </v-row>
                </template>
              </k-form>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import KList from '@shared/components/k-vue/KList.vue'
import KForm from '@shared/components/k-vue/KForm.vue'
import KInput from '@shared/components/k-vue/KInput.vue'

export default {
  name : 'LinkList',
  components : {KList, KForm, KInput},
  
  data () {
    return {
      selectedData : {}
    }
  },

  methods : {
    selectData (item) {
      //this.selected  = item
      this.$axios.post('/api/link/stat', item._id).then(
        r => {
          this.selectedData = r.data
        },

        e => {
          this.$tool.handleError(e)
        }
      )
    },

    tabChange (idx) {
      if (idx==4) {
        this.cancelSelect()
      }
    },

    cancelSelect () {
      this.selectedData = {}
    }
  }
}
</script>
//7axuBEf2t7uc