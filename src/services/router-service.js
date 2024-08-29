import { createRouter, createWebHashHistory } from "vue-router";
import createRoutes from "@/_app/routes";
import { useAppStore } from "@/store/app-store.js";

/* 設定預設導入頁面 */
const options = {
  defaultPath: "/home",
};

/* 建立router */
const router = createRouter({
  //hash模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  //掛載處理好的routes
  routes: createRoutes(options),
  scrollBehavior() {
    /** 換頁捲軸回到上方 */
    return { top: 0 };
  },
});

export const routes = createRoutes(options);
router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  if (appStore.systemSetting.habit.isOpenTabPage) {
    appStore.onAddTabPage(to);
    console.log(to);
  }
  next();
});

export default router;
