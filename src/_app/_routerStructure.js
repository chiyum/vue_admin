class Node {
  constructor(name, data = {}) {
    const { meta = {} } = data;
    this.name = name;
    this.path = data.path || name;
    console.log(name, "name");
    this.i18nName = meta.i18nName || `nav.${name}`;
    this.contentLevel = null;
    this.meta = meta;
    this.children = new Map();
  }

  toObjectWithArrayChildren() {
    const obj = {
      name: this.name,
      path: this.path,
      i18nName: this.i18nName,
      contentLevel: this.contentLevel,
      meta: this.meta,
    };
    if (this.children.size > 0) {
      obj.children = Array.from(this.children.values()).map((child) =>
        child.toObjectWithArrayChildren()
      );
    }
    return obj;
  }
}

function buildHierarchy(routers) {
  const root = new Node("root");
  for (const router of routers) {
    let currentNode = root;
    const parts = router.meta.i18nRoute.split("/").filter(Boolean);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      if (!currentNode.children.has(part)) {
        const newNodeData = isLast
          ? router
          : { path: parts.slice(0, i + 1).join("/") };
        currentNode.children.set(part, new Node(part, newNodeData));
      }
      currentNode = currentNode.children.get(part);
    }
  }

  return root;
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

function processHierarchy(node, parentNode = null, level = 0, parentPath = "") {
  const currentPath = parentPath ? `${parentPath}.${node.name}` : node.name;

  // 更新 contentLevel
  node.contentLevel = level;

  // 更新 i18nName
  if (node.meta.i18nName) {
    node.i18nName = node.meta.i18nName;
  } else {
    node.i18nName = `nav.${node.name}`;
  }

  // 檢查是否為動態路由
  const isDynamic = node.name.includes(":pathMatch(.*)*");
  if (isDynamic && parentNode) {
    node.path = `/${removeAfterColon(node.path)}/default`;
    node.name = node.name.replace(":pathMatch(.*)*", `${parentNode?.name}`);
    node.contentLevel = level - 1;
    // 將當前節點的數據覆蓋到父節點
    Object.assign(parentNode, node);
    // 從父節點的 children 中刪除當前節點
    parentNode.children.delete(node.name);
    return; // 結束當前節點的處理
  }

  // 檢查 i18nRoute 是否以下劃線結尾
  const endsWithUnderscore =
    node.meta.i18nRoute && node.meta.i18nRoute.endsWith("_");
  if (endsWithUnderscore && parentNode) {
    // 從父節點的 children 中刪除當前節點
    parentNode.children.delete(node.name);
    return; // 結束當前節點的處理
  }

  // 遞歸處理子節點
  // eslint-disable-next-line no-unused-vars
  for (const [childName, childNode] of node.children) {
    processHierarchy(childNode, node, level + 1, currentPath);
  }
}

function sortHierarchy(node) {
  if (node.children.size > 0) {
    const sortedChildren = Array.from(node.children.values()).sort((a, b) => {
      const sortA = a.meta?.sidebarSort ?? Infinity;
      const sortB = b.meta?.sidebarSort ?? Infinity;

      if (sortA !== sortB) return sortA - sortB;

      const hasChildrenA = a.children.size > 0;
      const hasChildrenB = b.children.size > 0;

      if (hasChildrenA !== hasChildrenB) return hasChildrenB - hasChildrenA;

      return a.name.localeCompare(b.name);
    });

    node.children = new Map(sortedChildren.map((child) => [child.name, child]));

    // 遞歸排序子節點
    for (const child of node.children.values()) {
      sortHierarchy(child);
    }
  }
}

export const createSidebarStructure = (modules) => {
  const hierarchy = buildHierarchy(modules);
  processHierarchy(hierarchy);
  sortHierarchy(hierarchy);
  const rootChildren = hierarchy.toObjectWithArrayChildren().children;
  return rootChildren;
};

export default createSidebarStructure;
