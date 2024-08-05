<template>
  <div class="layout-default-header">
    <div class="layout-default-header-middle">{{ title }}</div>
  </div>
</template>

<script setup>
import { useI18n } from "@/services/i18n-service";
import { computed } from "vue";
import { useRoute } from "vue-router";

const { t } = useI18n();
// const lang = computed(() => {
//   const fullName = locale.value;
//   switch (fullName) {
//     case "en":
//       return "EN";
//     case "zh-tw":
//       return "CN";
//   }
// });
const route = useRoute();
const title = computed(() => t(route.meta.title ?? ""));
</script>
