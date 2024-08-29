import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LANG_LIST } from "@/constants/lang";
import { useI18n } from "@/services/i18n-service";
import { useQuasar } from "quasar";
import stroageProvider from "@/services/storage-service";

export const useAppStore = defineStore("appStore", () => {
  const { provider: storage } = stroageProvider;
  /* 語系設置 */
  const { setLocale, locale } = useI18n();
  const $q = useQuasar();
  const langs = ref(LANG_LIST);
  const i18nLang = ref(locale);
  const i18nFormat = computed(() => {
    const lang = i18nLang.value;
    switch (lang) {
      case "en":
        return "es-en";
      case "zh-tw":
        return "zh-tw";
      default:
        return lang;
    }
  });

  // 改變語系
  function changeI18nLang(lang) {
    setLocale(lang);
    storage.set("locale", lang);
    i18nLang.value = lang;
  }

  /* 通知設置 */
  const notifyLength = ref(1);

  /* 系統設置 */
  const systemSetting = ref({
    // 使用設置
    habit: {
      isOpenFloatInfo: storage.get("floatInfo") ?? true, // 是否開啟漂浮資訊彈窗
      isOpenTabPage: storage.get("tabPage") ?? false, // 是否開啟分頁模式
    },
    // 色調模式 (是否啟用深色模式)
    isDark: storage.get("isDarkMode") ?? false,
    // 當前開啟的分頁
    tabPages: [],
  });

  // 載入時設定顏色模式
  $q.dark.set(systemSetting.value.isDark);
  const onToggleDarkMode = () => {
    systemSetting.value.isDark = !systemSetting.value.isDark;
    storage.set("isDarkMode", systemSetting.value.isDark);
    $q.dark.set(systemSetting.value.isDark);
  };

  // 是否開啟漂浮資訊彈窗
  const onToggleFloatInfo = (isOn) => {
    systemSetting.value.habit.isOpenFloatInfo = isOn;
    storage.set("floatInfo", systemSetting.value.habit.isOpenFloatInfo);
  };

  // 是否開啟分頁模式
  const onToggleTabPage = (isOn) => {
    systemSetting.value.habit.isOpenTabPage = isOn;
    storage.set("tabPage", systemSetting.value.habit.isOpenTabPage);
  };

  /**
   * @typedef {Object} pageData
   * @property {string} id 成員識別碼
   * @property {string} type 訂購項目
   * @property {string} count 訂購數量
   */
  const onAddTabPage = (pageData) => {
    // component 利用Name下去顯示，所以一開始加入時得先註冊
    systemSetting.value.tabPages.unshift(pageData);
  };

  const onRemoveTabPage = (pageData) => {
    systemSetting.value.tabPages = systemSetting.value.tabPages.filter(
      (item) => item.name !== pageData.name
    );
  };

  return {
    langs,
    i18nLang,
    i18nFormat,
    changeI18nLang,
    notifyLength,
    systemSetting,
    onAddTabPage,
    onRemoveTabPage,
    onToggleTabPage,
    onToggleDarkMode,
    onToggleFloatInfo,
  };
});
