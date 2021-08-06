<template>
  <div>
    <h1>{{ confirmInfo.FormattedLink }}</h1>
    <p>
      Enrich your link metadata for better searching, by editing below form.
    </p>
    <div v-if="confirmInfo.LinkUserType=='Unregistered'" class="pa-2 mb-2" style="background-color:#dfdfdf;">
      <div  v-if="confirmInfo.LinkUserType=='Unregistered' && confirmInfo.CanEdit">
        <p>
          Unfortunately because you are not a member yet, 
          you can only edit metadata of this link before its edit lapse period exceeded
          <i>({{ $moment(confirmInfo.MaxEditPeriod).format('DD-MMM-YYYY hh:mm a Z') }})</i>, 
          hence please use it wisely.
        </p>
        <p>
          Click here to <NuxtLink to="/profile/register">register as new user for free</NuxtLink> to unlock more features of adalink 
          <i>(i.e: edit link slug, edit public link metadata multiple time, copy link, QR Code, domain branding, manage link restriction and many others)</i>
        </p>
      </div>
      <div  v-else-if="confirmInfo.LinkUserType=='Unregistered' && !confirmInfo.CanEdit">
        <p>
          Unfortunately because you are not a member yet and this link has been exceeding its edit lapse period 
          <i>({{ $moment(confirmInfo.MaxEditPeriod).format('DD-MMM-YYYY hh:mm a Z') }})</i>, 
          you can't edit this link any longer.
        </p>
        <p>
          Click here to <NuxtLink to="/profile/register">register as new user for free</NuxtLink> to unlock more features of adalink 
          <i>(i.e: edit link slug, edit public link metadata multiple time, copy link, QR Code, domain branding, manage link restriction and many others)</i>
        </p>
      </div>
    </div>
    <link-edit :id="id" :show-title="false" :hide-submit="hideSubmit" :mode="formMode" :meta="formMeta">
      <template v-slot:buttons>
        <v-btn color="warning" @click="$router.go(-1)">Back</v-btn>
      </template>
    </link-edit>
  </div>
</template>

<script>
import LinkEdit from '@/components/link/LinkEdit.vue'
export default {
  name : 'LinkConfirm',
  layout : 'landing',
  components: { LinkEdit },
  
  data () {
    return {
      id: this.$route.params.id,
      confirmInfo: {},
      FormattedLink: '',
      hideSubmit: false,
      linkUserType: 'unregistered',
      formMode : '',
      formMeta: ''
    }
  },

  mounted () {
    this.$axios.post('/api/link/confirm', this.id).then(
      r => {
        this.linkUserType = r.data.LinkUserType

        if (this.linkUserType=='Administrator') this.formMeta = '/ui/link-form-admin/formconfig'
        else if (this.linkUserType=='Owner') this.formMeta = '/ui/link-form-owner/formconfig'
        else this.formMeta = '/ui/link-form-other/formconfig'

        this.hideSubmit = !r.data.CanEdit
       
        const formMode = r.data.CanEdit ? 'edit' : 'view'
        this.formMode = formMode
        this.confirmInfo = r.data
      },

      e => {
        this.$tool.error(e)
      }
    )
  }
}
</script>