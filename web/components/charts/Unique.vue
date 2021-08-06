<template>
  <div>
      <div v-if="showChartUnique">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="uniqueOptions.options"
      :series="uniqueOptions.series"
    ></apexchart>
      </div>
      <div v-if="!showChartUnique" align="middle">
            <h2>Loading Chart Unique Visitor</h2>
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
    uniqueOptions: { type: Object },
    showChartUnique: {type: Boolean, default: false}
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