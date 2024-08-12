import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LANG_LIST } from "@/constants/lang";
import { useI18n } from "@/services/i18n-service";
import stroageProvider from "@/services/storage-service";

export const useAppStore = defineStore("appStore", () => {
  const { setLocale, locale } = useI18n();
  const { provider: storage } = stroageProvider;
  const notifyLenght = ref(1);
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

  function changeI18nLang(lang) {
    setLocale(lang);
    storage.set("locale", lang);
    i18nLang.value = lang;
  }

  return { langs, i18nLang, i18nFormat, changeI18nLang, notifyLenght };
});
