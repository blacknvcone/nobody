<template>
  <div>
      <div v-if="showChartMostDevice">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="deviceOptions.options"
      :series="deviceOptions.series"
    ></apexchart>
      </div>
       <div v-if="!showChartMostDevice" align="middle">
            <h2>Loading Most Device Chart</h2>
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
  name: "Devices",
  props: {
    deviceOptions: { type: Object },
    showChartMostDevice: {type: Boolean, default: false}
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