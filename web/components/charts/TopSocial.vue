<template>
  <div>
    <div v-if="showChartMostSocial">
      <apexchart
        width="100%"
        type="bar"
        height="300px"
        :options="socialOptions.options"
        :series="socialOptions.series"
      ></apexchart>
    </div>
    <div v-if="!showChartMostSocial" align="middle">
      <h2>Loading Most Social Chart</h2>
      <v-skeleton-loader
        boilerplate
        elevation="2"
        type="image"
      ></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
export default {
  name: "Socials",
  props: {
    socialOptions: { type: Object },
    showChartMostSocial: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  mounted() {
    // if (this.$refs.form) this.$refs.form.changeMode(this.formMode);
  },
  methods: {},
};
</script>