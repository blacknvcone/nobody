<template>
  <div>
      <div v-if="showChartLanguage">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="languageOptions.options"
      :series="languageOptions.series"
    ></apexchart>
      </div>
      <div v-if="!showChartLanguage" align="middle">
            <h2>Loading Chart Top Language</h2>
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
  name: "TotalClick",
  props: {
    languageOptions: { type: Object },
    showChartLanguage: {type: Boolean, default: false}
  },
  data() {
    return {
     
    };
  },
  mounted() {
    // if (this.$refs.form) this.$refs.form.changeMode(this.formMode);
  },
  methods: {
   
  },
}
</script>