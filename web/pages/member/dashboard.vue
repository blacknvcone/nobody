<template>
  <v-container fluid fill-height class="pt-0">
    <v-row align="center" color="white" elevation class="px-10 py-2" v-if="!mobile">
      <v-col cols="1"></v-col>
      <v-col cols="2">
        <strong>{{ totalLink }} Link</strong>
      </v-col>
      <v-col cols="6" align="center">
        <v-text-field
          label="Search"
          dense
          outlined
          v-model="keywordOuter"
          class="rounded-input"
          hide-details="auto"
        >
          <template v-slot:append>
            <v-fade-transition leave-absolute>
              <v-icon align="center" class="mt-2" medium right
                >mdi-search-web</v-icon
              >
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="primary"
          rounded
          class="float-right"
          @click.stop="showCreate = true"
        >
          Create Link
        </v-btn>
        <link-dialog v-model="showCreate"></link-dialog>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <!-- //mobile  -->
      <v-row align="center" color="white" elevation class="px-10 py-2" v-if="mobile">
      <v-col cols="2">
        <strong>{{ totalLink }} Link</strong>
      </v-col>
      <v-col cols="6" align="center">
        <v-text-field
          label="Search"
          dense
          outlined
          v-model="keywordOuter"
          class="rounded-input"
          hide-details="auto"
        >
          <template v-slot:append>
            <v-fade-transition >
              <v-icon align="center" class="" right
                >mdi-search-web</v-icon
              >
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="4">
        <v-btn
          color="primary"
          rounded
          class="float-right"
          @click.stop="showCreate = true"
        >
          Create Link
        </v-btn>
        <link-dialog v-model="showCreate"></link-dialog>
      </v-col>
    </v-row>

    <v-row class="pt-5 px-5" style="background-color: #f8f9fa">
      <v-col md="3" sm="12" class="pr-0" v-if="!hideList">
        <k-list-custom
          :show-new="false"
          :show-select="false"
          :show-delete="false"
          :show-search="false"
          :hide-action="true"
          :keywordOuter="keywordOuter"
          :refreshOuter="refreshOuter"
          selected-color="white"
          meta="/ui/admin-link/listconfig"
          source="/api/link/populatenew"
          @selectData="selectData"
          @onCountLink="parsingTotalLink"
        >
          <template v-slot:content="item">
            <div class="linkItem" @click="selectData(item.data)">
              <div class="coverTitle">
                <a
                  class="linkTitle"
                  :href="item.data.FormattedLink"
                  target="new"
                  >{{ item.data.FormattedLink }}</a
                >
              </div>
              <h3 color="#606060">{{ item.data.Title }}</h3>
              <v-row class="mt-3">
                <v-col cols="3">
                  <span>{{ formatDate(item.data.Created) }}</span>
                </v-col>
                <v-col cols="8">
                  <div class="float-right mr-7">
                    <v-btn dark x-small class="ssmall" rounded color="primary">
                      {{ item.data.ClickedCount }}
                    </v-btn>
                    Click
                  </div>
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
            </div>
          </template>
        </k-list-custom>
      </v-col>
      <v-col md="9" sm="12" class="mt-3 mobileContent" fill-height>
        <div v-if="!showChart=='loading'" align="middle">
          <v-icon medium left class="rotatedIcon"> mdi-refresh </v-icon>
          <h2>Loading Data</h2>
        </div>
        <div
          v-if="showChart"
          class="px-5"
          style="background: white; border-top-right-radius: 25px"
        >
          <div v-if="edit">
            <v-row>
              <v-col md="7">
                <v-row>
                  <v-col md="1">
                    <v-btn
                      fab
                      outlined
                      small
                      dense
                      dark
                      color="green"
                      @click="backToAnalytic()"
                      title="Back to Analytic"
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col md="11">
                    <h1 class="titleLink">
                      Edit
                      {{
                        selectedData.Title != ""
                          ? selectedData.Title
                          : selectedData.URI
                      }}
                      <!-- Berita Hari ini -->
                    </h1>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
              <link-edit
                :id="selectedData._id"
                :show-title="false"
                :hide-submit="false"
                :showShare="false"
                mode="edit"
                meta="/ui/link-form-admin/formconfig"
              />
              </v-col>
            </v-row>
          </div>
        
          <div v-if="!edit">
            <v-row v-if="!showDetail">
              <v-col md="12">
                <v-skeleton-loader
                  boilerplate
                  elevation="2"
                  type="article, actions"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
            <v-row v-if="showDetail">
              <v-col md="7" sm="12">
                <v-row>
                  <v-col cols="4"  md="1" sm="4">
                    <v-btn
                      fab
                      outlined
                      small
                      dense
                      dark
                      color="warning"
                      v-if="mobile"
                      @click="showChart = false; hideList=false;"
                      title="Back to List"
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      outlined
                      small
                      dense
                      dark
                      color="green"
                      @click="editLink(selectedData._id)"
                    >
                      <v-icon>mdi-pen</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="8" md="11" sm="8">
                    <h1 class="titleLink">
                      {{
                        selectedData.Title != ""
                          ? selectedData.Title
                          : selectedData.URI
                      }}
                      <!-- Berita Hari ini -->
                    </h1>
                    <h3 class="realUrl" v-if="selectedData.Title != ''">
                      {{ selectedData.URI }}
                    </h3>
                  </v-col>
                </v-row>
              </v-col>
              <v-col  cols="12" md="5">
                <div
                  :class="mobile ? '':'float-right'"
                  style="width: 250px"
                  justify-center
                  align="middle"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Date Range"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        v-model="tempDate"
                        :value="computedDate"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title range scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.menu.save(date);
                          selectData();
                        "
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

                  <!-- <v-icon align="left" class="" medium right
                      >mdi-calendar</v-icon
                    >
                    {{ formatDateDetail(selectedData.Created) }} -->
                </div>
              </v-col>
              <v-col md="12" cols="12">
                <v-row class="snippetLink mx-2">
                  <v-col md="4">
                    <a :href="selectedData.FormattedLink">
                      {{ selectedData.FormattedLink }}
                    </a>
                  </v-col>
                  <!-- //sementara di hide -->
                  <v-col md="6" v-if="false">
                    <v-icon medium left> mdi-share </v-icon>
                    <v-icon medium left> mdi-copy </v-icon>
                    <v-icon medium left @click="copyLink()"> mdi-link </v-icon>
                    <v-icon medium left> mdi-delete </v-icon>
                  </v-col>
                  <v-col md="8">
                    <div class="float-right pr-5">
                      <v-btn x-small class="ssmall" color="primary">
                        {{ selectedData.CountClick }}
                      </v-btn>
                      Click
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div class="chartContent">
              <v-row>
                <v-col md="12">
                  <div class="boxChart">
                    <v-row>
                      <v-col md="6">
                        <h2>
                          <b>{{ selectedData.CountClick }}</b>
                          <v-icon medium
                            >mdi-chart-timeline-variant-shimmer</v-icon
                          >
                        </h2>
                        <h3>Total Clicks</h3>
                      </v-col>
                      <v-col md="6">
                        <v-btn-toggle
                          v-model="dateType"
                          mandatory
                          color="primary"
                          dense
                          class="float-right"
                          @change="analysisChart()"
                        >
                          <v-btn value="hour"> Hours </v-btn>
                          <v-btn value="day"> Days </v-btn>
                        </v-btn-toggle>
                      </v-col>
                    </v-row>
                    <ChartTotalClick
                      :showChartTopClick="showChartTopClick"
                      :hourOptions="hourOptions"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartLanguage
                      :showChartLanguage="showChartLanguage"
                      :languageOptions="languageOptions"
                    />
                  </div>
                </v-col>

                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartCountry
                      :showChartCountry="showChartCountry"
                      :countryOptions="countryOptions"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartTopDays
                      :showChartTopDay="showChartTopDay"
                      :dayOptions="dayOptions"
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartPopularHours
                      :showChartPopularHour="showChartPopularHour"
                      :popularHourOptions="popularHourOptions"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartTopBrowser
                      :showChartMostBrowser="showChartMostBrowser"
                      :browserOptions="browserOptions"
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartTopPlatform
                      :showChartMostPlatform="showChartMostPlatform"
                      :platformOptions="platformOptions"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartUnique
                      :showChartUnique="showChartUnique"
                      :uniqueOptions="uniqueOptions"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartTopDevice
                      :showChartMostDevice="showChartMostDevice"
                      :deviceOptions="deviceOptions"
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6" xs="12">
                  <div class="boxChart">
                    <ChartTopSocial
                      :showChartMostSocial="showChartMostSocial"
                      :socialOptions="socialOptions"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
    
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ChartTotalClick from "@/components/charts/TotalClicks.vue";
import ChartTopDays from "@/components/charts/TopDays.vue";
import ChartTopPlatform from "@/components/charts/TopPlatform.vue";
import ChartTopBrowser from "@/components/charts/TopBrowser.vue";
import ChartTopDevice from "@/components/charts/TopDevice.vue";
import ChartTopSocial from "@/components/charts/TopSocial.vue";
import ChartPopularHours from "@/components/charts/PopularHours.vue";
import ChartUnique from "@/components/charts/Unique.vue";
import ChartLanguage from "@/components/charts/Language.vue";
import ChartCountry from "@/components/charts/Country.vue";

import KListCustom from "@shared/components/k-vue/KListCustom.vue";
// import KForm from "@shared/components/k-vue/KForm.vue";
import LinkEdit from "@/components/link/LinkEdit.vue";
import LinkDialog from "@/components/link/LinkDialog.vue";

export default {
  name: "Dashboard",
  components: {
    KListCustom,
    ChartTotalClick,
    ChartTopDays,
    ChartTopPlatform,
    ChartTopBrowser,
    ChartTopDevice,
    ChartTopSocial,
    ChartPopularHours,
    ChartUnique,
    ChartLanguage,
    ChartCountry,
    LinkDialog,
    LinkEdit,
  },
  data() {
    return {
      mobile: false,
      totalLink: 0,
      edit: false,
      menu: false,
      hideList: false,
      dateType: "hour",
      date: [],
      tempDate: "",
      selectedData: {},
      month: [
        "Januari",
        "Febuari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      keywordOuter: "",
      refreshOuter: false,
      firstLoader: false,
      showChart: false,
      showDetail: false,
      showChartTopClick: false,
      showChartTopDay: false,
      showChartMostDevice: false,
      showChartMostPlatform: false,
      showChartMostBrowser: false,
      showChartMostSocial: false,
      showChartPopularHour: false,
      showChartUnique: false,
      showChartLanguage: false,
      showChartCountry: false,
      analysisData: [],

      hourOptions: {},
      dayOptions: {},
      browserOptions: {},
      platformOptions: {},
      deviceOptions: {},
      socialOptions: {},
      popularHourOptions: {},
      uniequeOptions: {},
      languageOptions: {},
      countryOptions: {},

      showCreate: false,
    };
  },
  beforeDestroy() {
    if(typeof windows !== undefined){
        window.removeEventListener('resize', this.onResize, { passive: true});
    }
  },
  created(){
    console.log(this.$vuetify.breakpoint.width);
    // if(window.innerWidth<600){
    //   this.mobile = true;
    // }
  },
  computed: {
    computedDate() {
      let self = this;
      let tempDate = [];
      self.date.forEach((v) => {
        v = new Date(v);
        let dtDate =
          v.getDate() + " " + self.month[v.getMonth()] + " " + v.getFullYear();
        tempDate.push(dtDate);
      });
      self.tempDate = tempDate.join(" - ");
      return self.tempDate;
    },
  },
  mounted() {
    let self = this;
    window.addEventListener('resize', this.onResize, { passive: true});

    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let fdt = new Date(y, m, 1);
    let ldt = new Date(y, m + 1, 0);
    let firstDay =
      fdt.getFullYear() + "-" + (fdt.getMonth() + 1) + "-" + fdt.getDate();
    let lastDay =
      ldt.getFullYear() + "-" + (ldt.getMonth() + 1) + "-" + ldt.getDate();
    self.date = [firstDay, lastDay];
      setTimeout(() => {
      if(window.innerWidth<600){
        self.mobile = true;
      }else{
        document.getElementsByClassName("linkItem")[0].click();
      }
    }, 1500);
  },
  methods: {
    async backToAnalytic(){
      let self = this;
      self.edit = !self.edit;
      let paramArray = [self.selectedData._id];
      self.showDetail = false;

        await self.$axios.post("/api/link/get", paramArray).then(
          (r) => {
            self.selectedData = {
              ...self.selectedData,
              Title : r.data.Title,
              Slug : r.data.Slug,
              FormattedLink : r.data.FormattedLink,
              Description: r.data.Description,
            }
            self.showDetail = true;
            self.refreshOuter = true;
          },
          (e) => {
            self.showDetail = false;
            self.$tool.handleError(e);
          }
        );
    },
    onResize(){
      this.mobile = window.innerWidth < 600;
    },
    editLink(id) {
      let self = this;
      self.edit = !self.edit;
    },
    parsingTotalLink(value) {
      this.totalLink = value;
    },
    generateParam() {
      let self = this;
      var min = self.date.reduce(function (a, b) {
        return a < b ? a : b;
      });
      var max = self.date.reduce(function (a, b) {
        return a > b ? a : b;
      });
      const param = {
        LinkID: self.selectedData._id,
        LocationID: "Asia/Jakarta",
        FromDate: new Date(min).toISOString(),
        ToDate: new Date(max).toISOString(),
      };
      return param;
    },
    analysisChart() {
      let self = this;
      self.showChartTopClick = false;

      let dt = self.analysisData;
      //byhour
      let tempHourCategories = [];
      let tempHourSeries = [];
      let tempHourTotal = 0;
      if (self.dateType == "hour") {
        dt.ByHour.forEach((v, i) => {
          tempHourTotal += v.Click;
          let actualKey = parseInt(v.Key) + 1;
          if (actualKey < 10) {
            actualKey = "0" + actualKey;
          }
          tempHourCategories.push(actualKey.toString());
          tempHourSeries.push(v.Click);
        });
      } else if (self.dateType == "day") {
        dt.ByDay.forEach((v, i) => {
          tempHourTotal += v.Click;
          tempHourCategories.push(v.DayName);
          tempHourSeries.push(v.Click);
        });
      }
      self.selectedData.CountClick = tempHourTotal;
      self.hourOptions.options.xaxis.categories = tempHourCategories;
      self.hourOptions.series[0].data = tempHourSeries;
      setTimeout(function () {
        self.showChartTopClick = true;
      }, 500);
    },
    resetState(fromDate) {
      let self = this;
      self.firstLoader = false;
      self.showChart = 'loading';
      if (!fromDate) {
        self.showDetail = false;
      }
      self.showChartTopClick = false;
      self.showChartTopDay = false;
      self.showChartMostDevice = false;
      self.showChartMostPlatform = false;
      self.showChartMostBrowser = false;
      self.showChartPopularHour = false;
      self.showChartMostSocial = false;
      self.showChartUnique = false;
      self.showChartLanguage = false;
      self.showChartCountry = false;

      self.hourOptions = {
        options: {
          chart: {
            id: "vuechart-hour",
            toolbar: {
              show: false,
            },
          },
          title: {
            enabled: false,
            text: "",
            align: "left",
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };

      self.dayOptions = {
        options: {
          chart: {
            id: "vuechart-day",
            type: "bar",
          },
          tooltip: {
            enabled: false,
            x: {
              show: true,
              formatter: function (
                value,
                { series, seriesIndex, dataPointIndex, w }
              ) {
                return (
                  value + " " + series[seriesIndex][dataPointIndex] + " Click"
                );
              },
            },
            y: {
              show: false,
            },
          },
          title: {
            text: "Top Days",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: [],
          },
        },
        series: [
          {
            data: [],
          },
        ],
      };
      self.browserOptions = {
        options: {
          chart: {
            id: "browser-chart",
            type: "bar",
          },
          title: {
            text: "Top Browser",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };
      self.platformOptions = {
        options: {
          chart: {
            id: "Platform-chart",
            type: "bar",
          },
          title: {
            text: "Top Platform",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };
      self.deviceOptions = {
        options: {
          chart: {
            id: "device-chart",
            type: "bar",
          },
          title: {
            text: "Top Device",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };
      self.socialOptions = {
        options: {
          chart: {
            id: "social-chart",
            type: "bar",
          },
          title: {
            text: "Top Social",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };
      self.popularHourOptions = {
        options: {
          chart: {
            id: "popularhour-chart",
            type: "bar",
          },
          title: {
            text: "Most Popular Hour",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
            },
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };

      self.uniqueOptions = {
        options: {
          chart: {
            id: "unique-chart",
            type: "bar",
          },
          title: {
            text: "Click Type",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: ["Unique", "Non Unique"],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };

      self.languageOptions = {
        options: {
          chart: {
            id: "language-chart",
            type: "bar",
          },
          title: {
            text: "Top Language",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };

      self.countryOptions = {
        options: {
          chart: {
            id: "country-chart",
            type: "bar",
          },
          title: {
            text: "Top Country",
            align: "left",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            enabled: false,
          },
        },
        series: [
          {
            name: "series-1",
            data: [],
          },
        ],
      };
    },
    async selectData(item) {
      let self = this;
        // document.getElementsByClassName("mobileContent")[0].style.display= 'inline-flex';
      if(self.mobile){
        self.hideList = true;
      }
      if (item) {
        self.resetState();

        let paramArray = [item._id];

        await self.$axios.post("/api/link/get", paramArray).then(
          (r) => {
            self.selectedData = r.data;
            self.showDetail = true;
          },
          (e) => {
            self.showDetail = false;
            self.$tool.handleError(e);
          }
        );
      } else {
        self.resetState(true);
      }
      self.showChart = true;

      let paramDetail = self.generateParam();

      await self.$axios.post("/api/link/analyze", paramDetail).then(
        (r) => {
          let dt = r.data;
          self.analysisData = dt;
          //byhour
          let tempHourCategories = [];
          let tempHourSeries = [];
          let tempHourTotal = 0;
          dt.ByHour.forEach((v, i) => {
            // v.ByHour.forEach((vv,ii) => {
            tempHourTotal += v.Click;
            let actualKey = parseInt(v.Key) + 1;
            if (actualKey < 10) {
              actualKey = "0" + actualKey;
            }
            tempHourCategories.push(actualKey.toString());
            tempHourSeries.push(v.Click);
            // })
          });
          // self.hourOptions.options.title.text =
          //   tempHourTotal + " Total Click" + (tempHourTotal > 1 ? "s" : "");
          self.selectedData.CountClick = tempHourTotal;
          self.hourOptions.options.xaxis.categories = tempHourCategories;
          self.hourOptions.series[0].data = tempHourSeries;
          self.showChartTopClick = true;

          // //byDay
          // let tempDayCategories = [];
          // let tempDaySeries = [];
          // dt.ByDay.forEach((v, i) => {
          //   // v.ByDay.forEach((vv,ii) => {
          //   tempDayCategories.push(v.DayName);
          //   tempDaySeries.push(v.Click);
          //   // })
          // });
          // self.dayOptions.options.xaxis.categories = tempDayCategories;
          // self.dayOptions.series[0].data = tempDaySeries;
          // self.showChartTopDay = true;
        },

        (e) => {
          self.showChartTopClick = false;
          // self.showChartTopDay = false;

          self.$tool.handleError(e);
        }
      );

      //popularHour
      await self.$axios.post("/api/link/popularhour", paramDetail).then(
        (r) => {
          let dt = r.data;
          let tempPopularHour = [];
          let tempPopularHourdt = [];
          dt.forEach((v, i) => {
            tempPopularHour.push(v.Key);
            tempPopularHourdt.push(v.Click);
          });
          self.popularHourOptions.options.xaxis.categories = tempPopularHour;
          self.popularHourOptions.series[0].data = tempPopularHourdt;
          self.showChartPopularHour = true;
        },
        (e) => {
          self.showChartPopularHour = false;
          self.$tool.handleError(e);
        }
      );

      //browser
      await self.$axios.post("/api/link/mostbrowser", paramDetail).then(
        (r) => {
          let dt = r.data;
          let tempBrowser = [];
          let tempBrowserdt = [];
          dt.forEach((v, i) => {
            tempBrowser.push(v.Browser);
            tempBrowserdt.push(v.Count);
          });
          self.browserOptions.options.xaxis.categories = tempBrowser;
          self.browserOptions.series[0].data = tempBrowserdt;
          self.showChartMostBrowser = true;
        },
        (e) => {
          self.showChartMostBrowser = false;
          self.$tool.handleError(e);
        }
      );

      //platform
      await self.$axios.post("/api/link/mostplatform", paramDetail).then(
        (r) => {
          let dt = r.data;
          let tempplatform = [];
          let tempplatformdt = [];
          dt.forEach((v, i) => {
            tempplatform.push(v.Platform);
            tempplatformdt.push(v.Count);
          });
          self.platformOptions.options.xaxis.categories = tempplatform;
          self.platformOptions.series[0].data = tempplatformdt;
          self.showChartMostPlatform = true;
        },
        (e) => {
          self.showChartMostPlatform = false;
          self.$tool.handleError(e);
        }
      );

      //device
      await self.$axios.post("/api/link/mostdevices", paramDetail).then(
        (r) => {
          let dt = r.data;
          let tempdevice = [];
          let tempdevicedt = [];
          dt.forEach((v, i) => {
            tempdevice.push(v.Device);
            tempdevicedt.push(v.Count);
          });
          self.deviceOptions.options.xaxis.categories = tempdevice;
          self.deviceOptions.series[0].data = tempdevicedt;
          self.showChartMostDevice = true;
        },
        (e) => {
          self.showChartMostDevice = false;
          self.$tool.handleError(e);
        }
      );

      //social
      await self.$axios.post("/api/link/mostsocial", paramDetail).then(
        (r) => {
          let dt = r.data;
          let tempsocial = [];
          let tempsocialdt = [];
          dt.forEach((v, i) => {
            tempsocial.push(v.Url);
            tempsocialdt.push(v.Count);
          });
          self.socialOptions.options.xaxis.categories = tempsocial;
          self.socialOptions.series[0].data = tempsocialdt;
          self.showChartMostSocial = true;
        },
        (e) => {
          self.showChartMostSocial = false;
          self.$tool.handleError(e);
        }
      );

      //topdays
      await self.$axios.post("/api/link/topdays", paramDetail).then(
        (r) => {
          //byDay
          let dt = r.data;
          let tempDayCategories = [];
          let tempDaySeries = [];
          dt.forEach((v, i) => {
            // v.ByDay.forEach((vv,ii) => {
            tempDayCategories.push(v.DayName);
            tempDaySeries.push(v.Click);
            // })
          });
          self.dayOptions.options.xaxis.categories = tempDayCategories;
          self.dayOptions.series[0].data = tempDaySeries;
          self.showChartTopDay = true;
        },
        (e) => {
          self.showChartTopDay = false;
          self.$tool.handleError(e);
        }
      );

      //unique data
      await self.$axios.post("/api/link/uniquedata", paramDetail).then(
        (r) => {
          //byDay
          let dt = r.data;

          self.uniqueOptions.series[0].data = [dt.unique, dt.non_unique];
          self.showChartUnique = true;
        },
        (e) => {
          self.showChartUnique = false;
          self.$tool.handleError(e);
        }
      );

      //language chart
      await self.$axios.post("/api/link/mostlanguage", paramDetail).then(
        (r) => {
          //byDay
          let dt = r.data;
          let tempLanguageCategories = [];
          let tempLanguageSeries = [];
          dt.forEach((v, i) => {
            // v.ByDay.forEach((vv,ii) => {
            let lang = "";
            if (v.Language == "") {
              lang = "unknown";
            } else {
              lang = v.Language;
            }
            tempLanguageCategories.push(lang);
            tempLanguageSeries.push(v.Count);
            // })
          });
          self.languageOptions.options.xaxis.categories =
            tempLanguageCategories;
          self.languageOptions.series[0].data = tempLanguageSeries;
          self.showChartLanguage = true;
        },
        (e) => {
          self.showChartLanguage = false;
          self.$tool.handleError(e);
        }
      );

      //country
      await self.$axios.post("/api/link/mostcountry", paramDetail).then(
        (r) => {
          //byDay
          let dt = r.data;
          let tempCountryCategories = [];
          let tempCountrySeries = [];
          dt.forEach((v, i) => {
            // v.ByDay.forEach((vv,ii) => {
            let Country = "";
            if (v.Country == "") {
              Country = "unknown";
            } else {
              Country = v.Country;
            }
            tempCountryCategories.push(Country);
            tempCountrySeries.push(v.Count);
            // })
          });
          self.countryOptions.options.xaxis.categories = tempCountryCategories;
          self.countryOptions.series[0].data = tempCountrySeries;
          self.showChartCountry = true;
        },
        (e) => {
          self.showChartCountry = false;
          self.$tool.handleError(e);
        }
      );
    },

    copyLink() {
      const el = document.createElement("textarea");
      el.value = this.selectedData.FormattedLink;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      document.execCommand("copy");
      this.$tool.info("Copied");
    },

    tabChange(idx) {
      if (idx == 4) {
        this.cancelSelect();
      }
    },

    cancelSelect() {
      this.selectedData = {};
    },
    formatDate(date) {
      let current_datetime = new Date(date);
      let self = this;
      let formatted_date =
        current_datetime.getDate() +
        " " +
        self.month[current_datetime.getMonth()];
      return formatted_date;
    },
    formatDateDetail(date) {
      let current_datetime = new Date(date);
      let self = this;
      let formatted_date =
        current_datetime.getDate() +
        " " +
        self.month[current_datetime.getMonth()] +
        " " +
        current_datetime.getFullYear() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes();
      return formatted_date;
    },
  },
  watch: {
    tempDate(nv) {
      var param = this.selectedData;
      // this.selectData(param);
    },
  },
};
</script>

<style lang="scss">

.rotatedIcon {
  animation: rotation 2s infinite linear;
}
.rounded-input {
  border-radius: 25px;
}
.ssmall {
  min-width: 10px !important;
}
.linkTitle {
  font-size: 18px;
}
.coverTitle {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(80%);
}

.titleLink {
  font-size: 1.3em;
  font-weight: bold;
  display: inline-block; /* for inline elements e.g. span, strong, em etc */
  text-overflow: ellipsis;
}
.realUrl {
  color: lightgrey !important;
}
.ssmall {
  min-width: 10px;
}
.snippetLink {
  border: lightgrey solid 0.3px;
  border-radius: 25px;
  padding-left: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
}
.boxChart {
  padding: 3%;
  background: #f8f9fa;
  border-radius: 25px;
  margin-top: 14px;
}
.chartContent {
  overflow-y: auto;
  height: 550px;
  margin-top: 30px;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@media only screen and (max-width: 600px) {
 
}
</style>