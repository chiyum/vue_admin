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
  Password: "",
  IsPwd: true,
  ConfirmPassword: "",
  IsCmPwd: true,
});

const inputRef = ref(null);
const passwordInputRef = ref(null);

const errorValid = () => {
  const isError = state.Password !== state.ConfirmPassword;
  return isError ? t("PasswordErrorMSG") : true;
};

const passwordErrorValid = (val) => {
  const isError = val === "";
  return isError ? t("CannotEmptyStr") : true;
};

const onSubmit = () => {
  inputRef.value.validate(); // 觸發rules判斷
  passwordInputRef.value.validate(); // 觸發rules判斷
  /** 規則判斷 不符合就不處理 */
  if (errorValid() !== true || passwordErrorValid(state.Password) !== true)
    return;
  onDialogOK();
  // request
  //   .post("/admin/changePassword", {
  //     newPassword: state.Password,
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
        {{ t("ResetPassword") }}
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="dialog-inputs-card">
          <div class="dialog-inputs-card-col">
            <q-input
              ref="passwordInputRef"
              v-model="state.Password"
              :type="state.IsPwd ? 'password' : 'text'"
              square
              filled
              :label="t('Password')"
              style="width: 100%"
              :rules="[passwordErrorValid]"
            >
              <template #append>
                <q-icon
                  :name="state.IsPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="state.IsPwd = !state.IsPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="dialog-inputs-card-col">
            <q-input
              ref="inputRef"
              v-model="state.ConfirmPassword"
              :type="state.IsCmPwd ? 'password' : 'text'"
              square
              filled
              :label="t('ConfirmPassword')"
              :rules="[errorValid]"
              style="width: 100%"
            >
              <template #append>
                <q-icon
                  :name="state.IsCmPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="state.IsCmPwd = !state.IsCmPwd"
                />
              </template>
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
