<template>
  <v-app>
    <v-app-bar app color="primary" flat height="50px">
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      >
        <span class="white--text text-xs"></></span></v-avatar
      >

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="(link, i) in links" :key="i" @click="navpage(link.route)">
          <div class="white--text">{{ link.title }}</div>
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="40"
      >
        <span class="white--text text-xs"></></span></v-avatar
      >
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid> <nuxt /> </v-container
    ></v-main>

    <v-footer color="secondary">
      <v-col class="text-center" cols="12">
        <div class="white--text">
          © {{ new Date().getFullYear() }} Dani Prasetya —
          <strong>Make with 🧠 and some ☕. </strong><br />
          <strong
            >This host powered by
            <i><a href="https://www.netlify.com/"> Netlify </a></i></strong
          >
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    navpage(route) {
      this.$router.push(route)
    },
  },
  computed: {
    currentRouteName() {
      return this.$router.name
    },
  },
  data: () => ({
    links: [
      {
        title: 'AboutMe',
        route: '/aboutme/',
      },
      {
        title: 'My Projects',
        route: '/projects/',
      },
    ],
  }),

  mounted() {
    console.log(this.$router.name)
    if (this.$router.name == undefined) {
      this.$router.push('/aboutme/')
    }
  },
}
</script>
<style></style>
