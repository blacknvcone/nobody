<template>
  <v-container fluid>
    <div v-if="found">
      <h1>{{ record.Slug }}
        &nbsp;&nbsp;
        <v-btn color="primary" nuxt :to="'/link/edit/'+res.Link._id" text small v-show="res.CanEdit">
          <v-icon left>mdi-file-edit</v-icon>
          Edit
        </v-btn>
      </h1>

      <h2><a :href="res.FormattedLink" target="new">{{ res.FormattedLink }}</a></h2>
      <div style="font-size:1em">
        Created : {{ $moment(record.Created).format('DD-MMM-yyyy HH:mm Z') }} <span v-if="res.LoginID!=''">by {{ res.LoginID }}</span>, 
        last update : {{ $moment(record.LastUpdate).format('DD-MMM-yyyy HH:mm Z') }}
      </div>
      <div class="mt-5 mb-1">
        {{ record.Description }}
        <br/>
        Original link: {{ res.Link.URI }}
      </div>

      <div class="mt-5">
        <v-chip v-for="(item,idx) in record.Categories" x-small :key="'chip_cat_'+idx" class="mb-1 mr-1">{{ item }}</v-chip>
        <v-chip v-for="(item,idx) in record.Tags" x-small :key="'chip_tag_'+idx" class="mb-1 mr-1">{{ item }}</v-chip>
      </div>

     <v-row>
        <v-col>
          <k-date-range class="mt-5" v-model="dateRange" />
        </v-col>
     </v-row>
     <v-btn color="primary" @click="calcDashboard">Refresh</v-btn>

     <div v-show="loadingDashboard" class="mt-5">
       please wait while loading ...
     </div>

     <div v-show="!loadingDashboard" class="mt-5">
       <v-row>
         <v-col>
           <bar ref="byDate" :height="60" />
           <bar ref="byHour" :height="60" />
           <bar ref="byDay" :height="60" />
         </v-col>
       </v-row>
     </div>
    </div>
  </v-container>
</template>

<script>
import KDateRange from '@shared/components/k-vue/KDateRange.vue'
//import BarChart from '@shared/components/k-chart/BarChart.vue'
import { Bar } from 'vue-chartjs'

export default {
  layout : 'landing',

  components : {
    KDateRange,
    Bar
  },

  data () {
    return {
      found : false,
      res : {},
      record : {},
      loadingDashboard: false,
      dashboard : {},
      dateRange : ['','']
    }
  },

  mounted () {
    this.get()
  },

  methods : {
    get () {
      let id = this.$route.params.id
      this.$axios.post('/api/link/detail',[id]).then(r => {
        this.found = true
        this.record = r.data.Link
        this.res = r.data

        this.$nextTick(() => {
          this.calcDashboard()
        })
      }, e => {
        this.found = false
        this.record = {}
      })
    },

    calcDashboard () {
      this.loadingDashboard = true
      let id = this.$route.params.id
      this.$axios.post('/api/link/analyze', {LinkID: id, LocationID: 'Asia/Jakarta',
        FromDate: this.$moment(this.dateRange[0]), 
        ToDate: this.$moment(this.dateRange[1])
      }).
        then(r => {
          this.dashboard = r.data

          this.$refs.byDate.renderChart({
              labels: r.data.ByDate.map(x => this.$moment(x.Key).format('DD-MMM')),
              datasets: [
                {
                  label: 'Click by Date',
                  backgroundColor: '#888',
                  data: r.data.ByDate.map(x => x.Click)
                }
              ]
            },
            {
              title: { display: true, text: 'Click by Date'},
              legend : {display: false},
              scales: {
                xAxes: [{
                  ticks: {skip: true, maxTicksLimit: 20},
                  gridLines: {drawOnChartArea: false, color: "#000"},
                }],
                yAxes: [{
                  id: 'main-y-axis',
                  ticks: {stepSize: 1},
                  gridLines: {drawOnChartArea: false, color: "#000"}
                }]
              }
            })

          this.$refs.byHour.renderChart({
              labels: r.data.ByHour.map(x => x.Key),
              datasets: [
                {
                  label: 'Click by Hour',
                  backgroundColor: 'maroon',
                  data: r.data.ByHour.map(x => x.Click)
                }
              ]
            },
            {
              title: { display: true, text: 'Click by Hour'},
              legend : {display: false},
              scales: {
                xAxes: [{
                  gridLines: {drawOnChartArea: false, color: "#000"},
                }],
                yAxes: [{
                  id: 'main-y-axis',
                  gridLines: {drawOnChartArea: false, color: "#000"},
                  ticks: {
                    stepSize: 1
                  }
                }]
              }
            })

          this.$refs.byDay.renderChart({
              labels: r.data.ByDay.map(x => x.DayName),
              datasets: [
                {
                  label: 'Click by Weekday',
                  backgroundColor: 'darkgreen',
                  data: r.data.ByDay.map(x => x.Click)
                }
              ]
            },
            {
              title: { display: true, text: 'Click by Weekday'},
              legend : {display: false},
              scales: {
                xAxes: [
                  {gridLines: {drawOnChartArea: false, color: "#000"}}
                ],
                yAxes: [{
                  id: 'main-y-axis',
                  gridLines: {drawOnChartArea: false, color: "#000"},
                  ticks: {
                    stepSize: 1
                  }
                }]
              }
            })
         
          this.loadingDashboard = false
        }, e => {
          this.loadingDashboard = false
        })
    }
  }
}
</script>