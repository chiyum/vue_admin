<script setup lang="ts">
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "@/services/i18n-service";

const { t } = useI18n();

defineEmits([...useDialogPluginComponent.emits]);

const {
  dialogRef,
  onDialogHide,
  onDialogOK,
  onDialogCancel,
} = useDialogPluginComponent();

const state = reactive({
  Nickname: "",
});

const inputRef = ref(null);

const errorValid = (val) => {
  const isError = val === "";
  return isError ? t("CannotEmptyStr") : true;
};

const onSubmit = () => {
  inputRef.value.validate(); // 觸發rules判斷
  /** 規則判斷 不符合就不處理 */
  if (errorValid(state.Nickname) !== true) return;
  onDialogOK();
  // request
  //   .post("/admin/changeNickName", {
  //     newNickName: state.Nickname,
  //   })
  //   .then(({ data: res }: { data: ResponseType }) => {
  //     /** 成功則關閉彈窗 */
  //     if (res.code === 0) onDialogOK();
  //   });
};
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        {{ t("ChangeNickname") }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="dialog-inputs-card">
          <div class="dialog-inputs-card-col">
            <q-input
              ref="inputRef"
              v-model="state.Nickname"
              type="text"
              square
              filled
              :label="t('Nickname')"
              style="width: 100%"
              :rules="[errorValid]"
            >
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <!-- 若點選成功則將響應式去除回傳至ok的resolve -->
        <q-btn color="primary" :label="t('Confirm')" @click="onSubmit" />
        <q-btn color="red" :label="t('Cancel')" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
