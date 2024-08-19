<template>
  <div class="default-form-style">
    <template v-for="(row, key) in list" :key="`${key}-normal-form`">
      <div class="default-form-style-type-bar" v-if="row.isTypeBar">
        {{ t(row?.typeBarText ?? "") }}
      </div>
      <div v-else class="default-form-style-input">
        <div class="default-form-style-input-title">
          {{ t(row?.label ?? "") }}
        </div>
        <div class="default-form-style-input-content">
          <custom-toggle
            v-if="row.contentType === 'toggle'"
            v-model="row.value"
            v-bind="{
              ...row.otherProps,
              text: {
                enabledText: t('nav.setting.habit.float.on'),
                disabledText: t('nav.setting.habit.float.off'),
              },
            }"
          ></custom-toggle>
          <q-select
            v-else-if="row.contentType === 'select'"
            class="accounting-select"
            v-model="row.value"
            v-bind="{
              ...row.otherProps,
              options: row.options,
              label: t(row?.label ?? ''),
            }"
          >
            <template #selected>
              {{ t(row?.value?.label ?? "") }}
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ t(scope?.opt?.label ?? "") }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            v-model="row.value"
            v-else-if="row.contentType === 'input'"
            v-bind="{
              ...row.otherProps,
              type: row.inputType,
              label: t(row?.label ?? ''),
            }"
          />
          <div
            class="default-form-radios"
            v-else-if="row.contentType === 'radio'"
          >
            <q-radio
              v-for="(option, index) in row.options"
              :key="index"
              v-model="row.value"
              v-bind="{
                ...row.otherProps,
                val: option.value,
                label: t(option.label),
              }"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
/*
 * 單純的form 排版與響應式
 * 若需要form表單驗證與submit，請自行添加rules並添加submit按鈕與使用q-form將此元件與submit按鈕包裹
 * 下方有範例用法 直接使用v-model傳入對應格式的資料即可
 */
import customToggle from "@/widgets/ui/custom-toggle.vue";
import { defineModel } from "vue";
import { useI18n } from "@/services/i18n-service.js";

const { t } = useI18n();
const list = defineModel({ type: Object, required: true });

// 範例用法 直接綁定v-model即可將兩邊響應式連接
// const example = ref({
// typeBar1: {
//   isTypeBar: true,
//     typeBarText: "nav.setting.habit", // 給i18n參數會動帶入 若給字串語系切換會失效
// },
// // input類型
// content1: {
//   isTypeBar: false,
//     label: "nav.setting.habit.float.info",
//     contentType: "input", // radio, toggle, input, select 目前只支援這四個
//     inputType: "text",
//     value: "",
//     // 如果有其他的props需要傳入input。例如style or quasar樣式
//     otherProps: {
//     style: "min-width: 150px",
//   },
// },
// // toggle類型
// "content1-2": {
//   isTypeBar: false,
//     label: "nav.setting.habit.float.info",
//     contentType: "toggle",
//     value: false,
//     otherProps: {},
// },
// // radio類型
// "content1-3": {
//   isTypeBar: false,
//     label: "nav.setting.habit.float.info",
//     contentType: "radio",
//     value: "red",
//     options: [
//     { label: "Red", value: "red" },
//     { label: "Green", value: "green" },
//     { label: "Blue", value: "blue" },
//   ],
//     otherProps: {},
// },
// // select類型
// "content1-4": {
//   isTypeBar: false,
//     label: "nav.setting.habit.float.info",
//     contentType: "select",
//     options: [
//     { label: "global.MemberManagement", value: "member" },
//     { label: "global.NotifyManagement", value: "notify" },
//     { label: "global.RebateManagement", value: "rebate" },
//   ],
//     value: "",
//     otherProps: {
//     style: "min-width: 150px",
//   },
// },
// typeBar2: {
//   isTypeBar: true,
//     typeBarText: "nav.setting.habit",
// },
// content2: {
//   isTypeBar: false,
//     label: "nav.setting.habit.float.info",
//     contentType: "toggle",
//     otherProps: {},
// },
// });
</script>

<style scoped lang="scss">
.default-form-style {
  padding: 1.5rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &-type-bar {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    min-height: 2rem;
    border-radius: 8px;
    color: #ffffff;
    background: linear-gradient(
      90deg,
      rgba(150, 150, 150, 1) 0%,
      rgba(224, 222, 222, 1) 100%
    );

    .body--dark & {
      background: linear-gradient(
        90deg,
        rgb(77 76 76) 0%,
        rgb(138 137 137) 100%
      );
    }
    //background: linear-gradient(
    //  90deg,
    //  rgba(97, 97, 97, 1) 0%,
    //  rgba(255, 255, 255, 1) 100%
    //);
  }
  &-input {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 0 0.5rem;
    &-title {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
