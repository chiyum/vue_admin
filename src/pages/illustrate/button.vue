<template>
  <div class="illustrate-button">
    <div class="illustrate-button-title default-type-setting-title-bar-only">
      {{ t("pages.illustrate.button.title") }}
    </div>
    <div class="illustrate-button-content">
      <p class="whitespace-pre-wrap">
        {{ t("pages.illustrate.button.content") }}
      </p>
      <p class="flex gap-10 mt-5">
        <q-btn color="white" text-color="black" label="Standard" />
        <q-btn color="primary" label="Primary" />
        <q-btn color="secondary" label="Secondary" />
        <q-btn color="amber" glossy label="Amber" />
        <q-btn color="brown-5" label="Brown 5" />
        <q-btn color="deep-orange" glossy label="Deep Orange" />
        <q-btn color="purple" label="Purple" />
        <q-btn color="black" label="Black" />
      </p>
      <p class="mt-5">
        {{ t("pages.illustrate.button.content.2") }}
      </p>
      <p class="mt-5">
        {{ t("pages.illustrate.button.content.3") }}
      </p>
      <p class="flex gap-10 mt-5">
        <q-btn color="primary" icon="mail" label="On Left" />
        <q-btn color="secondary" icon-right="mail" label="On Right" />
        <q-btn
          color="red"
          icon="mail"
          icon-right="send"
          label="On Left and Right"
        />
        <q-btn icon="phone" label="Stacked" stack glossy color="purple" />
      </p>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "@/services/i18n-service.js";

const { t } = useI18n();
</script>
<style scoped lang="scss">
.illustrate-button {
  &-title {
    font-size: 1.1rem;
    padding: 0.25rem 1rem;
  }
  &-content {
    padding: 1rem;
  }
}
</style>
