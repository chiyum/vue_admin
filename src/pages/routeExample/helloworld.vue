<template>
  <div>
    <custom-tab v-model="currentTab" :initial-tabs="tabs" />
  </div>
</template>
<script setup>
import customTab from "@/widgets/action/custom-tab.vue";

const currentTab = ref("tab1");
const tabs = [
  { name: "tab1", label: "Tab 1" },
  { name: "tab2", label: "Tab 2" },
  { name: "tab3", label: "Tab 3" },
];
</script>
