<template>
  <div>
    {{ t("pages.home.nav.home") }}
    {{ helloWorld }}
  </div>
</template>
<script setup>
import { useI18n } from "@/services/i18n-service";
const { t } = useI18n();
const helloWorld = ref("Hello, World!");
</script>
