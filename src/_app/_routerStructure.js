function removeAfterColon(path) {
  // 分割路径中的每一部分
  const segments = path.split("/");
  // 用于存储处理后的路径段
  const processedSegments = segments.map((segment) => {
    // 如果段中包含冒号，只保留冒号前的部分
    return segment.includes(":") ? "" : segment;
  });
  // 重新组合路径，并处理空段
  return processedSegments.filter((segment) => segment !== "").join("/");
}

export function createSidebarStructure(modules) {
  const sidebar = [];
  const pathMap = {};

  modules.forEach((module) => {
    const parts = module.path.split("/").filter(Boolean);
    let current = sidebar;
    let fullPath = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      fullPath += "/" + part;

      const endsWithUnderscore = part.endsWith("_");
      const isDynamic = part.startsWith(":");

      // 如果路徑以下劃線結尾，跳過整個路徑
      if (endsWithUnderscore) {
        return;
      }

      if (isDynamic) {
        // 如果是動態路由，使用 'default' 作為路徑的一部分
        fullPath = `${removeAfterColon(fullPath)}/default`;
        i++; // 跳過下一個部分，因為它是動態參數
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
  return sidebar;
}

export default createSidebarStructure;
