<script setup>
/** @desc 最多支援三層 */
import { drawerRouters } from "@/_app/pages";
import drawRouterItem from "@/widgets/layout/drawRouterItem.vue";

/**
 * 路由篩選
 * @desc 根據需要的條件進行篩選。不過可以直接使用各元件內的defineOptions進行設定
 *       這邊算是突破原先規則強行設置
 */
const showRouters = computed(() => {
  let routers = JSON.parse(JSON.stringify(drawerRouters)); // 深拷貝 drawerRouters
  return routers;
});

// const init = () => {
//   console.log(drawerRouters, "drawerRouters");
// };
// init();
</script>

<template>
  <div class="routeItem pa-2 q-gutter-y-xs">
    <drawRouterItem
      v-for="(item, index) in showRouters"
      :key="item.i18nName + index"
      :item="item"
    />
  </div>
</template>

<!-- Css -->

<style lang="scss">
.body--light {
  .routeItem {
    .q-expansion-item__content {
      margin-left: 18px;
      padding-left: 4px !important;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}

.body--dark {
  .routeItem {
    .q-expansion-item__content {
      margin-left: 18px;
      padding-left: 4px !important;
      border-left: 1px solid lightgrey;
    }
  }
}

.q-item__section--avatar {
  min-width: unset !important;
  padding-right: 10px !important;
}
</style>
