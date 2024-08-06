<template>
  <div>
    {{ t("pages.home.nav.home") }}
    {{ helloWorld }}
    <q-icon name="lock"></q-icon>
  </div>
</template>
<script setup>
import { defineOptions } from "vue";
defineOptions({
  layout: "layout-default",
  isHideSidebar: false,
  sidebarSort: 1,
  customOptions: {
    icon: "home",
  },
});

import { useI18n } from "@/services/i18n-service";
const { t } = useI18n();
const helloWorld = ref("Hello, World!");
</script>
