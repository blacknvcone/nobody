<template>
  <v-container fluid>
    <v-row class="sectionHeader">
      <v-col cols="12" class="mt-30">
        <div style="text-align: center">
          <h1 class="mainHeader" style="color: white">Pendekin Link</h1>
          <span class="subHeader"
            >Persingkat Domain Anda Sendiri Dengan Tool Canggih
          </span>
          <div class="parentLink">
            <v-text-field
              rounded
              class="inputLink"
              placeholder="Pendekin Link Anda disini"
              v-model="urlText"
              v-on:keyup.enter="createLink()"
            >
              <template v-slot:append>
                <v-fade-transition leave-absolute>
                  <div class="main_input_append" @click="createLink()">
                    <v-progress-circular
                      v-if="loading"
                      size="24"
                      color="info"
                      class="centerThing"
                      indeterminate
                    ></v-progress-circular>

                    <span v-else id="linkPendekin">Pendekin</span>
                  </div>
                </v-fade-transition>
              </template>
            </v-text-field>
          </div>
          <div>
            <span class="mini_desc"
              >adalink adalah Tool gratis <br />untuk mempersingkat URL dan
              mengurangi tautan<br />Gunakan Adalink untuk tautan singkat dan
              mudah diingat.</span
            >
          </div>
        </div>

        <div class="mt-10">
          <h1 style="text-align: center" class="subHeader">Link Terbaru</h1>

          <div style="text-align: center" class="mb-15 mt-10">
            <v-chip
              v-for="(l, idx) in latestLink"
              :key="'latest_link_' + idx"
              color="white"
              class="ma-1"
              @click="visit(l)"
            >
              <span v-if="l.Title != ''">
                {{ l.Title }}
              </span>
              <span v-else-if="l.Description != ''">
                {{ l.Description }}
              </span>
              <span v-else>
                {{ l.Slug }}
              </span>
            </v-chip>
          </div>
        </div>

        <!-- <div style="margin-top:10px">
      <h1>What else can be done</h1>
      <ul class="mt-5">
        <li><NuxtLink to="/link/create">URI Shortener</NuxtLink></li>
        <li><NuxtLink to="/page/create">Create a Page</NuxtLink></li>
        <li><NuxtLink to="/link">Analyze Link</NuxtLink></li>
      </ul>
    </div>
     -->
      </v-col>
    </v-row>
    <v-row class="mt-10" v-if="this.$store.state.auth == ''">
      <v-card class="mx-auto" width="644" outlined>
        <v-card-text class="cardHeader">
          Ingin Fitur Lebih? Daftar Gratis
        </v-card-text>
        <v-card-text class="cardText">
          Custom Link, Dashboard, analitik terperinci, API, pembuat UTM, QR
          Code, ekstensi browser, 50+ integrasi dan dukungan aplikasi.
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="#4E6FE0"
            rounded
            dark
            big
            class="registerButton"
            @click.stop="show.register = true"
          >
            Daftar
          </v-btn>
          <show-register v-model="show"></show-register>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="center-me">
          <span class="cardHeaderSup"> Kenapa Memilih Adalink? </span>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card width="644" outlined class="mx-auto">
          <div class="d-flex flex-column justify-space-between align-center">
            <v-img
              class="mt-10"
              width="100"
              height="100"
              :src="require('@/static/icon/thumbs-up.svg')"
            ></v-img>
            <v-card-text class="cardHeader"> Easy </v-card-text>
            <v-card-text class="cardText">
              AdaLink is easy and fast, enter the long link to get your
              shortened link
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card class="mx-auto" width="644" outlined>
          <div class="d-flex flex-column justify-space-between align-center">
            <v-img
              class="mt-10"
              width="220"
              height="100"
              :src="require('@/static/icon/link-2.svg')"
            ></v-img>
            <v-card-text class="cardHeader"> Shortened </v-card-text>
            <v-card-text class="cardText">
              ShortURL is easy and fast, enter the long link to get your
              shortened link
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card class="mx-auto" width="644" outlined>
          <div class="d-flex flex-column justify-space-between align-center">
            <v-img
              class="mt-10"
              width="100"
              height="120"
              :src="require('@/static/icon/shield.svg')"
            ></v-img>
            <v-card-text class="cardHeaderSecure"> Secure </v-card-text>
            <v-card-text class="cardText">
              AdaLink is easy and fast, enter the long link to get your
              shortened link
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card class="mx-auto" width="644" outlined>
          <div class="d-flex flex-column justify-space-between align-center">
            <v-img
              class="mt-10"
              width="100"
              height="100"
              :src="require('@/static/icon/pie-chart.svg')"
            ></v-img>
            <v-card-text class="cardHeader"> Statistic </v-card-text>
            <v-card-text class="cardText">
              ShortURL is easy and fast, enter the long link to get your
              shortened link
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ShowRegister from '../components/register/ShowRegister.vue'

export default {
  components: { ShowRegister },
  layout: 'landing',

  data() {
    return {
      urlText: '',
      latestLink: [],
      loading: false,
      show: {
        login: false,
        register: false,
      },
      isMobile: false,
    }
  },

  mounted() {
    let self = this
    setTimeout(function () {
      if (window.innerWidth < 600) {
        self.isMobile = true
      }
      self.getLatest()
    }, 500)
  },

  methods: {
    createLink() {
      this.loading = true
      this.$axios.post('/api/link/save', { URI: this.urlText }).then(
        (r) => {
          //this.getLatest()
          this.loading = false
          this.$router.push('/link/confirm/' + r.data._id)
        },
        (e) => {
          this.$tool.error(e)
        },
      )
    },

    visit(l) {
      //Redirecting into redirect service ..
      window.open(l.FormattedLink, '_blank')
    },

    getLatest() {
      let self = this
      self.$axios.post('/api/link/latest', {}).then((r) => {
        self.latestLink = r.data.map((x) => {
          if (x.Description.length > 40)
            x.Description = x.Description.substring(0, 40) + '...'
          return x
        })
        if (self.isMobile) {
          self.latestLink = self.latestLink.slice(0, 7)
        }
      })
    },
  },
}
</script>
<style scoped>
.noPad {
  padding: 0px !important;
}
.cardHeader {
  font-size: 27px;
  color: #1e1e45 im !important;
  text-align: center;
  font-weight: bold;
  margin-top: 50px;
}
.cardHeaderSup {
  font-size: 27px;
  color: #1e1e45 im !important;
  text-align: center;
  font-weight: bold;
  margin-top: 50px;
}
.cardHeaderSup:after {
  display: block;
  content: ' ';
  background-color: #4e6fe0 !important;
  width: 25px;
  height: 3px;
  margin-top: -1px;
  position: absolute;
}
.cardHeaderSecure {
  font-size: 27px;
  color: #1e1e45 im !important;
  text-align: center;
  font-weight: bold;
  margin-top: 35px;
}
.cardText {
  font-size: 17px;
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.registerButton {
  margin: 0 auto;
  width: 30%;
  margin-bottom: 50px;
}
.center-me {
  display: flex;
  justify-content: center;
}
.centerThing {
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
@media only screen and (max-width: 600px) {
  .main_input_append {
    width: 110px;
  }
  #linkPendekin {
    font-size: 18px;
    left: 17%;
  }
}
</style>
