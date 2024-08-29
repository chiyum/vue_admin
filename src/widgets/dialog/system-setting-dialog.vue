<template>
  <q-dialog v-model="isShow">
    <q-card class="system-setting-dialog">
      <div>
        <div class="default-form-style">
          <div class="default-form-style-type-bar">
            {{ t("nav.setting.habit") }}
          </div>
          <div class="default-form-style-input">
            <div class="default-form-style-input-title">
              {{ t("nav.setting.habit.float.info") }}
            </div>
            <div class="default-form-style-input-content">
              <custom-toggle
                v-model="state.isOpenFloatInfo"
                :text="{
                  enabledText: t('nav.setting.habit.float.on'),
                  disabledText: t('nav.setting.habit.float.off'),
                }"
              ></custom-toggle>
            </div>
          </div>
          <div class="default-form-style-input">
            <div class="default-form-style-input-title">
              {{ t("nav.setting.habit.tab.page") }}
            </div>
            <div class="default-form-style-input-content">
              <custom-toggle
                v-model="state.isOpenTabPage"
                :text="{
                  enabledText: t('nav.setting.habit.float.on'),
                  disabledText: t('nav.setting.habit.float.off'),
                }"
              ></custom-toggle>
            </div>
          </div>
          <div class="default-form-style-input" v-if="state.isOpenTabPage">
            <div class="default-form-style-input-title">
              {{ t("nav.setting.habit.tab.page.position") }}
            </div>
            <div class="default-form-style-input-content">
              <custom-toggle
                v-model="state.tabPosition"
                :text="{
                  enabledText: t('nav.setting.habit.tab.page.position.bottom'),
                  disabledText: t('nav.setting.habit.tab.page.position.top'),
                }"
              ></custom-toggle>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
// import customDialog from "@/widgets/action/customDialog.vue";
import customToggle from "@/widgets/ui/custom-toggle.vue";
import { defineModel } from "vue";
import { useI18n } from "@/services/i18n-service.js";
import { useAppStore } from "@/store/app-store.js";

const { t } = useI18n();
const appStore = useAppStore();
const isShow = defineModel({ type: Boolean, default: false });
const state = reactive({
  isOpenFloatInfo: appStore.systemSetting.habit.isOpenFloatInfo,
  isOpenTabPage: appStore.systemSetting.habit.isOpenTabPage,
  tabPosition: appStore.systemSetting.habit.tabPosition,
});

const onToggleFloatInfo = (isOn) => {
  appStore.onToggleFloatInfo(isOn);
};

const onToggleTabPage = (isOn) => {
  appStore.onToggleTabPage(isOn);
};

const onToggleTabPosition = (isBottom) => {
  appStore.onChangeTabPosition(isBottom ? "bottom" : "top");
};

watch(
  () => state.isOpenFloatInfo,
  (boolean) => {
    onToggleFloatInfo(boolean);
  }
);

watch(
  () => state.isOpenTabPage,
  (boolean) => {
    onToggleTabPage(boolean);
  }
);

watch(
  () => state.tabPosition,
  (position) => {
    onToggleTabPosition(position);
  }
);
</script>
<style scoped lang="scss">
.system-setting-dialog {
  width: 350px;
  border-radius: 20px;
  min-height: 300px;
}
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
