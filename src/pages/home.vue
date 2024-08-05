<template>
  <div>
    {{ t("pages.home.nav.home") }}
  </div>
</template>
<script setup>
import { useI18n } from "@/services/i18n-service";
const { t } = useI18n();
</script>
