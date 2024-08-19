<template>
  <div class="illustrate-normal-form">
    <q-form @submit="onSubmit" @reset="onReset">
      <normal-form v-model="formData" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <ul class="illustrate-normal-form-ul">
      <li v-for="[key, value] in Object.entries(formData)" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import normalForm from "@/widgets/action/normal-form.vue";
import { useI18n } from "@/services/i18n-service.js";
const { t } = useI18n();
const formData = ref({
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
      // 需要表單驗證的話 rules在這裡添加
      rules: [
        (val) => (val && val.length > 0) || t("pages.form.form.name.error"),
      ], // 這邊得加i18n 因為quasar的error slot有bug無法添加
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

const onSubmit = () => {
  console.log("onSubmit");
};

const onReset = () => {
  Object.entries(formData.value).forEach(([key, value]) => {
    // 如果是typeBar就不清空
    if (!value.isTypeBar) {
      switch (value.contentType) {
        case "input":
          formData.value[key].value = "";
          break;
        case "toggle":
          formData.value[key].value = false;
          break;
        case "radio":
          formData.value[key].value = "red";
          break;
        case "select":
          formData.value[key].value = "";
          break;
      }
    }
  });
};
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
