<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" sm="3">
        <v-card
          :loading="loading"
          class="mx-auto rounded-0"
          max-width="374"
          height="100%"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>Dani Prasetya</v-card-title>
          <v-card-text>
            <div class="text-subtitle-1">
              Software Engineer / Back-end Developer
            </div>

            <div>God damn person with kidness.</div>
          </v-card-text>

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
        <v-sheet height="100%">
          <!--  -->
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
  setup() {},
}
</script>
