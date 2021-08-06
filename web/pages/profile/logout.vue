<template>
  <v-container>
    <div class="text-center" style="padding-top:90px">
      <h1 style="font-family:helvetica; font-weight:bold;"><v-icon medium>mdi-logout</v-icon>  Anda telah logout</h1>
      <h4>Terima kasih telah menggunakan <strong>Adalink</strong></h4>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "landing",
  mounted () {
    this.$axios({
        url: '/login/logout',
        method: 'post'
      }).then(r=>{
        this.$store.commit('clearAuth')
        this.$router.push('/')
      })
  }
}
</script>