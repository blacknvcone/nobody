<template>
  <v-container style="max-width:450px">
    <div class="pt-2" v-if="!submitted">
      <h1 style="text-align:center">Sign up and start build your link</h1>
      <div class="pt-3 pb-3">
        <k-form 
          name="formRegister"
          meta="/register/formconfig"
          post="/register/register"
          hideAfterSubmitOK
          hideok
          submitFill
          submit-text="Sign-up with Email"
          @afterSubmit="afterSubmit"
        >
        </k-form>
      </div>  
      <div style="text-align:center;color:#888">
        By creating an account, you agree to our <b><i>term of service</i></b> and <b><i>privacy policy</i></b>
      </div>
    </div>

    <div class="pt-2" v-if="submitted">
      Terima kasih, silahkan check inbox anda
    </div>
  </v-container>
</template>

<script>
import KForm from '@shared/components/k-vue/KForm.vue'

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
    }
  }
}
</script>
