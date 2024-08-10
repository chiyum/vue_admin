<template>
  <div>
    <data-card
      label="Total Revenue"
      text="$ 1,000,000"
      icon="attach_money"
      btnText="View Details"
      :callback="
        () => {
          console.log('click');
        }
      "
    />
  </div>
</template>
<script setup>
import dataCard from "@/widgets/ui/data-card.vue";
import { defineOptions } from "vue";

defineOptions({
  // layout: "layout-default", // 對應的layout 預設layout-default
  // isHideSidebar: true, // 是否在slidebar隱藏 預設false
  sidebarSort: 1, // sidebar排序 預設自動排序 從1開始
  sidebarIcon: "dashboard", // sidebar icon 若無則也有預設值
  /** 自定義傳參數選項 */
  customOptions: {
    something: "hello world",
  },
});
</script>
