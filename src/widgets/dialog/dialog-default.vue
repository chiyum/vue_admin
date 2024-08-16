<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <!--  若需要不同樣式則只需要在q-dialog內加上樣式並加入對應的確認即取消事件即可   -->
    <!--  這邊引用的是預設的卡片樣式，所以才會需要使用到slot   -->
    <dialog-style-card
      @confirm="onDialogOK"
      @cancel="onDialogCancel"
      :icon="icon"
    >
      <template #title>
        <h4>{{ title }}</h4>
      </template>
      <template #main>
        <slot>{{ messages }}</slot>
      </template>
    </dialog-style-card>
  </q-dialog>
</template>
<script setup>
import dialogStyleCard from "@/widgets/ui/dialog-style-card.vue";
import { useDialogPluginComponent } from "quasar";

defineProps({
  title: {
    type: String,
    default: "",
  },
  messages: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

defineEmits([...useDialogPluginComponent.emits]);
const {
  dialogRef, // dialog的dom
  onDialogHide, // 關閉dialog的event
  onDialogOK, // 確認dialog的event
  onDialogCancel, // 取消dialog的event
} = useDialogPluginComponent();
</script>

<style scoped lang="scss"></style>
