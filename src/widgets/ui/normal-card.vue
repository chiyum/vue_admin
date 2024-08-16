<template>
  <q-card class="normal-card" :class="[customClass]">
    <q-card-section class="normal-card-title">
      <slot name="title">
        <h4>{{ title }}</h4>
      </slot>
    </q-card-section>
    <!--    <q-separator />-->
    <q-card-section class="normal-card-content">
      <slot></slot>
    </q-card-section>
    <q-card-actions v-if="useAction">
      <slot name="actions">
        <q-btn
          color="primary"
          @click="onConfirm"
          outline
          :label="t('global.Confirm')"
        />
        <q-btn
          outline
          color="negative"
          @click="onCancel"
          :label="t('global.Cancel')"
        />
      </slot>
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { useI18n } from "@/services/i18n-service.js";

defineProps({
  title: String,
  customClass: {
    type: String,
    default: "",
  },
  useAction: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["confirm", "cancel"]);

const onConfirm = () => {
  emit("confirm");
};

const onCancel = () => {
  emit("cancel");
};

const { t } = useI18n();
</script>
<style lang="scss">
$padding-form: 6px;
.normal-card {
  width: 100%;
  &-title {
    padding-top: $padding-form;
    padding-bottom: $padding-form;
  }
  &-content {
    padding-top: 0;
  }
}
</style>
