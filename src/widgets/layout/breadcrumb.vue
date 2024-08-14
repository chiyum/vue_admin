<template>
  <div class="breadcrumb" v-if="isEnable">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.path"
        :label="t(breadcrumb.name)"
        :icon="breadcrumb.icon"
      />
    </q-breadcrumbs>
  </div>
</template>
<script setup>
import { cyclicNumber } from "@/utils/globalFns.js";
import { useRoute } from "vue-router";
import { useI18n } from "@/services/i18n-service.js";
import { drawerRouters } from "@/_app/pages.js";
import { isNil } from "ramda";
const dynamicRegex = /\/default(?!.*\/default)/;
const withOutSlashRegex = /^\/.*/;
const { t } = useI18n();
const route = useRoute();

const matchIcon = (index) => {
  const finalIndex = cyclicNumber(index, 2);
  const iconMap = {
    0: "article",
    1: "bookmark",
    2: "layers",
  };
  return index === 0 ? "home" : iconMap[finalIndex];
};

const matchName = (path, isDynamic = false) => {
  let result = "";
  let matchPath = withOutSlashRegex.test(path) ? path : `/${path}`;
  if (isDynamic) matchPath = `${matchPath}/default`;
  // console.log(matchPath, isDynamic);
  function recursiveSearch(route) {
    // 檢查當前路由的 i18nName
    const routePath = withOutSlashRegex.test(route.path)
      ? route.path
      : `/${route.path}`;
    const childrenLength = route?.children?.length ?? 0;
    switch (true) {
      case routePath.toLocaleLowerCase() === matchPath:
        result = route.meta.i18nName || route.i18nName;
        break;
      case childrenLength > 0:
        for (const child of route.children) {
          recursiveSearch(child);
        }
        break;
    }
  }

  // 遍歷所有路由
  for (const route of drawerRouters) {
    recursiveSearch(route);
  }
  return result;
};

const handleBreadcrumbNavigation = (currentPath, isDynamic) => {
  currentPath = isDynamic ? currentPath.replace(dynamicRegex, "") : currentPath;
  const pathSegments = currentPath
    .replace(/^(\/|\/+)/, "")
    .split("/")
    .filter(Boolean);

  // 創建麵包屑數組
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    return {
      name: matchName(path, isLast && isDynamic) || `nav.${segment}`,
      path: path,
      icon: matchIcon(index),
    };
  });

  return breadcrumbs;
};

const breadcrumbs = computed(() => {
  return handleBreadcrumbNavigation(route.path, route.meta.isDynamic);
});

const isEnable = computed(() => {
  if (isNil(route.path)) return false;
  return route.meta.isDisabledBreadcrumb === false;
});
</script>
<style scoped lang="scss">
.breadcrumb {
  padding-bottom: 1rem;
}
</style>
