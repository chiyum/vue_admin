<template>
  <div class="tab">
    <div class="form-row">
      <normal-card custom-class="form-card" :title="t('pages.form.all.normal')">
        <p class="mb-4">
          {{ t("pages.form.tab.text.1") }}
        </p>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </normal-card>
      <normal-card custom-class="form-card" :title="t('pages.form.all.base')">
        <p class="mt-4">
          {{ t("pages.form.tab.text.2") }}
        </p>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>

        <q-separator />

        {{ tab }}
      </normal-card>
    </div>
  </div>
</template>
<script setup>
import normalCard from "@/widgets/ui/normal-card.vue";
import { useI18n } from "@/services/i18n-service.js";
const { t } = useI18n();
const tab = ref("mails");
</script>

<style scoped lang="scss">
@import "@/assets/scss/form.scss";
</style>
