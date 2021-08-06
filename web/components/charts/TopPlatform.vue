<template>
  <div>
      <div v-if="showChartMostPlatform">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="platformOptions.options"
      :series="platformOptions.series"
    ></apexchart>
      </div>
       <div v-if="!showChartMostPlatform" align="middle">
            <h2>Loading Most Platform Chart</h2>
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
  name: "Platforms",
  props: {
    platformOptions: { type: Object },
    showChartMostPlatform: {type: Boolean, default: false}
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