<template>
  <div>
      <div v-if="showChartTopClick">
    <apexchart
      width="100%"
      type="bar"
      height="300px"
      :options="hourOptions.options"
      :series="hourOptions.series"
    ></apexchart>
      </div>
      <div v-if="!showChartTopClick" align="middle">
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
  name: "TotalClick",
  props: {
    hourOptions: { type: Object },
    showChartTopClick: {type: Boolean, default: false}
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