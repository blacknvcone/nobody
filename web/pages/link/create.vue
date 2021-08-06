<template>
  <v-container fluid>
      <div style="width:600px" class="mx-auto">
        <h1>Link Shortener</h1>
        <div v-show="mode=='create'">
          <k-form
            name="form_create_link"
            meta="/api/createlink/formconfig"
            submit-text="Shorten"
            post="/api/link/save"
            @afterSubmit="afterSubmit"
          >
            <template v-slot:item_Domain="item">
              <k-input 
                :value="item.Domain"
                :use-list="true"
                label="Domain"
              />
            </template>
            <template v-slot:header>
              Masukkan URL yang ingin dipendekan, dan klik <b>Shorten</b>
            </template>
          </k-form>
        </div>

        <div v-show="mode=='confirm'">
          <p>
          ada-link baru dari
          </p>

          <p>
            <i>{{ item.URI }}</i>
          </p>

          <p>adalah</p>

          <p><b>https://www.adalink.com/{{ item.Slug }}</b></p>

          <v-btn color="primary" @click="newLink">Buat baru</v-btn>
        </div>
      </div>
  </v-container>
</template>

<script>
import KForm from '@shared/components/k-vue/KForm.vue'
import KInput from '@shared/components/k-vue/KInput.vue'

export default {
  name : 'CreateLink',
  components : { KForm, KInput },

  data () {
    return {
      mode : 'create',
      item : {}
    }
  },

  methods : {
    afterSubmit (data) {
      this.mode = 'confirm'
      this.item = data
    },

    newLink () {
      this.mode = 'create'
      this.item = {}
    }
  }
}
</script>
