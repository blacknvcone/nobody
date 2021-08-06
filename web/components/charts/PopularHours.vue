<template>
  <div>
      <div v-if="showChartPopularHour">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="popularHourOptions.options"
      :series="popularHourOptions.series"
    ></apexchart>
      </div>
       <div v-if="!showChartPopularHour" align="middle">
            <h2>Loading Most Browser Click</h2>
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
  name: "popularHours",
  props: {
    popularHourOptions: { type: Object },
    showChartPopularHour: {type: Boolean, default: false}
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