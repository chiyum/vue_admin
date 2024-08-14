<template>
  <q-card style="margin-top: 1rem">
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row form-component">
          <q-input
            v-model="name"
            :label="t('pages.form.form.name')"
            :hint="t('pages.form.form.name.tip')"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || t('pages.form.form.name.error'),
            ]"
          />

          <q-input
            type="number"
            v-model="age"
            :label="t('pages.form.form.age')"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                t('pages.form.form.age.error.1'),
              (val) =>
                (val > 0 && val < 100) || t('pages.form.form.age.error.2'),
            ]"
          />
        </div>

        <q-toggle v-model="accept" :label="t('pages.form.form.accept')" />

        <div>
          <q-btn :label="t('global.Confirm')" type="submit" color="primary" />
          <q-btn
            :label="t('global.Reset')"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
  <p v-for="item in 3" :key="item" style="margin-top: 1rem">
    {{ t(`pages.form.form.text.${item}`) }}
  </p>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useI18n } from "@/services/i18n-service.js";

const { t } = useI18n();
const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(false);
const onReset = () => {
  name.value = null;
  age.value = null;
  accept.value = false;
};

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
};
</script>
<style lang="scss">
.form-component {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  gap: 1rem;
}
</style>
