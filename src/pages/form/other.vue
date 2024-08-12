<template>
  <div class="form">
    <div class="form-row">
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.select.normal')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.select.normal.text") }}
          </p>
          <p>
            <q-select
              v-model="state.normal.selectValue"
              class="accounting-select"
              :options="state.normal.options"
              :label="t('pages.form.label')"
            >
              <template #selected>
                {{ t(state.normal.selectValue?.label) }}
              </template>
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ t(scope.opt.label) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </p>
          <p>
            {{
              t("pages.form.select.result", {
                result: t(state.normal.selectValue?.label ?? ""),
              })
            }}
          </p>
        </div>
      </normal-card>
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.select.base')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.select.base.text") }}
          </p>
          <p>
            <q-select
              v-model="state.base.selectValue"
              class="accounting-select"
              square
              filled
              :options="state.base.options"
              :label="t('pages.form.label')"
            />
          </p>
          <p>
            {{
              t("pages.form.select.result", {
                result: t(state.base.selectValue?.label ?? ""),
              })
            }}
          </p>
        </div>
      </normal-card>
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.select.slot')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.select.slot.text") }}
          </p>
          <p>
            <q-select
              color="orange"
              filled
              v-model="state.base.selectValue"
              :options="state.base.options"
              label="Label"
            >
              <template v-if="state.base.selectValue" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop.prevent="state.base.selectValue = null"
                  class="cursor-pointer"
                />
              </template>
            </q-select>
          </p>
          <p>
            {{
              t("pages.form.select.result", {
                result: t(state.base.selectValue?.label ?? ""),
              })
            }}
          </p>
        </div>
      </normal-card>
      <normal-card
        :custom-class="'form-card'"
        :title="t('pages.form.select.disable')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.select.disable.text") }}
          </p>
          <p>
            <q-select
              disable
              filled
              :label="t('pages.form.label')"
              v-model="state.base.selectValue"
              :options="state.base.options"
            />
          </p>
          <p>
            {{
              t("pages.form.select.result", {
                result: t(state.base.selectValue?.label ?? ""),
              })
            }}
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
