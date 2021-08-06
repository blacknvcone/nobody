<template>
  <v-container style="width:350px">
    <h1>Rubah Password</h1>

    <div class="pt5" v-if="displayMode=='wait'">
      Mohon tunggu, system sedang melakukan validasi
    </div>

    <div class="pt5" v-if="displayMode=='form'">
      <v-text-field label="Masukkan email" v-model="formData.email"></v-text-field>
      <v-text-field type="password" label="Masukkan password baru" v-model="formData.newpass" require />
      <v-text-field type="password" label="Masukkan konfirmasi password baru" v-model="formData.newpass_confirm" require />
      <v-btn color="primary" @click="changePass">Submit</v-btn>
    </div>

    <div class="pt5" v-if="displayMode=='status'">
      Password anda telah berubah. Silahkan login dengan password baru anda.
    </div>

    <div class="pt5" v-if="displayMode=='message'" v-html="message"></div>
  </v-container>
</template>

<script>
export default {
  layout: "landing",

  data () {
    return {
      displayMode : 'wait',
      tokenValid : false,
      message : '',
      formData : {
        email: '',
        newpass : '',
        newpass_confirm : ''
      }
    }
  },

  mounted () {
    this.$axios.post('/token/claim',{
      TokenID: this.$route.query.token,
      Kind: 'ForgetPassToken'
    }).then(r => {
      this.displayMode = 'form'
    }, e => {
      this.$tool.error(e)
      this.displayMode = 'message'
      this.message = "Proses gagal, pesan kesalahan: <b>"+e.response.data+"</b>"
    })
  },

  methods: {
    changePass () {
      if (this.formData.newpass=='') {
        this.$tool.error('Password tidak boleh kosong')
        return
      }

      if (this.formData.newpass!=this.formData.newpass_confirm) {
        this.$tool.error("Password dan confirm tidak sama")
        return
      }

      this.$axios.post('/forgetpass/changepwd',
        {
          Email: this.formData.email,
          Token: this.$route.query.token,
          Password: this.formData.newpass
        }).then(r => {
            this.displayMode = 'status'
          }, e => {
            this.$tool.error(e)
          })  
    }
  }
}
</script>