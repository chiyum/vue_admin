<template>
  <div class="other">
    <div class="global-grid global-grid-two">
      <!--  radio   -->
      <normal-card
        custom-class="form-card"
        :title="t('pages.form.other.radio')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.other.radio.text") }}
          </p>
          <p>
            <q-radio v-model="state.shape" val="line" label="Line" />
            <q-radio v-model="state.shape" val="rectangle" label="Rectangle" />
            <q-radio v-model="state.shape" val="ellipse" label="Ellipse" />
            <q-radio v-model="state.shape" val="polygon" label="Polygon" />
          </p>
          <p>
            Your selection is: <strong>{{ state.shape }}</strong>
          </p>
        </div>
      </normal-card>
      <!--  checkbox   -->
      <normal-card
        custom-class="form-card"
        :title="t('pages.form.other.checkbox')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.other.checkbox.text") }}
          </p>
          <p>
            <q-checkbox v-model="state.checkbox" />
          </p>
          <p>
            Box's boolean: <strong>{{ state.checkbox }}</strong>
          </p>
        </div>
      </normal-card>
      <!--  不同樣式checkbox   -->
      <normal-card
        custom-class="form-card"
        :title="t('pages.form.other.checkbox.style')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.other.checkbox.style.text") }}
          </p>
          <p>
            <q-checkbox
              v-model="state.checkbox"
              :label="t('pages.form.other.checkbox.style.label')"
              checked-icon="star"
              unchecked-icon="star_border"
              indeterminate-icon="help"
              color="amber"
            />
          </p>
          <p>
            Box's boolean: <strong>{{ state.checkbox }}</strong>
          </p>
        </div>
      </normal-card>
      <!--  多選checkbox    -->
      <normal-card
        custom-class="form-card"
        :title="t('pages.form.other.multiple')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.select.disable.text") }}
          </p>
          <p>
            <q-checkbox
              v-model="state.selection"
              val="teal"
              label="Teal"
              color="teal"
            />
            <q-checkbox
              v-model="state.selection"
              val="orange"
              label="Orange"
              color="orange"
            />
            <q-checkbox
              v-model="state.selection"
              val="red"
              label="Red"
              color="red"
            />
            <q-checkbox
              v-model="state.selection"
              val="cyan"
              label="Cyan"
              color="cyan"
            />
          </p>
          <p>
            The model data: <strong>{{ state.selection }}</strong>
          </p>
        </div>
      </normal-card>
      <!--  toggle    -->
      <normal-card
        custom-class="form-card"
        :title="t('pages.form.other.toggle')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.other.toggle.text") }}
          </p>
          <p>
            <q-toggle v-model="state.toggle" />

            <q-toggle v-model="state.toggle" color="green" />

            <q-toggle v-model="state.toggle" color="yellow" />

            <q-toggle v-model="state.toggle" color="red" />
          </p>
          <p>
            toggle's boolean: <strong>{{ state.toggle }}</strong>
          </p>
        </div>
      </normal-card>
      <!--  range    -->
      <normal-card
        custom-class="form-card"
        :title="t('pages.form.other.range')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.other.range.text") }}
          </p>
          <p>
            <q-range
              v-model="state.range"
              :min="0"
              :max="50"
              vertical
              label
              switch-label-side
            />
            <q-range v-model="state.range" :min="0" :max="50" color="green" />
          </p>
          <p>
            <q-badge color="secondary">
              Model: {{ state.range.min }} to {{ state.range.max }} (0 to 50)
            </q-badge>
          </p>
        </div>
      </normal-card>
      <!--  slide    -->
      <normal-card
        custom-class="form-card"
        :title="t('pages.form.other.slider')"
      >
        <div class="form-row-item">
          <p>
            {{ t("pages.form.other.slider.text") }}
          </p>
          <p>
            <q-badge color="secondary">
              Model: {{ state.standard }} (0 to 50)
            </q-badge>

            <q-slider v-model="state.standard" :min="0" :max="50" />
            <q-slider
              v-model="state.standard"
              :min="0"
              :max="50"
              color="green"
            />
          </p>
          <p>
            value: <strong>{{ state.standard }}</strong>
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
  shape: "line",
  checkbox: false,
  selection: [],
  toggle: false,
  standard: 25,
  range: {
    min: 0,
    max: 50,
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
