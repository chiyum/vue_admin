<template>
  <div class="form">
    <div class="form-row">
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.input.normal')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.input.normal.text") }}
          </p>
          <p>
            <q-input color="purple-12" v-model="state.input" label="Label">
              <template #prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="fade" transition-hide="fade">
                    <div class="date-and-time">
                      <q-date v-model="state.input" mask="YYYY-MM-DD HH:mm" />
                    </div>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template #append>
                <q-icon
                  name="highlight_off"
                  class="cursor-pointer"
                  @click="state.input = ''"
                />
              </template>
            </q-input>
          </p>
        </div>
      </normal-card>
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.input.base')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.input.base.text") }}
          </p>
          <p>
            <q-input
              :label="t('pages.form.label')"
              v-model="state.input"
              :placeholder="t('pages.form.placeholder')"
            />
          </p>
        </div>
      </normal-card>
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.input.file')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.input.file.text") }}
          </p>
          <p>
            <q-file
              v-model="state.file"
              filled
              type="file"
              hint="Native file"
            />
          </p>
        </div>
      </normal-card>
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.input.textarea')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.input.textarea.text") }}
          </p>
          <p>
            <q-input v-model="state.input" filled type="textarea" />
          </p>
        </div>
      </normal-card>
    </div>
  </div>
</template>
<script setup>
import normalCard from "@/widgets/ui/normal-card.vue";
import { useI18n } from "@/services/i18n-service";

const { t } = useI18n();
const state = reactive({
  normal: {
    selectValue: null,
    options: [
      { label: "pages.form.select.options.label.1", value: "1" },
      { label: "pages.form.select.options.label.2", value: "2" },
      { label: "pages.form.select.options.label.3", value: "3" },
    ],
  },
  base: {
    selectValue: null,
    options: [
      { label: t("pages.form.select.options.label.1"), value: "1" },
      { label: t("pages.form.select.options.label.2"), value: "2" },
      { label: t("pages.form.select.options.label.3"), value: "3" },
    ],
  },
  input: "",
  file: "",
});
const init = () => {
  state.normal.selectValue = state.normal.options[0];
  state.base.selectValue = state.base.options[0];
};
init();
</script>
<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
