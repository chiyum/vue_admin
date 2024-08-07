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
  console.log(modules);
  const sidebar = []; // 最後返回陣列
  const pathMap = {}; // 當前路徑對應的物件

  modules.forEach((module) => {
    const parts = module.path.split("/").filter(Boolean);
    let current = sidebar;
    let fullPath = "";

    /** 路由處理 */
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      fullPath += "/" + part;

      const endsWithUnderscore = part.endsWith("_");
      const isDynamic = part.startsWith(":pathMatch(.*)*");

      // 如果路徑以下劃線結尾，跳過整個路徑
      if (endsWithUnderscore) {
        return;
      }

      if (isDynamic) {
        const parentPath = fullPath.slice(0, -part.length - 1);
        pathMap[fullPath] = pathMap[parentPath].path = `/${removeAfterColon(
          fullPath
        )}/default`;
        // 如果是動態路由，使用 'default' 作為路徑的一部分
        fullPath = `/${removeAfterColon(fullPath)}/default`;
        const newItem = {
          path: fullPath,
          name: part.charAt(0).toUpperCase() + part.slice(1),
          i18nName:
            module.meta.i18nName ||
            part.charAt(0).toUpperCase() + part.slice(1),
          contentLevel: isDynamic ? i : i + 1, // 如果是動態路由，contentLevel 不增加
          meta: module.meta,
        };
        current.push(newItem);
        i++; // 跳過下一個部分，因為它是動態參數
        continue;
      }

      if (!pathMap[fullPath]) {
        const newItem = {
          path: fullPath,
          name: part.charAt(0).toUpperCase() + part.slice(1),
          i18nName:
            module.meta.i18nName ||
            part.charAt(0).toUpperCase() + part.slice(1),
          contentLevel: isDynamic ? i : i + 1, // 如果是動態路由，contentLevel 不增加
          meta: module.meta,
        };

        if (!current) current = [];
        current.push(newItem);
        pathMap[fullPath] = newItem;

        if (i < parts.length - 1) {
          newItem.children = [];
          current = newItem.children;
        }
      } else {
        current =
          pathMap[fullPath].children || (pathMap[fullPath].children = []);
      }

      if (isDynamic) {
        break; // 如果是動態路由，處理完這一層就停止
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
  return sortRoutes(sidebar);
}

export default createSidebarStructure;
