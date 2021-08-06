<template>
    <v-dialog v-model="show.register" 
        transition="dialog-top-transition"
        max-width="687">
        <v-card style="border-radius:15px;" elevation="2">
            <v-card-actions class="pt-5 justify-start">
                <v-icon
                    large
                    @click.stop="show.register=false">
                    mdi-chevron-left
                </v-icon>
            </v-card-actions>

            <div v-if="!submitted">
              <v-card-text class="mb-8">
                  <v-card-title class="pa-2 d-flex justify-center mb-2"><span class="font-weight-black" style="font-size:26px">Daftar GRATIS Sekarang</span></v-card-title>
                  <v-card-subtitle class="pa-2 d-flex justify-center"><span class="font-weight-medium" style="font-size:16px">Sudah Punya Akun? <a v-on:click.stop="doSwitch" color="blue">Masuk</a></span></v-card-subtitle>
              </v-card-text>

              <v-form>
                  <v-container>
                      <v-row align="center" justify="center">
                          <v-col cols="10">
                              <k-form 
                                  name="formRegister"
                                  meta="/register/formconfig"
                                  post="/register/register"
                                  hideAfterSubmitOK
                                  hideok
                                  submitFill
                                  submit-text="Buat"
                                  dense
                                  @afterSubmit="afterSubmit"

                                  customView
                                  outerLabelSize="16px"
                                  outerLabelColor="#A0A0A0"
                              >
                              </k-form>
                          </v-col>
                      </v-row>
                  </v-container>
              </v-form>
            </div>
            <div v-if="submitted">
              <v-container>
                <v-row align="center" justify="center">
                    <v-col cols="10">
                      <v-alert text type="success">
                        Terima kasih, silahkan check inbox anda
                      </v-alert>
                    </v-col>
                </v-row>
              </v-container>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import KForm from '@shared/components/k-vue/KFormCustom.vue'

export default {
  components: { KForm },
  name: "Register",
  layout: "landing",

  data () {
    return {
      submitted : false,
      loginMsg : ""
    }
  },

  methods: {
    afterSubmit () {
      this.submitted = true
    },

    doSwitch () {
      this.show.register = false
      this.show.login = true
    }
  },

  props: {
    //  value: Boolean
     value: {},
  },

  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.v-application .my-2 {
  margin-left: 8px !important;
}
</style>