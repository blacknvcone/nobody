<template>
  <div>
    <div class="mx-auto">
      <v-text-field 
        outlined dense single-lines
        label="search query"
        append-icon="mdi-magnify"
        v-model="keyword"
        @click:append="resetSearch"
      />
    </div>

    <div>
      <div v-for="(record,idx) in records" :key="'link-'+idx" class="mb-3">
        <h3>
          <a :href="record.FormattedLink" target="new">{{ record.FormattedLink }}</a>
          &nbsp;
          <v-btn small text color="secondary" nuxt :to="'/link/edit/'+record._id"><v-icon left>mdi-lead-pencil</v-icon>Edit</v-btn>
        </h3>
        {{ record.Description }}
        <div style="font-size:0.8em">
          {{ record.Categories }} {{ record.Tags }}
        </div>
      </div>

      <!-- footer -->
      <div v-if="records.length > 0">
         <span v-if="skip > 0">
          <v-btn text small color="primary" @click="showPrev">
            <v-icon left>mdi-arrow-left</v-icon>
            Prev
          </v-btn>
        </span>

        Show {{ records.length }} of {{ count }}
        <span v-if="records.length <= count">
          (Part {{ (skip / pageSize) + 1 }})
        </span>
        
        <span v-if="maxCount < count">
          <v-btn text small color="primary" @click="showNext">
            Next
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </span>

      </div>
    </div>
  </div>
</template>

<script>
export default {

  name : 'LinkSearch',
  layout : 'landing',

  data () {
    return {
     keyword : '',
     records : [],
     pageSize : 10,
     skip : 0,
     count : 0
    }
  },
  
  mounted () {
    //this.search()
  },

  computed : {
    maxCount () {
      return this.skip + this.records.length
    }
  },
  
  methods : {
    resetSearch () {
      if (this.keyword.length < 3) {
        return
      } 

      this.skip = 0
      this.search()
    },

    showPrev () {
      this.skip -= this.pageSize
      this.search()
    },

    showNext () {
      this.skip += this.pageSize
      this.search()
    },

    search () {
      let parm = {Take:this.pageSize, Skip:this.skip}
      
      if (this.keyword!='') {
        const where = {Op:'$or',Items:[
          {Field:'Tags', Value:[this.keyword], Op:'$contains'},
          {Field:'Categories', Value:[this.keyword], Op:'$contains'},
          {Field:'Description', Value:[this.keyword], Op:'$contains'},
          {Field:'FormattedLink', Value:[this.keyword], Op:'$contains'}
        ]}
        parm.Where = where
      }

      this.$axios.post('/api/link/populate', parm).
        then(r => {
          this.records = r.data.data
          this.count = r.data.count
        }, e => this.$tool.error(e))
    }
  }
}
</script>