<template>
  <div class="illustrate-normal-form">
    <normal-form v-model="buttonIllustrate" />
    <ul class="illustrate-normal-form-ul">
      <li v-for="[key, value] in Object.entries(buttonIllustrate)" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import normalForm from "@/widgets/action/normal-form.vue";

const buttonIllustrate = ref({
  typeBar1: {
    isTypeBar: true,
    typeBarText: "nav.setting.habit", // 給i18n參數會動帶入 若給字串語系切換會失效
  },
  // input類型
  content1: {
    isTypeBar: false,
    label: "nav.setting.habit.float.info",
    contentType: "input", // radio, toggle, input, select 目前只支援這四個
    inputType: "text",
    value: "",
    // 如果有其他的props需要傳入input
    otherProps: {
      style: "min-width: 150px",
    },
  },
  // toggle類型
  "content1-2": {
    isTypeBar: false,
    label: "nav.setting.habit.float.info",
    contentType: "toggle",
    value: false,
    otherProps: {},
  },
  // radio類型
  "content1-3": {
    isTypeBar: false,
    label: "nav.setting.habit.float.info",
    contentType: "radio",
    value: "red",
    options: [
      { label: "Red", value: "red" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
    ],
    otherProps: {},
  },
  // select類型
  "content1-4": {
    isTypeBar: false,
    label: "nav.setting.habit.float.info",
    contentType: "select",
    options: [
      { label: "global.MemberManagement", value: "member" },
      { label: "global.NotifyManagement", value: "notify" },
      { label: "global.RebateManagement", value: "rebate" },
    ],
    value: "",
    otherProps: {
      style: "min-width: 150px",
    },
  },
  typeBar2: {
    isTypeBar: true,
    typeBarText: "nav.setting.habit",
  },
  content2: {
    isTypeBar: false,
    label: "nav.setting.habit.float.info",
    contentType: "toggle",
    otherProps: {},
  },
});
</script>
<style scoped lang="scss">
.illustrate-normal-form {
  &-ul {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
