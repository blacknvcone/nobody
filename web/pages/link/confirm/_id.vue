<template>
  <v-container fluid>
    <v-row class="sectionHeader">
      <v-col cols="12" class="mt-30">
        <div style="text-align: center">
          <h1 class="mainHeader" style="color: white">Siap Untuk Di Share</h1>
          <span class="subHeader"
            >Copy Link di bwah untuk share ke social media anda
          </span>
          <div class="parentLink">
            <v-text-field
              rounded
              class="inputLink"
              id="copyInput"
              :value="confirmInfo.FormattedLink"
              readonly
              @click="copyLink"
            >
              <template v-slot:default>
                <span>Test</span>
              </template>
              <template v-slot:append>
                <v-fade-transition leave-absolute>
                  <div class="main_input_append" @click="copyLink">
                    <span id="linkPendekin">Copy</span>
                  </div>
                </v-fade-transition>
              </template>
            </v-text-field>
          </div>
        </div>
        <v-card class="mx-auto" width="804" outlined>
          <div
            v-if="confirmInfo.LinkUserType == 'Unregistered'"
            class="pa-2 mb-2"
          >
            <div
              v-if="
                confirmInfo.LinkUserType == 'Unregistered' &&
                confirmInfo.CanEdit
              "
            >
              <p>
                Unfortunately because you are not a member yet, you can only
                edit metadata of this link before its edit lapse period exceeded
                <i
                  >({{
                    $moment(confirmInfo.MaxEditPeriod).format(
                      "DD-MMM-YYYY hh:mm a Z"
                    )
                  }})</i
                >, hence please use it wisely.
              </p>
              <p>
                Click here to
                <NuxtLink to="/profile/register"
                  >register as new user for free</NuxtLink
                >
                to unlock more features of adalink
                <i
                  >(i.e: edit link slug, edit public link metadata multiple
                  time, copy link, QR Code, domain branding, manage link
                  restriction and many others)</i
                >
              </p>
            </div>
            <div
              v-else-if="
                confirmInfo.LinkUserType == 'Unregistered' &&
                !confirmInfo.CanEdit
              "
            >
              <p>
                Unfortunately because you are not a member yet and this link has
                been exceeding its edit lapse period
                <i
                  >({{
                    $moment(confirmInfo.MaxEditPeriod).format(
                      "DD-MMM-YYYY hh:mm a Z"
                    )
                  }})</i
                >, you can't edit this link any longer.
              </p>
              <p>
                Click here to
                <NuxtLink to="/profile/register"
                  >register as new user for free</NuxtLink
                >
                to unlock more features of adalink
                <i
                  >(i.e: edit link slug, edit public link metadata multiple
                  time, copy link, QR Code, domain branding, manage link
                  restriction and many others)</i
                >
              </p>
            </div>
          </div>
          <v-row>
            <v-col cols="12" class="pa-3">
              <link-edit
                :id="id"
                :show-title="false"
                :hide-submit="hideSubmit"
                :mode="formMode"
                :meta="formMeta"
              />
            </v-col>
          </v-row>
        </v-card>
        <!-- <div style="margin-top:10px">
      <h1>What else can be done</h1>
      <ul class="mt-5">
        <li><NuxtLink to="/link/create">URI Shortener</NuxtLink></li>
        <li><NuxtLink to="/page/create">Create a Page</NuxtLink></li>
        <li><NuxtLink to="/link">Analyze Link</NuxtLink></li>
      </ul>
    </div>
     -->
      </v-col>
    </v-row>
    <v-row style="display:none">
      <div>
        <h1>Your new link is ready</h1>
        <p class="mt-2">
          Congratulation, your new link is ready at
          <a :href="confirmInfo.FormattedLink" target="new">{{
            confirmInfo.FormattedLink
          }}</a>
        </p>
        <p>
          Enrich your link metadata for better searching, by editing below form.
        </p>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import LinkEdit from "@/components/link/LinkEdit.vue";
export default {
  name: "LinkConfirm",
  layout: "landing",
  components: { LinkEdit },

  data() {
    return {
      id: this.$route.params.id,
      confirmInfo: {},
      FormattedLink: "",
      hideSubmit: true,
      linkUserType: "unregistered",
      formMode: "",
      formMeta: "",
    };
  },
  methods: {
    copyLink() {
      const el = document.createElement("textarea");
      el.value = this.confirmInfo.FormattedLink;
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
  },

  mounted() {
    this.$axios.post("/api/link/confirm", this.id).then(
      (r) => {
        this.linkUserType = r.data.LinkUserType;

        if (this.linkUserType == "Administrator")
          this.formMeta = "/ui/link-form-admin/formconfig";
        else if (this.linkUserType == "Owner")
          this.formMeta = "/ui/link-form-owner/formconfig";
        else this.formMeta = "/ui/link-form-other/formconfig";

        this.hideSubmit = !r.data.CanEdit;

        const formMode = r.data.CanEdit ? "edit" : "view";
        this.formMode = formMode;
        this.confirmInfo = r.data;
      },

      (e) => {
        this.$tool.error(e);
      }
    );
  },
};
</script>