<template>
  <v-container style="width:350px">
      <v-card outlined>
        <v-card-text>
          <h1>Login</h1>
          <div v-if="!loginDone" class="pt-3">
            <k-form 
              name="formLogin"
              meta="/login/formconfig"
              hideok
              submitFill
              submitText="Login"
              @doSubmit="doLogin"
            >
            </k-form>
          </div>

          <div>
            <v-btn color="secondary" :to="'/profile/forgetpass'" style="width:100%">Lupa Password</v-btn>
            <v-btn text color="primary" :to="'/profile/register'" style="width:100%" class="mt-2">Tidak punya akun, buat baru</v-btn>
          </div>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import KForm from '@shared/components/k-vue/KForm.vue'

export default {
  components: { KForm },
  name: "Login",
  layout: "landing",

  data () {
    return {
      loginDone : false,
      loginMsg : ""
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
    }
  }
}
</script>