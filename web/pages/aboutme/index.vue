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
                    (EEPIS)
                  </h3>

                  <div>B.App.Sc - Computer Science</div>
                  <h4 class="text-subtitle-2">2016-2019</h4>
                </div>
              </v-timeline-item>
              <v-timeline-item small fill-dot>
                <div>
                  <h3
                    :class="`headline text-subtitle-1 font-weight-light mb-2 blue--text`"
                  >
                    Politeknik Negeri Jember
                  </h3>

                  <div>D3 - Associate Degree of computer science</div>
                  <h4 class="text-subtitle-2">2012-2015</h4>
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

      <v-col cols="12" sm="9" class="m-0">
        <v-card class="mx-auto rounded-0">
          <v-card-title class="text-h5"> Literally Nobody .. </v-card-title>
          <v-divider class="mb-2 mx-4"></v-divider>
          <v-card-text class="text-md-body-1">
            Just an ordinary person who has a family and likes to fish in his
            spare time. Experienced in software engineering for 4 years with
            several programming languages and has good knowledge of using RDBMS
            or NoSQL, and has knowledge in the field of Devops using Amazon web
            services or Google cloud platforms. Really enjoy working with groups
            and accustomed to using agile scrum. Sometimes I also like to learn
            new things that are currently trending, and also implement them.
          </v-card-text>

          <v-card-title class="text-h5"> Tech Knowledge </v-card-title>
          <v-divider class="mb-4 mx-4"></v-divider>

          <v-slide-group class="pa-4" active-class="success" show-arrows>
            <v-slide-item v-for="(x, i) in techInterest" :key="i" class="ma-4">
              <v-img
                :src="x.imgsrc"
                align="center"
                justify="center"
                max-height="100"
                max-width="150"
                contain
              ></v-img>
            </v-slide-item>
          </v-slide-group>
          <!--
          <v-row class="mx-4 mb-3">
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
          </v-row>-->

          <v-card-title class="text-h5"> Experience </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-timeline class="mx-4">
            <v-timeline-item
              v-for="(exp, i) in experience"
              :key="i"
              :color="exp.color"
              small
            >
              <template v-slot:opposite>
                <span
                  :class="`headline font-weight-bold ${exp.color}--text`"
                  v-text="exp.year"
                ></span>
              </template>
              <div class="py-4">
                <h2
                  :class="`headline font-weight-light mb-4 ${exp.color}--text`"
                >
                  {{ exp.company }}
                </h2>
                <div class="text-subtitle-1">
                  {{ exp.jobTitle }}
                </div>
                <div>
                  {{ exp.jobDescription }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
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
    techInterest: [
      {
        imgsrc: require('@/assets/go.png'),
      },
      {
        imgsrc: require('@/assets/node.png'),
      },
      {
        imgsrc: require('@/assets/mysql.png'),
      },
      {
        imgsrc: require('@/assets/laravel.png'),
      },
      {
        imgsrc: require('@/assets/kubernetes.png'),
      },
      {
        imgsrc: require('@/assets/docker.png'),
      },
    ],

    experience: [
      {
        color: 'green',
        year: '2020 - Now',
        company: 'Kano Solution',
        jobTitle: 'Software Engineer (Back-end Developer)',
        jobDescription:
          'Responsible as back end developer in internal product department. Create and maintain overall product services in the company. Sometimes have to be a technical lead at the same time .. mehhh',
      },
      {
        color: 'pink',
        year: '2019',
        company: 'Vascomm Solusi Teknologi',
        jobTitle: 'Supervisor (Back-end Developer Lead Team)',
        jobDescription:
          'Responsible for being the head of the back end developer team. Provide guidance to teammates and supervise their work progress and also make reports to the manager.',
      },
      {
        color: 'amber',
        year: '2018',
        company: 'Vascomm Solusi Teknologi',
        jobTitle: 'Junior Software Engineer (Back-end Developer)',
        jobDescription:
          'Building service apps as requested in the requirement document, Make sure the service running well and well maintained. And making well API service document. Hey... im nooobbbbbbb by the way :v',
      },
      {
        color: 'cyan',
        year: '2015',
        company: 'Politeknik Negeri Jember',
        jobTitle: 'Network Administrator',
        jobDescription:
          'Responsible for the entire infrastructure, especially in the networking section in the academic community, ensuring the overall service runs well and efficiently',
      },
    ],
  }),
}
</script>
