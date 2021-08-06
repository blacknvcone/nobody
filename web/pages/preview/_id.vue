<template>
  <v-container fluid style="max-width:96%; margin-top:70px;">
    <v-col class="md-auto">
      <v-card style="border-radius:15px" elevation="3" class="d-flex justify-center">
        <div style="text-align:center" class="my-15">
          <v-row justify="center" class="mb-3">
            <v-img
              alt="Adalink Logo"
              max-width="150"
              contain
              :src="require('@/static/adalink-black.png')"
            />
          </v-row>
            
          <h1 class="mb-3 py-3 font-weight-black" style="font-size:20px">Anda Akan Menuju Halaman</h1>

          <v-row justify="center">
            <v-text-field
              v-model="stringLink"
              outlined
              dense
              class="text-input-blue"
              style="max-width:313px" />
          </v-row>

            <h1 class="mb-3 pt-5 font-weight-black" style="font-size:17px">Preview Link Anda</h1>
            <template v-if="!previewIsLoaded">
              ... no preview available ...
            </template>
            <template v-else>
              <v-card style="border-radius:10px; text-align:left; font-size:17px" max-width="476px" class="mx-auto">
                <div class="py-5 px-16">
                  <v-card-text>
                    <div class="py-3">
                      <p class="font-weight-black text-primary mb-0">
                        Title
                      </p>
                      <div class="text--primary">
                        {{ linkDetails.Title }}
                      </div>
                    </div>
                    <div class="py-3">
                      <p class="font-weight-black text-primary mb-0">
                        Description
                      </p>
                      <div class="text-h7 text--primary">
                        {{ linkDetails.Description }}
                      </div>
                    </div>
                    <div class="py-3">
                      <p class="font-weight-black text-primary mb-0">
                        Keyword
                      </p>
                      <div class="text--primary">
                        {{ stringKeywords }}
                      </div>
                    </div>
                  </v-card-text>
                </div>
              </v-card>
            </template>
        </div>
      </v-card>
    </v-col>

    <v-footer fixed padless color="blue white--text" style="font-size:20px" class="py-5">
      <v-col
        class="text-center"
        cols="12"
      >
        Anda akan otomatis diredirect dalam <span class="font-weight-black">{{ timerCount }}</span> Detik
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>

export default {
  name: "Preview",
  layout: "landing",
  data () {
    return {
      timerCount:4,
      linkDetails: {},
      stringKeywords: '',
      stringLink: '',
      stringUrl: '',
      previewIsLoaded: false
    }
  },

  mounted () {
   this.getLink()
  },

  methods: {
    getLink () {
      let id = this.$route.params.id
      this.$axios.post('/api/link/get', [id]).
      then(r => {
        this.linkDetails = r.data
        this.stringUrl = this.linkDetails.URI
        this.stringLink = this.linkDetails.FormattedLink
        this.stringKeywords ='';
        if(this.linkDetails.Tags){
          this.stringKeywords = this.linkDetails.Tags.toString().replaceAll(',', ', ')
        }
        if ((this.linkDetails.Title !== null && this.linkDetails.Title !== '') &&
            (this.linkDetails.Description !== null && this.linkDetails.Description !== '') &&
            (this.stringKeywords !== null && this.stringKeywords !== '')) {
          this.previewIsLoaded = true
        }
      }, e => {
        this.$tool.error(e);
      })
    },
  },

  watch: {
    timerCount: {
      handler(value) {

        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
            if (this.timerCount == 0) {
              window.location.href = this.stringUrl;
            }
          }, 1000);
        }

      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  }
}
</script>

<style>
.text-input-blue .v-text-field__slot input {
   color: #00f !important;
   text-align: center;
   font-size:19px;
}
</style>