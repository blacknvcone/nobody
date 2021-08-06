<template>
  <v-container style="width:350px">
    <h1>Lupa Password</h1>

    <div v-if="displayMode=='form'">
      <v-text-field label="Masukkan email" v-model="Email"></v-text-field>
      <v-btn color="primary" :disabled="!isEmail" @click="sendReminderToken">Ingatkan Password Saya</v-btn>
    </div>

    <div v-if="displayMode=='status'">
      Periksa inbox email anda ({{ Email }}), 
      apabila email yang dimasukkan terdaftar di sistem kami, 
      maka instruksi untuk perubahan password akan dikirimkan ke email tersebut. 
      Pastikan juga memeriksa spam dan junk folder.
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "landing",

  data () {
    return {
      Email: '',
      displayMode: 'form'
    }
  },

  computed: {
    isEmail () {
      const adloc = this.Email.indexOf('@')
      return this.Email != '' && adloc > 0 && adloc < (this.Email.length - 1)
    }
  },

  methods: {
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
  }
}
</script>