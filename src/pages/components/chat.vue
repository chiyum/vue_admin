<template>
  <div class="chat">
    <div>
      <h3>{{ t("pages.chat.title.1") }}</h3>
      <p>
        <chat-box />
      </p>
    </div>
    <div>
      <h3>{{ t("pages.chat.title.2") }}</h3>
      <p>
        {{ t("pages.chat.content.2") }}
        <q-btn
          push
          color="white"
          text-color="primary"
          :label="t('pages.chat.btn.2')"
          @click="onOpenChatBoxDialog"
          style="width: 200px; margin-top: 10px"
        ></q-btn>
      </p>
      <h4>{{ t("pages.chat.extension.title") }}</h4>
      <p>
        <q-list>
          <q-item v-for="item in 1" :key="item">
            <q-item-section
              class="flex align-center flex-row"
              style="justify-content: start !important"
            >
              <q-icon name="radio_button_unchecked" size="10px" class="mr-2" />
              {{ t(`pages.chat.extension.content.${item}`) }}</q-item-section
            >
          </q-item>
        </q-list>
      </p>
      <custom-dialog
        v-model="state.isChatBoxDialog"
        :has-action="false"
        :title="t('pages.chat.title.2')"
        @dismiss="onCloseDialog"
      >
        <chat-box />
      </custom-dialog>
    </div>
  </div>
</template>
<script setup>
import chatBox from "@/widgets/action/chatBox.vue";
import customDialog from "@/widgets/action/customDialog.vue";
import { useI18n } from "@/services/i18n-service";
const { t } = useI18n();
const state = reactive({
  isChatBoxDialog: false,
});
const onOpenChatBoxDialog = () => {
  state.isChatBoxDialog = true;
};
const onCloseDialog = ({ isConfirm }) => {
  console.log(isConfirm, "isConfirm");
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/chat.scss";
</style>
