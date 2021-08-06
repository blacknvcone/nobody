<template>
  <v-app>
    <v-container>
      <v-app-bar
        app
        :color="navBelowFold ? 'white' : 'transparent'"
        class="px-10"
        elevate-on-scroll
        dense
        v-scroll="handleScroll"
      >
        <v-toolbar-title
          @click="home"
          style="cursor: pointer; font-size: 1.6em"
        >
          <v-img
            width="100px"
            v-if="!navBelowFold"
            :src="require('@/static/adalink.png')"
          />
          <v-img
            width="100px"
            v-if="navBelowFold"
            :src="require('@/static/adalink-black.png')"
          />
        </v-toolbar-title>

        <v-spacer />
        <v-btn
          v-if="$store.state.auth == ''"
          class="desktopVersion"
          text
          :color="navBelowFold ? 'black' : 'white'"
          >FITURE</v-btn
        >
        <v-btn
          v-if="$store.state.auth == ''"
          text
          class="mr-8 ml-5 desktopVersion"
          :color="navBelowFold ? 'black' : 'white'"
          >TENTANG KAMI</v-btn
        >

        <div v-if="$store.state.auth == ''">
          <v-btn
            :color="navBelowFold ? 'black' : 'white'"
            rounded
            outlined
            @click.stop="show.register = true"
            >Daftar</v-btn
          >
          <v-btn color="white" rounded @click.stop="show.login = true"
            >Masuk</v-btn
          >
        </div>

        <v-menu small v-if="$store.state.auth != ''" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <div class="d-flex align-center">
              <!-- <v-btn
                :color="navBelowFold ? 'black' : 'white'"
                rounded
                outlined
                @click.stop="goToDashboard()"
                >Dashboard</v-btn
              > -->
              <div class="mr-4">
                <v-btn icon dark x-small v-bind="attrs" v-on="on" :color="navBelowFold ? 'black' : 'white'">
                  <span style="font-size:12px;">{{ $store.state.userName }}</span>
                  <v-icon dark right>mdi-account-circle</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
          <v-list dark color="primary" min-width="150">
            <v-list-item nuxt to="/profile">Profile</v-list-item>
            <v-divider></v-divider>
            <!-- <v-list-item nuxt to="/admin/user">User</v-list-item>
            <v-list-item nuxt to="/admin/domain">Domain</v-list-item>
            <v-list-item nuxt to="/admin/link">Link</v-list-item>
            <v-list-item nuxt to="/admin/template">Template</v-list-item> -->
            <v-list-item nuxt to="/member/dashboard">Dashboard</v-list-item>
            <v-list-item nuxt to="/member/domain">My Domain</v-list-item>
            <v-list-item nuxt to="/member/link">My Link</v-list-item>
            <v-divider></v-divider>
            <v-list-item nuxt to="/profile/logout">Logout</v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-container>

    <v-main class="pt-0">
      <v-container fluid>
        <show-login v-model="show"></show-login>
        <show-register v-model="show"></show-register>

        <v-snackbar v-model="thereIsError" color="error" top>
          {{ $store.state.errorText }}

          <template v-slot:action>
            <v-btn color="yellow" text @click="$store.commit('clearErrorText')">
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <v-snackbar v-model="thereIsInfo" color="primary" top>
          {{ $store.state.infoText }}

          <template v-slot:action>
            <v-btn color="yellow" text @click="$store.commit('clearInfoText')">
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <nuxt />
   
      </v-container>
    </v-main>
    <v-footer dark padless color="##2C2C2C" class="mt-5">
      <v-container>
        <v-row>
          <v-col cols="12" class="my-4">
            <v-img
              width="100px"
              class="centerImg"
              :src="require('@/static/adalink.png')"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-row class="footerContent">
          <v-col cols="6">
            <h3 class="headFooter">Product</h3>
            <span class="footerLink"> Feature </span>
            <span class="footerLink"> Pricing </span>
            <span class="footerLink"> Apps & Integration </span>
          </v-col>
          <v-col cols="3">
            <h3 class="headFooter">Company</h3>
            <span class="footerLink"> Blog </span>
            <span class="footerLink"> Publisher </span>
          </v-col>
          <v-col cols="3">
            <h3 class="headFooter">About Us</h3>
            <span class="footerLink"> About Company </span>
            <span class="footerLink"> Our Teams </span>
            <span class="footerLink"> Contact </span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-2 mb-1 desktopVersion">
          <v-col cols="12" sm="12" md="5">
            <span
              >© Copyright 2015- {{ new Date().getFullYear() }} Short.cm Inc.
              All Rights Reserved.</span
            >
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <span class="float-right">Terms & Condition</span>
          </v-col>
          <v-col cols="12" sm="12" md="1">
            <span class="">Privacy Policy</span>
          </v-col>
        </v-row>
        <v-row class="mt-2 mb-1 mobileVersion">
          <v-col cols="6" xs="6" sm="6" md="6">
            <span class="float-right">Terms & Condition</span>
          </v-col>
          <v-col cols="6" xs="6" sm="6" md="6">
            <span class="">Privacy Policy</span>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <center>
              <span class="text-center"
                >© Copyright 2015- {{ new Date().getFullYear() }} Short.cm Inc.
                All Rights Reserved.</span
              >
            </center>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
      <v-btn
          v-if="navBelowFold"
          fab
          small
          dense
          dark
             fixed
            bottom
            right
          color="primary"
          title="To The Top"
          @click="toTheTop"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
    <!-- <v-footer
      dark
      color="#2C2C2C"
      height="400"
      padless
      class="mt-10"
    >
    <v-row>
      <v-col cols="12">
    <h2>AdaLink</h2>
    <hr>   </v-col>
    </v-row>
   
      <span>
        &copy; {{ new Date().getFullYear() }}
        <span v-if="$store.state.auth!=''">
          &nbsp;|&nbsp;
          {{ $store.state.userName }}
         </span>
      </span>
    </v-footer> -->
  </v-app>
</template>

<script>
import ShowLogin from "../components/login/ShowLogin.vue";
import ShowRegister from "../components/register/ShowRegister.vue";

export default {
  components: { ShowLogin, ShowRegister },
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
      menus: [],
      navBelowFold: false,
      show: {
        login: false,
        register: false,
      },
    };
  },

  methods: {
    home() {
      this.$router.push("/");
    },
    goToDashboard() {
      this.$router.push("/member/dashboard");
    },
    toTheTop(){
      this.$vuetify.goTo(0)
    },
    showDrawer() {
      if (this.drawer) {
        this.drawerMini = !this.drawerMini;
        return;
      }

      this.drawer = true;
      this.drawerMini = false;
    },
    handleScroll: function (event) {
      let headerHeight =
        document.querySelector(".sectionHeader").offsetHeight - 50;

      if (window.pageYOffset > headerHeight) {
        this.navBelowFold = true;
      } else {
        this.navBelowFold = false;
      }
    },
  },

  mounted() {
    this.show.login = this.$route.query.showLogin;
  },
};
</script>

<style>
body {
  font-family: Helvetica;
  font-size: 12px;
  font-weight: normal;
}

h1 {
  font-weight: normal;
  font-size: 1.5em;
}

h2,
h3,
h4 {
  font-weight: normal;
}
.v-breadcrumbs li {
  font-size: 9px;
}
.inputLink > .v-input__control > .v-input__slot {
  background: white !important;
  height: 60px;
}
.v-input__append-inner {
  margin-top: 0px !important;
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
  font-size: 1em;
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
.headFooter {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.footerLink {
  display: block;
  line-height: 2em;
  font-size: 15px;
}
.footerContent {
  margin-bottom: 100px;
}
.desktopVersion {
  display: flex;
}
.mobileVersion {
  display: none;
}
.centerImg {
  margin: 0 auto;
}
.sectionHeader {
  background-image: url("~static/adalink-bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.mainHeader {
  font-size: 86px;
  font-weight: bold;
  margin-top: 90px;
}
.subHeader {
  font-size: 30px;
  color: white;
}
.inputLink > .v-input__control > .v-input__slot {
  background: white !important;
  height: 60px;
}
#linkPendekin {
  position: absolute;
  top: 33%;
  color: white;
  font-size: 20px;
  left: 30%;
}
.v-input__append-inner {
  margin-top: 0px !important;
}
.main_input_append {
  position: relative;
  width: 200px;
  text-align: center;
  height: 60px;
  background: #eeb71f;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  right: -24px;
  cursor: pointer;
}
.parentLink {
  width: 60%;
  margin: 0 auto;
}
.mini_desc {
  width: 60% !important;
  margin: 0 auto;
  color: white;
  font-size: 14px;
}


@media only screen and (max-width: 600px) {
  .desktopVersion {
    display: none;
  }
  .mobileVersion {
    display: flex;
  }
  .headFooter {
    font-size: 16px;
  }
  .footerLink {
    font-size: 14px;
  }
  .footerContent {
    padding-left: 10px;
    padding-right: 10px;
  }
  .mainHeader {
    font-size: 45px;
  }
  .subHeader {
    font-size: 21px;
  }

  .main_input_append {
    width: 110px;
  }
  #linkPendekin {
    font-size: 18px;
    left: 17%;
  }
  .parentLink {
    width: 80%;
  }
}
</style>
