<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" class="m-0">
        <v-card class="mx-auto rounded-0">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          ></v-img>

          <v-card-title>Dani Prasetya</v-card-title>
          <v-card-text>
            <div class="text-subtitle-1">
              Software Engineer / Back-end Developer
            </div>

            <div>God damn person with kidness.</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>

          <v-card-title>Education</v-card-title>
          <v-card-actions>
            <v-timeline dense class="mx-1">
              <v-timeline-item small fill-dot>
                <div>
                  <h3
                    :class="`headline text-subtitle-1 font-weight-light mb-2 blue--text`"
                  >
                    Electronic Engineering Polytechnic Institute of Surabaya
                    (EEPIS) - 2016
                  </h3>
                  <div>B.App.Sc - Computer Science</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small fill-dot>
                <div>
                  <h3
                    :class="`headline text-subtitle-1 font-weight-light mb-2 blue--text`"
                  >
                    Politeknik Negeri Jember - 2012
                  </h3>
                  <div>D3 - Associate Degree of computer science</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-actions>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Social Media</v-card-title>
          <v-card-actions>
            <v-item-group>
              <v-icon large color="green darken-2"> mdi-linkedin </v-icon>
              <v-icon large color="blue darken-2"> mdi-github </v-icon>
              <v-icon large color="purple darken-2"> mdi-instagram </v-icon>
            </v-item-group>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="9">
        <v-sheet class="pa-6">
          <h2>Nobody ...</h2>
          <v-divider class="mb-2"></v-divider>
          <body-2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </body-2>

          <h2 class="mt-4">Tech Stack</h2>
          <v-divider class="mb-2"></v-divider>
          <v-row>
            <v-col cols="6" sm="4">
              <v-img
                src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              ></v-img>
            </v-col>

            <v-col cols="6" sm="4">
              <v-img
                src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
              >
                <div class="fill-height bottom-gradient"></div>
              </v-img>
            </v-col>

            <v-col cols="6" sm="4">
              <v-img
                src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
              >
                <div class="fill-height repeating-gradient"></div>
              </v-img>
            </v-col>
          </v-row>

          <h2 class="mt-4">Experience</h2>
          <v-divider class="mb-2"></v-divider>
          <v-timeline>
            <v-timeline-item
              v-for="(year, i) in years"
              :key="i"
              :color="year.color"
              small
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold ${year.color}--text`"
                  v-text="year.year"
                ></span>
              </template>
              <div class="py-4">
                <h2
                  :class="`headline font-weight-light mb-4 ${year.color}--text`"
                >
                  Lorem ipsum
                </h2>
                <div>
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                  scaevola imperdiet nec ut, sed euismod convenire principes at.
                  Est et nobis iisque percipit, an vim zril disputando
                  voluptatibus, vix an salutandi sententiae.
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'AboutMe',
  components: {},
  layout: 'default',
  data: () => ({
    years: [
      {
        color: 'cyan',
        year: '1960',
      },
      {
        color: 'green',
        year: '1970',
      },
      {
        color: 'pink',
        year: '1980',
      },
      {
        color: 'amber',
        year: '1990',
      },
      {
        color: 'orange',
        year: '2000',
      },
    ],
  }),
}
</script>
