<template>
  <div>
      <div v-if="showChartCountry">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="countryOptions.options"
      :series="countryOptions.series"
    ></apexchart>
      </div>
      <div v-if="!showChartCountry" align="middle">
            <h2>Loading Chart Top Country</h2>
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
    countryOptions: { type: Object },
    showChartCountry: {type: Boolean, default: false}
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