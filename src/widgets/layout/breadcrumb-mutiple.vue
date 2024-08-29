<template>
  <div class="breadcrumb" v-if="isEnable">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.path"
        :label="t(breadcrumb?.name ?? '')"
        :icon="breadcrumb.icon"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { cyclicNumber } from "@/utils/globalFns.js";
import { useI18n } from "@/services/i18n-service.js";
import { isNil } from "ramda";

const props = defineProps({
  currentPage: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.name && value.path && value.meta && value.label;
    },
  },
});

const { t } = useI18n();

const matchIcon = (index) => {
  const finalIndex = cyclicNumber(index, 2);
  const iconMap = {
    0: "article",
    1: "bookmark",
    2: "layers",
  };
  return index === 0 ? "home" : iconMap[finalIndex];
};

const handleBreadcrumbNavigation = (currentPage) => {
  const pathSegments = currentPage.path
    .replace("/:pathMatch(.*)*", "")
    .replace(/^(\/|\/+)/, "")
    .split("/")
    .filter(Boolean);

  return pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    return {
      name: isLast ? currentPage.meta.i18nName : `nav.${segment}`,
      path: path,
      icon: matchIcon(index),
    };
  });
};

const breadcrumbs = computed(() => {
  return handleBreadcrumbNavigation(props.currentPage);
});

const isEnable = computed(() => {
  return (
    !isNil(props.currentPage) &&
    props.currentPage.meta.isDisabledBreadcrumb !== true
  );
});
</script>

<style scoped lang="scss">
.breadcrumb {
  padding-bottom: 1rem;
}
</style>
