<script setup lang="ts">
import { useI18n } from "@/services/i18n-service";
import { defineModel } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  cardClass: {
    type: String,
    default: "",
  },
  hasAction: {
    type: Boolean,
    default: true,
  },
  customCss: {
    type: String,
    default: "",
  },
  isFullWidth: {
    type: Boolean,
    default: false,
  },
  isFullHeight: {
    type: Boolean,
    default: false,
  },
  // 權限控制是否顯示確認按鈕
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
});
const { t } = useI18n();

const emit = defineEmits(["dismiss"]);

const showCurrentDialog = defineModel({ type: Boolean, default: false });

const state = reactive({
  showCurrentDialog: props.isShow,
  isConfirm: false,
});

const clearState = () => {
  state.isConfirm = false;
};

const onConfirm = () => {
  state.isConfirm = true;
  // state.showCurrentDialog = false;
};

const onDismiss = (isInitiative = false) => {
  if (!isInitiative) {
    emit("dismiss", {
      isConfirm: false,
    });
  }
  clearState();
  showCurrentDialog.value = false;
};

const init = () => {
  showCurrentDialog.value = props.isShow;
};

init();
</script>
<template>
  <q-dialog
    ref="dialogRef"
    v-model="showCurrentDialog"
    :full-width="isFullWidth"
    :full-height="isFullHeight"
    :class="[customCss]"
    @hide="onDismiss()"
  >
    <q-card class="q-dialog-plugin cutsom-dialog" :class="cardClass">
      <q-card-section class="cutsom-dialog-title">
        <span>
          {{ title }}
        </span>
        <q-icon
          size="20px"
          name="close"
          class="cursor-pointer"
          @click="onDismiss(true)"
        ></q-icon>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-card-main">
        <!-- <div class="filter-dialog">
          <q-input v-model="state.username" class="user-interface-header-item" square filled :label="t('用戶名稱/暱稱')" />
          <DateAndTime v-model="state.startDate" :use-padding="false" />
          <DateAndTime v-model="state.endDate" :use-padding="false" />
        </div> -->
        <slot />
      </q-card-section>
      <q-card-actions v-if="hasAction" align="right">
        <slot name="actions">
          <q-btn v-close-popup color="red" :label="t('global.Cancel')" />
          <q-btn
            v-if="props.showConfirmButton"
            v-close-popup
            color="primary"
            :label="t('global.Confirm')"
            @click="onConfirm"
          />
        </slot>
        <!-- 若點選成功則將響應式去除回傳至ok的resolve -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
