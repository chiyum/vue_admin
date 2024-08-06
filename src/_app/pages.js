import routerStructure from "./_routerStructure";
const files = import.meta.glob("../pages/**/*.vue");
const defaults = import.meta.glob("../pages/**/*.vue", { eager: true });
const modules = [];

for (let path in files) {
  /* 抓取路由 */
  const name = path.replace("../pages", "").toLowerCase().replace(".vue", "");
  let currentPath = name;

  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");

  /* 處理動態路由 */
  currentPath = currentPath.replace(
    /(\w+)_([^/]+)(?=\/|$)/g,
    (match, p1, p2) => {
      return `${p1}/:${p2}`;
    }
  );

  /* 上傳路由 */
  const customOption = defaults[path].default?.customOptions ?? {};
  const meta = Object.keys(customOption).reduce((finalMeta, key) => {
    return { ...finalMeta, [key]: key, value: customOption[key] };
  }, {});

  modules.push({
    path: currentPath, // 路由
    name: currentPath, // 路由名稱
    meta: {
      // 頁面layout
      layout: defaults[path].default.layout || "layout-default",
      // 是否要顯示在左側導航欄
      isHideSidebar: defaults[path].default.isHideSidebar || false,
      sidebarSort: defaults[path].default.sidebarSort || null, // 左側導航欄排序
      i18Name: defaults[path].default.i18Name || null, // i18n用名稱
      // 其他設定檔
      ...meta,
    },
    component: files[path], //頁面component
  });
}

export const drawerRouters = routerStructure(modules);

export default modules;
