<template>
  <div>
      <div v-if="showChartTopDay">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="dayOptions.options"
      :series="dayOptions.series"
    ></apexchart>
      </div>
       <div v-if="!showChartTopDay" align="middle">
            <h2>Loading Chart Top Click</h2>
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
  name: "TopDays",
  props: {
    dayOptions: { type: Object },
    showChartTopDay: {type: Boolean, default: false}
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