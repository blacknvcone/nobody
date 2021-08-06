<template>
  <div>
      <div v-if="showChartMostBrowser">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="browserOptions.options"
      :series="browserOptions.series"
    ></apexchart>
      </div>
       <div v-if="!showChartMostBrowser" align="middle">
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
  name: "Browsers",
  props: {
    browserOptions: { type: Object },
    showChartMostBrowser: {type: Boolean, default: false}
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