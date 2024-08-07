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
  // layout: "layout-default", // 對應的layout 預設layout-default
  // isHideSidebar: true, // 是否在slidebar隱藏 預設false
  sidebarSort: 1, // sidebar排序 預設自動排序 從1開始
  sidebarIcon: "home", // sidebar icon 若無則也有預設值
  /** 自定義傳參數選項 */
  customOptions: {
    somethgin: "hello world",
  },
});

import { useI18n } from "@/services/i18n-service";
const { t } = useI18n();
const helloWorld = ref("Hello, World!");
</script>
