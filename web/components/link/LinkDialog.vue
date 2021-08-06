<template>
    <v-dialog v-model="showCreate"
        transition="dialog-top-transition"
        max-width="687"
        persistent
        scrollable>
        <v-card style="border-radius:15px;" elevation="1">
            <v-card-actions class="pt-5 justify-end">
                <v-icon
                    large
                    @click.stop="showCreate=false; urlText=''; id=''; urlAlert=false; nonActivated=true; formMode='view'">
                    mdi-close
                </v-icon>
            </v-card-actions>
                    <v-card-text class="pr-3">
                        <v-card-title class="d-flex justify-center"><span class="font-weight-black" style="font-size:26px">Create a New Link</span></v-card-title>
                        <v-row class="pt-8 pb-0 mx-2"
                            align="center"
                            justify="center">
                            <v-col cols="12">
                                <span class="font-weight-black" style="font-size:16px">URL</span>
                                <v-row no-gutters>
                                    <v-text-field 
                                        outlined
                                        dense
                                        v-model="urlText"
                                        v-on:keyup.enter="createLink"
                                        v-on:click.self="urlAlert=false">
                                    </v-text-field>
                                    <v-btn @click="createLink" dark depressed color="orange" style="margin-top:1px; margin-left:5px;">Pendekin</v-btn>
                                </v-row>
                                
                                <v-alert
                                text
                                outlined
                                :value="urlAlert"
                                color="error"
                                dark
                                icon="mdi-alert"
                                transition="scale-transition"
                                >
                                    Harap masukkan URL terlebih dahulu
                                </v-alert>
                            </v-col>
                        </v-row>

                        <div
                            v-if="confirmInfo.LinkUserType == 'Unregistered'"
                            class="pa-2 mb-2"
                        >
                            <div
                            v-if="
                                confirmInfo.LinkUserType == 'Unregistered' &&
                                confirmInfo.CanEdit
                            ">
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
                            <v-col cols="12" @click="nonActivated ? urlAlert=true : urlAlert=false">
                                <link-edit
                                    :id="id"
                                    :show-title="false"
                                    :hide-submit="hideSubmit"
                                    :mode="formMode"
                                    :meta="formMeta"
                                    :key="id"
                                    :customView="true"
                                    :hideURI="true"
                                    :nonActivated="nonActivated"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import LinkEdit from "@/components/link/LinkEdit.vue";

export default {
  name: "NewLink",
  layout: "dashboard",
  components: { LinkEdit },

  data() {
    return {
      urlText: "",

      //link confirm
      // id: this.$route.params.id,
      id: '',

      confirmInfo: {},
      FormattedLink: "",
      hideSubmit: true,
      linkUserType: "unregistered",
      formMode: "",
      formMeta: "",

      urlAlert: false,
      nonActivated: true
    };
  },
  
  mounted() {
      this.linkUserType = "Owner";
      this.formMeta = "/ui/link-form-owner/formconfig";
      this.hideSubmit = false;
      this.formMode = "view";
      this.nonActivated = true;
  },

  methods: {
    createLink() {
      let self = this;
      if (self.urlText !== '') {
       self.$axios.post("/api/link/save", { URI: self.urlText }).then(
        (r) => {
            // self.$router.push("/link/confirm/" + r.data._id);
            
            self.id = r.data._id
            self.$axios.post("/api/link/confirm", self.id).then(
            (r) => {
                self.linkUserType = r.data.LinkUserType;

                if (self.linkUserType == "Administrator")
                self.formMeta = "/ui/link-form-admin/formconfig";
                else if (self.linkUserType == "Owner")
                self.formMeta = "/ui/link-form-owner/formconfig";
                else self.formMeta = "/ui/link-form-other/formconfig";

                self.hideSubmit = !r.data.CanEdit;

                const formMode = r.data.CanEdit ? "edit" : "view";
                self.formMode = formMode;
                self.confirmInfo = r.data;
            },

            (e) => {
                    self.$tool.error(e);
            });

            self.nonActivated = false; 
        },
        (e) => {
          self.$tool.error(e);
        }
      );   
      }
    },
  },

  props: {
     value: {},
  },

  computed: {
    showCreate: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    },
  }
}
</script>

<style>
.v-dialog {
    overflow-y:inherit
}
</style>