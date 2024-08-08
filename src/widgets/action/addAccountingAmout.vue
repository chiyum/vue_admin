<script setup>
import { useDialogPluginComponent } from "quasar";
import { toRaw } from "vue";
import { useI18n } from "@/services/i18n-service";

const { t } = useI18n();

defineProps({
  id: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
});

defineEmits([...useDialogPluginComponent.emits]);

const {
  dialogRef,
  onDialogHide,
  onDialogOK,
  onDialogCancel,
} = useDialogPluginComponent();

const state = reactive({
  options: [
    {
      label: "global.Deposit",
      value: "Deposit",
    },
    {
      label: "global.Withdraw",
      value: "Withdraw",
    },
  ],
  selectValue: {
    label: "",
    value: "",
  },
  inputValue: "",
  memo: "",
});

const inputRef = ref(null);

const init = () => {
  state.selectValue = state.options[0];
};

const errorValid = () => {
  const isError = state.inputValue === 0 || state.inputValue === "";
  return isError ? t("global.CannotEmpty") : true;
};

const onSubmit = () => {
  inputRef.value.validate(); // 觸發rules判斷
  /** 規則判斷 不符合就不處理 */
  if (errorValid() !== true) return;
  onDialogOK(toRaw(state));
};

init();

// watch(()=> state.inputValue, (str)=> {
//     setTimeout(() => {
//         state.inputValue = extractNumbers(str);
//     }, 100);
// })
</script>
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        {{ t("global.ScoreOperation") }}:
        <q-badge color="blue"> {{ username || "empty" }} </q-badge>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-select
          v-model="state.selectValue"
          class="accounting-select"
          square
          filled
          :options="state.options"
          :label="t('global.ScoreOperation')"
        >
          <template #selected>
            {{ t(state.selectValue.label) }}
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ t(scope.opt.label) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-section>
        <q-input
          ref="inputRef"
          v-model="state.inputValue"
          :rules="[errorValid]"
          class="accounting-input"
          square
          filled
          :label="t('global.Amount')"
          mask="#####################"
        />
        <q-input
          v-model="state.memo"
          class="accounting-input"
          square
          filled
          :label="t('global.Memo')"
        />
      </q-card-section>

      <q-card-actions align="right">
        <!-- 若點選成功則將響應式去除回傳至ok的resolve -->
        <q-btn color="primary" :label="t('global.Confirm')" @click="onSubmit" />
        <q-btn
          color="red"
          :label="t('global.Cancel')"
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
