<script setup lang="ts">
import { defineModel } from "vue";
//  用法: 傳入想要顯示的文字內容 及 初始boolean值
//  用途: 更新父層相對應Toggle的值(由父層指定欄位)

const props = defineProps({
  text: {
    type: Object,
    default: () => ({
      enabledText: "",
      disabledText: "",
    }),
  },
});

const { text } = toRefs(props);

const model = defineModel({ type: Boolean, default: false });

const onClick = () => {
  console.log("onClick");
  model.value = !model.value;
};

// const emit = defineEmits(["update:modelValue"]);
//
// // 給父層通知更新資料
// const emitUpdataData = (target) => {
//   emit("update:modelValue", target.checked);
// };
</script>

<template>
  <div class="basic-setting-switch">
    <label class="basic-setting-switch-label">
      <input
        :checked="model"
        class="basic-setting-switch-input"
        type="checkbox"
      />
      <span class="basic-setting-switch-input-point"> </span>
    </label>
    <span
      class="basic-setting-switch-input-text basic-setting-switch-input-text-right"
    >
      {{ text.enabledText }}
    </span>
    <span
      class="basic-setting-switch-input-text basic-setting-switch-input-text-left"
    >
      {{ text.enabledText }}
    </span>
    <div class="basic-setting-switch-control" @click="onClick"></div>
  </div>
</template>

<style lang="scss" scoped>
.basic-setting-switch {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;

  &-label {
    position: relative;
    display: inline-block;
    width: 75px;
    height: 34px;

    .basic-setting-switch-input {
      height: 0;
      width: 0;
      opacity: 0;
    }
  }

  &-input {
    &-point {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      cursor: pointer;
      border-radius: 9999px;
      background-color: #d1d5db; // Equivalent to tw-bg-gray-300
      transition: all 0.4s;
      .body--dark & {
        background-color: #363637; // Equivalent to tw-bg-gray-600
      }
      &:before {
        position: absolute;
        border-radius: 9999px;
        background-color: white;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        transition: 0.4s;
      }
    }

    &:checked + &-point {
      background-color: #3b82f6; // Equivalent to tw-bg-blue-500

      &:before {
        transform: translateX(40px);
      }
    }

    &:focus + &-point {
      box-shadow: 0 0 1px #ccc;
    }

    &-text {
      position: absolute;
      font-size: 0.75rem; // Equivalent to tw-text-xs
      font-weight: bold;
      color: white;
      top: 50%;
      transform: translateY(-55%);
      &-right {
        right: 15px;
      }
      &-left {
        left: 15px;
      }
    }
  }
  &-control {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;
    //background: red;
  }
}
</style>
