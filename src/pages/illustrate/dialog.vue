<template>
  <q-card>
    <q-card-section>
      <div class="illustrate-dialog">
        <h3>{{ t("pages.dialog.illustrate.title") }}</h3>
        <h4>{{ t("pages.dialog.illustrate.service.title") }}</h4>
        <p class="mb-4 whitespace-pre-wrap">
          {{ t("pages.dialog.illustrate.service.text") }}
        </p>
        <div class="global-grid global-grid-two">
          <q-btn
            color="positive"
            class="primary"
            @click="dialogIllustrate('success')"
          >
            {{ t("pages.dialog.btn.success") }}
          </q-btn>
          <q-btn
            color="negative"
            class="primary"
            @click="dialogIllustrate('warning')"
          >
            {{ t("pages.dialog.btn.warning") }}
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
// import normalCard from "@/widgets/ui/normal-card.vue";
import { useDialog } from "@/services/dialog-service.js";
import { useI18n } from "@/services/i18n-service.js";
import { useQuasar } from "quasar";

const dialog = useDialog();
const { t } = useI18n();
const $q = useQuasar();

const dialogIllustrate = (icon) => {
  const position = "center";
  dialog
    .show({
      title: "example",
      messages: "this a example dialog. lorem ipsum dolor sit amet",
      icon: icon, // has warning, error, success
    })
    .onOk(() => {
      $q.notify({
        message: "OK",
        color: "positive",
        position,
      });
    })
    .onCancel(() => {
      $q.notify({
        message: "Cancel",
        color: "negative",
        position,
      });
    });
};
</script>
<style scoped lang="scss">
.illustrate-dialog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 85vh;
}
</style>
