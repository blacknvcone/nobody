<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="(link, i) in links" :key="i" @click="navpage(link.route)">
          {{ link.title }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid> <nuxt /> </v-container
    ></v-main>
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
