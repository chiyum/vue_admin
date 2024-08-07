<template>
  <div>Params{{ route.params }}</div>
</template>
<script setup>
import { defineOptions } from "vue";
defineOptions({
  // isHideSidebar: true, // 需要在slidebar隱藏時
  customOptions: {
    i18nName: "nav.params.get", // 自定義sidebar名稱
  },
});
/** 路由說明 */
const route = useRoute();
</script>
