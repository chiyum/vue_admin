import routerStructure from "./_routerStructure";
const files = import.meta.glob("../pages/**/*.vue");
const defaults = import.meta.glob("../pages/**/*.vue", { eager: true });
const modules = [];

for (let path in files) {
  /* 抓取路由 */
  const name = path.replace("../pages", "").toLowerCase().replace(".vue", "");
  const i18Route = path
    .replace("../pages", "")
    .replace(".vue", "")
    .replace(/\/index$/, "")
    .replace(/(\w+)_([^/]+)(?=\/|$)/g, (match, p1) => {
      return `${p1}/:pathMatch(.*)*`;
    });
  let currentPath = name;

  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");

  /* 處理動態路由 :pathMatch(.*)*為支援多個動態路由 exmaple: page/params1/params2  */
  currentPath = currentPath.replace(/(\w+)_([^/]+)(?=\/|$)/g, (match, p1) => {
    return `${p1}/:pathMatch(.*)*`;
  });

  /* 上傳路由 */
  const customOption = defaults[path].default?.customOptions ?? {};
  /** meta */
  const meta = Object.keys(customOption).reduce((finalMeta, key) => {
    return { ...finalMeta, [key]: customOption[key] };
  }, {});

  modules.push({
    path: currentPath.replace(/_$/, ""), // 路由
    name: currentPath, // 路由名稱
    meta: {
      // 頁面layout
      layout: defaults[path].default.layout || "layout-default",
      // 是否要顯示在左側導航欄
      isHideSidebar: defaults[path].default.isHideSidebar || false,
      sidebarSort: defaults[path].default.sidebarSort || null, // 左側導航欄排序
      i18nName: defaults[path].default.i18nName || null, // i18n用名稱
      sidebarIcon: defaults[path].default.sidebarIcon || null, // 左側導航欄icon
      i18nRoute: i18Route, // navBar用路由
      // 其他設定檔
      ...meta,
    },
    component: files[path], //頁面component
  });
}

export const drawerRouters = routerStructure(modules);

export default modules;
