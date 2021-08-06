<template>
  <div class="ml-4">
    <k-form
      ref="form"
      :start-mode="formMode"
      :meta="meta"
      post="/api/link/save"
      source="/api/link/get"
      :sourceParm="formParm"
      :hide-default-submit="hideSubmit"
      @afterSubmit="afterSubmit"

      dense
      :customView="customView"
      outerLabelSize="16px"
      outerLabelColor="black"
      outerLabelWeight="bold"
      :hideURI="hideURI"
      :nonActivated="nonActivated"
    >
      <template v-slot:buttons>
        <slot name="buttons">
          <v-btn dark color="orange" v-if="showShare">
            <v-icon left>mdi-share</v-icon>
            Share
          </v-btn>
        </slot>
      </template>

      <template v-slot:header="item">
        <h1 class="mb-5" v-if="showTitle">{{ item.item.Slug }}</h1>
      </template>
    </k-form>
  </div>
</template>

<script>
import KForm from "@shared/components/k-vue/KFormCustom.vue";
import KInput from "@shared/components/k-vue/KInputCustom.vue";
export default {
  components: { KForm, KInput },
  name: "LinkEdit",

  props: {
    id: { type: String },
    showTitle: { type: Boolean, default: true },
    mode: { type: String, default: "" },
    meta: { type: String, default: "" },
    hideSubmit: { type: Boolean, default: false },
    showShare: { type: Boolean, default: true},
    customView: { type: Boolean, default: false},
    hideURI: { type: Boolean, default: false },
    nonActivated: { type: Boolean, default: false },
  },

  watch: {
    mode(nv) {
      if (this.$refs.form && (nv == "edit" || nv == "view"))
        this.$refs.form.changeMode(nv);
    },
  },

  data() {
    return {
      item: {},
      formMode: this.mode,
    };
  },

  mounted() {
    if (this.$refs.form) this.$refs.form.changeMode(this.formMode);
  },

  methods: {
    formParm() {
      return [this.id];
    },

    afterSubmit(item) {
      this.$tool.info("Link data has been saved succesfully");
    },
  },
};
</script>