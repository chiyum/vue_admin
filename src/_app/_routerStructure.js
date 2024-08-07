function findPath(arr, targetPath) {
  for (const obj of arr) {
    if (obj.path === targetPath) {
      return obj;
    }

    if (obj.children) {
      const result = findPath(obj.children, targetPath);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

/** 動態路由處理 */
function removeAfterColon(path) {
  // 分割路徑
  const segments = path.split("/");
  const processedSegments = segments.map((segment) => {
    // 只保留第一個:pathMatch(.*)*前的部分
    return segment.includes(":pathMatch(.*)*") ? "" : segment;
  });
  // 重新組合路徑
  return processedSegments.filter((segment) => segment !== "").join("/");
}
/** 排序 */
function sortRoutes(routes) {
  routes.sort((a, b) => {
    // 首先檢查 sidebarSort
    const sortA = a.meta?.sidebarSort;
    const sortB = b.meta?.sidebarSort;

    if (sortA !== null && sortB !== null) {
      return sortA - sortB; // 較小的 sidebarSort 值排在前面
    }
    if (sortA !== null) return -1; // 如果只有 a 有 sidebarSort，a 排在前面
    if (sortB !== null) return 1; // 如果只有 b 有 sidebarSort，b 排在前面

    // 如果 sidebarSort 都為 null，則檢查 children
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;

    // 如果以上條件都不滿足，保持原有順序
    return 0;
  });

  // 遞歸排序子路由
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      route.children = sortRoutes(route.children);
    }
  });

  return routes;
}

export function createSidebarStructure(modules) {
  const sidebar = []; // 最後返回陣列
  const pathMap = {}; // 當前路徑對應的物件
  const needHandleDynamic = []; // 需要處理的動態路由

  modules.forEach((module) => {
    const parts = module.name.split("/").filter(Boolean);
    const i18nParts = module.meta.i18nRoute.split("/").filter(Boolean);
    let current = sidebar;
    let fullPath = "";

    if (module.meta.isHideSidebar) return;

    /**
     * 邏輯說明
     * @dese 待說明...
     */
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      fullPath += "/" + part;

      const endsWithUnderscore = part.endsWith("_");
      const isDynamic = part.startsWith(":pathMatch(.*)*");

      // 如果路徑以下劃線結尾，跳過整個路徑
      if (endsWithUnderscore) {
        return;
      }

      /**
       * @todo
       * 待優化，目前這樣寫會是硬解，效能不好。
       * 後續可以考慮用遞迴的方式處理
       */
      if (isDynamic) {
        // const originPath = fullPath;
        const parentPath = `/${parts.slice(0, i - 1).join("/")}`;
        const removeDynamicPath = `/${removeAfterColon(fullPath)}`;
        fullPath = `${removeDynamicPath}/default`;
        const newItem = {
          path: fullPath,
          name: fullPath,
          i18nName: module.meta.i18nName || `nav.${i18nParts[i]}`,
          contentLevel: isDynamic ? i : i + 1, // 如果是動態路由，contentLevel 不增加
          meta: module.meta,
        };
        pathMap[fullPath] = newItem;
        const dynamicFormat = {
          parentPath,
          removeDynamicPath,
          item: newItem,
        };
        needHandleDynamic.push(dynamicFormat);
        break;
      }
      // /** isDynamic不會執行到這 */
      // if (fullPath === "/routeexample/params/out/:pathMatch(.*)*") {
      //   console.log({ ...pathMap }, "pathMap");
      // }
      if (!pathMap[fullPath]) {
        const defaultI18nName = `nav.${i18nParts[i]}`;
        const newItem = {
          path: fullPath,
          name: fullPath,
          i18nName: module.meta.i18nName || defaultI18nName,
          contentLevel: isDynamic ? i : i + 1, // 如果是動態路由，contentLevel 不增加
          meta: module.meta,
        };

        if (!current) current = [];
        current.push(newItem);
        pathMap[fullPath] = newItem;

        /** 若有子層則i18n不使用meta */
        if (i < parts.length - 1) {
          newItem.children = [];
          newItem.i18nName = defaultI18nName;
          current = newItem.children;
        }
      } else {
        /** 替下一層新增children */
        current =
          pathMap[fullPath].children || (pathMap[fullPath].children = []);
      }
    }
  });

  function cleanupChildren(items) {
    items.forEach((item) => {
      if (item.children && item.children.length === 0) {
        delete item.children;
      } else if (item.children) {
        cleanupChildren(item.children);
      }
    });
  }

  cleanupChildren(sidebar);
  needHandleDynamic.forEach(({ parentPath, item, removeDynamicPath }) => {
    const parent = findPath(sidebar, parentPath);
    if (parent && parent.children) {
      parent.children.forEach((child) => {
        if (child.path === removeDynamicPath) {
          Object.keys(child).forEach((key) => {
            child[key] = item[key];
          });
        }
      });
    }
  });
  return sortRoutes(sidebar);
}

export default createSidebarStructure;
