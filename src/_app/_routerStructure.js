// export function createSidebarStructure(modules) {
//   const sidebar = [];
//   const pathMap = {};

//   // 遍歷所有模組
//   modules.forEach((module, index) => {
//     // 將路徑分割成部分，並過濾掉空字符串
//     const parts = module.path.split("/").filter(Boolean);
//     let current = sidebar;
//     let fullPath = "";

//     // 遍歷路徑的每一部分
//     parts.forEach((part, index) => {
//       fullPath += "/" + part;

//       // 如果這個路徑還沒有被處理過
//       if (!pathMap[fullPath]) {
//         // 創建新的導航項
//         const newItem = {
//           path: fullPath,
//           name: part.charAt(0).toUpperCase() + part.slice(1), // 首字母大寫
//           i18nName: part.charAt(0).toUpperCase() + part.slice(1), // 國際化名稱，這裡簡單地使用首字母大寫
//           contentLevel: index + 1, // 內容層級，從1開始
//           meta: module.meta,
//         };

//         // 如果不是最後一部分，添加 children 數組
//         if (index < parts.length - 1) {
//           newItem.children = [];
//         }

//         // 將新項添加到當前層級
//         current.push(newItem);
//         // 將新項添加到 pathMap 中，以便後續查找
//         pathMap[fullPath] = newItem;
//         // 更新 current 指向新項的 children，為下一層做準備
//         current = newItem.children;
//       } else {
//         // 如果路徑已存在，更新 current 指向已存在項的 children
//         current = pathMap[fullPath].children;
//       }
//     });
//   });

//   // 遞歸函數，用於清理沒有子項的 children 數組
//   function cleanupChildren(items) {
//     items.forEach((item) => {
//       if (item.children && item.children.length === 0) {
//         // 如果 children 是空數組，則刪除它
//         delete item.children;
//       } else if (item.children) {
//         // 如果有 children，繼續遞歸清理
//         cleanupChildren(item.children);
//       }
//     });
//   }

//   // 清理整個側邊欄結構
//   cleanupChildren(sidebar);
//   console.log(sidebar);
//   return sidebar;
// }

export function createSidebarStructure(modules) {
  const sidebar = [];
  const pathMap = {};

  // 遍歷所有模組
  modules.forEach((module) => {
    // 將路徑分割成部分，並過濾掉空字符串
    const parts = module.path.split("/").filter(Boolean);
    let current = sidebar;
    let fullPath = "";

    // 遍歷路徑的每一部分
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      fullPath += "/" + part;

      // 檢查是否是最後一部分，且以下劃線結尾
      const isLastPart = index === parts.length - 1;
      const endsWithUnderscore = part.endsWith("_");

      // 如果不是最後一部分或不以下劃線結尾，則處理這個路徑部分
      if (!isLastPart || !endsWithUnderscore) {
        // 如果這個路徑還沒有被處理過
        if (!pathMap[fullPath]) {
          // 創建新的導航項
          const newItem = {
            path: fullPath,
            name: part.charAt(0).toUpperCase() + part.slice(1), // 首字母大寫
            i18nName:
              module.meta.i18nName ||
              part.charAt(0).toUpperCase() + part.slice(1), // 國際化名稱
            contentLevel: index + 1, // 內容層級，從1開始
            meta: module.meta,
          };

          // 如果不是最後一部分，添加 children 數組
          if (index < parts.length - 1) {
            newItem.children = [];
          }

          // 將新項添加到當前層級
          current.push(newItem);
          // 將新項添加到 pathMap 中，以便後續查找
          pathMap[fullPath] = newItem;
          // 更新 current 指向新項的 children，為下一層做準備
          current = newItem.children;
        } else {
          // 如果路徑已存在，更新 current 指向已存在項的 children
          current = pathMap[fullPath].children;
        }
      }
    }
  });

  // 遞歸函數，用於清理沒有子項的 children 數組
  function cleanupChildren(items) {
    items.forEach((item) => {
      if (item.children && item.children.length === 0) {
        // 如果 children 是空數組，則刪除它
        delete item.children;
      } else if (item.children) {
        // 如果有 children，繼續遞歸清理
        cleanupChildren(item.children);
      }
    });
  }

  // 清理整個側邊欄結構
  cleanupChildren(sidebar);

  return sidebar;
}

export default createSidebarStructure;
