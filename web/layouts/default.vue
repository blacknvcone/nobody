<template>
  <v-app>
    <v-app-bar
      fixed
      app
      flat
      dark
      dense
      color="primary"
      height="68"
      :clipped-left="clipped"
      clipped-right
    >
      <v-toolbar-title @click="home">
        <v-img width="100px" :src="require('@/static/adalink.png')" />
      </v-toolbar-title>

      <v-spacer />

      <div v-if="$store.state.auth == ''">
        <v-btn small text :to="'/profile/login'">Login</v-btn>
        <v-btn small text :to="'/profile/register'">Sign-up </v-btn>
      </div>

      <v-menu small v-if="$store.state.auth != ''" offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn text v-bind="attrs" v-on="on">
            {{ $store.state.userName }}
            <v-icon medium dark right>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list dark color="primary" min-width="150">
          <v-list-item nuxt to="/profile">Profile </v-list-item>
          <v-list-item nuxt to="/member/link">My Link</v-list-item>
          <v-list-item nuxt to="/member/domain">My Domain</v-list-item>
          <v-list-item nuxt to="/profile/logout">Logout</v-list-item>
          <v-divider></v-divider>
          <div v-if="$store.state.roles == 'administrators'">
            <v-subheader>Administration</v-subheader>
            <v-list-item nuxt to="/admin/user">User</v-list-item>
            <v-list-item nuxt to="/admin/domain">Domain</v-list-item>
            <v-list-item nuxt to="/admin/link">Link</v-list-item>
            <v-list-item nuxt to="/admin/template">Template</v-list-item>
          </div>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main style="background-color: #ffffff">
      <v-snackbar v-model="thereIsError" color="error" top>
        {{ $store.state.errorText }}

        <template v-slot:action>
          <v-btn color="yellow" text @click="$store.commit('clearErrorText')">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="thereIsInfo" color="primary" timeout="2000" top>
        {{ $store.state.infoText }}

        <template v-slot:action>
          <v-btn color="yellow" text @click="$store.commit('clearInfoText')">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-container fluid>
        <nuxt />
        <v-btn
          fab
          small
          dense
          dark
             fixed
            bottom
            right
          color="primary"
          title="Add New Link"
          @click.stop="showCreate = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </v-main>

    <v-footer app dark color="primary" fixed>
      <span>
        &copy; {{ new Date().getFullYear() }}
        <span v-if="$store.state.auth != ''">
          &nbsp;|&nbsp;
          {{ $store.state.userName }}
        </span>
      </span>
    </v-footer>
    <link-dialog v-model="showCreate"></link-dialog>
  </v-app>
</template>

<script>
import LinkDialog from "@/components/link/LinkDialog.vue";
import LinkEdit from "@/components/link/LinkEdit.vue";

export default {
  middleware: "authenticated",
  coomponents: {
    LinkDialog,
    LinkEdit,
  },
  computed: {
    thereIsError: {
      get() {
        return this.$store.state.errorText != "";
      },

      set(v) {
        this.$store.commit("setErrorText", v);
      },
    },

    thereIsInfo: {
      get() {
        return this.$store.state.infoText != "";
      },

      set(v) {
        this.$store.commit("setInfoText", v);
      },
    },
  },

  data() {
    return {
      drawer: true,
      drawerMini: true,
      clipped: true,
      showCreate: false,
      menus: [],
    };
  },

  methods: {
    home() {
      this.$router.push("/");
    },

    showDrawer() {
      if (this.drawer) {
        this.drawerMini = !this.drawerMini;
        return;
      }

      this.drawer = true;
      this.drawerMini = false;
    },
  },
};
</script>


<style>
.container {
  padding: 0px !important;
}
body {
  font-family: Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  font-weight: normal;
}

h1 {
  font-weight: bold;
  font-size: 1.6em;
}

h2,
h3,
h4 {
  font-weight: normal;
}

a {
  text-decoration: none;
  font-weight: bold;
}

.v-breadcrumbs li {
  font-size: 9px;
}

.v-btn,
.v-tab {
  text-transform: none;
  letter-spacing: 0px;
}

.v-content {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

v-subheader {
  font-size: 1em;
}

.v-list-item {
  min-height: 25px;
}

.v-list-item__content {
  padding: 5px 0;
}

.v-list-item__title {
  font-size: 1em;
}

.v-list-item__subtitle {
  font-size: 0.9em;
}

.v-card {
  margin-bottom: 5px;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 10px;
  font-size: 1em;
}

.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0);
}

.v-card__title {
  padding-bottom: 5px;
  font-size: 1.2em;
}

.v-card__text {
  padding-top: 5px;
}

.v-dialog > .v-card > .v-card__title {
  font-size: 1.2em;
  font-weight: 500;
  padding: 8px;
  padding-bottom: 2px;
}

.v-dialog > .v-card > .v-card__text {
  padding-left: 8px;
  padding-right: 8px;
}

.v-text-field {
  padding-top: 8px;
  margin-top: 8px;
  font-size: 12px;
}

.v-label {
  font-size: 1em;
}

.v-input {
  font-size: 1em;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 1em;
  height: 36px;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}
.container--fluid {
  padding: 0px;
}
.baseLayout {
  background: white;
  min-height: 600px;
  border-radius: 10px;
}
.containerDiv {
  background: #f8f9fa;
  height: 90vh;
}
.titleSection {
  border-bottom: lightgrey solid 0.1px;
}
</style>
