<template>
    <v-dialog v-model="show.login" 
        transition="dialog-top-transition"
        max-width="687">
        <v-card style="border-radius:15px;" elevation="2">
            <v-card-actions class="pt-5 justify-start">
                <v-icon
                    large
                    @click.stop="show.login=false">
                    mdi-chevron-left
                </v-icon>
            </v-card-actions>

            <v-window v-model="step">
                
              <v-window-item :value="1">
                <v-card-text class="mb-8">
                    <v-card-title class="pa-2 d-flex justify-center mb-2"><span class="font-weight-black" style="font-size:26px">Masuk ke akun adalink</span></v-card-title>
                    <v-card-subtitle class="pa-2 d-flex justify-center"><span class="font-weight-medium" style="font-size:16px">Belum daftar? <a v-on:click.stop="doSwitch" color="blue">Daftar!</a></span></v-card-subtitle>
                </v-card-text>

                <v-form>
                    <v-container class="pb-7">
                        <v-row align="center"
                            justify="center">
                            <v-col cols="10">
                                <k-form 
                                    name="formLogin"
                                    meta="/login/formconfig"
                                    hideok
                                    submitFill
                                    submit-text="Masuk"
                                    @doSubmit="doLogin"
                                    
                                    dense
                                    customView
                                    outerLabelSize="16px"
                                    outerLabelColor="#A0A0A0"
                                >
                                  <template v-slot:buttons>
                                    <slot name="buttons">
                                      <v-btn dark color="secondary" class="mt-2" style="width:100%" @click="step = 2">
                                        Lupa Password
                                      </v-btn>
                                    </slot>
                                  </template>
                                </k-form>
                                <!--v-btn color="secondary" :to="'/profile/forgetpass'" style="width:100%">Lupa Password</!--v-btn-->
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
              </v-window-item>

              <v-window-item :value="2">
                <div class="d-flex justify-center mb-5">
                  <v-img
                    alt="Adalink Logo"
                    max-width="150"
                    contain
                    :src="require('@/static/adalink-black.png')"
                  />
                </div>
                <v-card-title class="pa-2 d-flex justify-center"><h1 class="font-weight-black">Forget Your Password?</h1></v-card-title>
                <v-card-subtitle class="py-2 d-flex justify-center" style="font-size:15px; text-align:center">
                  <v-col cols="12" sm="10" md="8" lg="7">Just enter the email or username you signed up with and we'll let you reset it.</v-col>
                </v-card-subtitle>

                <v-container class="pb-7">
                  <v-row align="center"
                    justify="center"
                  >
                    <v-col cols="8" class="mb-10">

                      <span style="font-size:16px; color:#A0A0A0;">Masukkan email</span>
                      <div v-if="displayMode=='form'" align="center">
                        <v-text-field
                          v-model="Email"

                          outlined
                          dense
                        >
                        </v-text-field>
                        <v-btn color="primary" :disabled="!isEmail" @click="sendReminderToken" style="width:100%">Ingatkan Password Saya</v-btn>
                        <div class="pt-3">
                          <v-btn @click="step = 1" style="width:100%">Back</v-btn>
                        </div>
                      </div>

                      <div v-if="displayMode=='status'">
                        Periksa inbox email anda ({{ Email }}), 
                        apabila email yang dimasukkan terdaftar di sistem kami, 
                        maka instruksi untuk perubahan password akan dikirimkan ke email tersebut. 
                        Pastikan juga memeriksa spam dan junk folder.
                      </div>

                    </v-col>
                  </v-row>
                </v-container>
              </v-window-item>

            </v-window>
        </v-card>
    </v-dialog>
</template>

<script>
import KForm from '@shared/components/k-vue/KFormCustom.vue'

export default {
  components: { KForm },
  name: "Login",
  layout: "landing",

  data () {
    return {
      loginDone : false,
      loginMsg : "",
      step: 1,
      
      //forget password
      Email: '',
      displayMode: 'form'
    }
  },

  methods: {
    doLogin (data) {
      this.$axios({
      method: 'POST',
        url: '/login/authenticate',
        auth: {
          username: data.LoginID,
          password: data.Password
        }}).then(r => {
          this.show.login = false
          this.redir(r.data)
        }, 

        e => {
          //alert(e.response.data)
          this.$tool.handleError(e)
        })
    },

    redir (data) {
      this.$store.commit('setAuth', data)
      this.$router.push('/')
    },

    doSwitch () {
      this.show.login = false
      this.show.register = true
    },

    //forget password
    sendReminderToken () {
      this.$axios({
        method: 'POST',
        url: '/forgetpass/sendtoken',
        data: this.Email
      }).then(r => {
        this.displayMode = 'status'
      }, e => {
        this.$tool.handleError(e)
      })
    }
  },

  props: {
    //  value: Boolean,
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
    },

    //forget password
    isEmail () {
      const adloc = this.Email.indexOf('@')
      return this.Email != '' && adloc > 0 && adloc < (this.Email.length - 1)
    }
  }
}
</script>