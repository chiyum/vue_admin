<script setup>
/** @desc 最多支援三層 */
import { drawerRouters } from "@/_app/pages";
// import { useAuthStore } from "@/store/auth-store";
// import { storeToRefs } from "pinia";
import { useI18n } from "@/services/i18n-service";

const { t } = useI18n();

/**
 * 路由篩選
 * @desc 根據需要的條件進行篩選。不過可以直接使用各元件內的defineOptions進行設定
 *       這邊算是突破原先規則強行設置
 */
const showRouters = computed(() => {
  let routers = JSON.parse(JSON.stringify(drawerRouters)); // 深拷貝 drawerRouters
  return routers;
});

/**
 * 設定父層icon
 * 若要設定則依照資料夾名稱設定對應的icon name
 * @param {String} iconName
 * @returns {String}
 */
const getParentIcon = (iconName) => {
  const removePrefixName = iconName.split(".")[1];
  switch (removePrefixName) {
    case "components":
      return "extension";
    default:
      return null;
  }
};

// const init = () => {
//   console.log(drawerRouters, "drawerRouters");
// };
// init();
</script>

<template>
  <div class="routeItem pa-2 q-gutter-y-xs">
    <!--
      routers
      q-item為無下拉選單的item
      q-expansion-item為有下拉選單的item
     -->
    <template v-for="(item, idx) in showRouters" :key="item.i18nName + idx">
      <!-- 第一層 -->
      <div>
        <q-item
          v-if="item.children == null"
          clickable
          :to="item.path"
          class="rounded-xl px-2"
          dense
        >
          <div class="d-flex align-center">
            <q-icon
              :name="item?.meta?.sidebarIcon ?? 'description'"
              size="sm"
              class="mr-2"
            />
            <span>{{ t(item.i18nName) }}</span>
          </div>
        </q-item>
        <!-- 無icon item -->
        <q-expansion-item
          v-else
          dense
          header-class="rounded-xl px-2"
          expand-icon="arrow_drop_down"
          :icon="getParentIcon(item.i18nName) ?? 'folder'"
          :label="t(item.i18nName)"
          :content-inset-level="item.contentLevel"
        >
          <!-- 第二層 -->
          <template v-for="(node, jdx) in item.children" :key="jdx">
            <q-item
              v-if="node.children == null"
              clickable
              :to="node.path"
              class="rounded-xl"
              dense
            >
              <!-- <q-item-section avatar>
                            <q-icon size="12px" name="fiber_manual_record" />
                        </q-item-section> -->
              <div class="d-flex align-center">
                <q-icon
                  v-if="node?.meta?.sidebarIcon"
                  :name="node?.meta?.sidebarIcon"
                  size="sm"
                  class="mr-2"
                />
                <q-icon
                  v-else
                  name="radio_button_unchecked"
                  size="12px"
                  class="mr-2"
                />
                <span class="ml-2">{{ t(node.i18nName) }}</span>
              </div>
            </q-item>
            <q-expansion-item
              v-else
              dense
              header-class="rounded-xl px-2"
              expand-icon="arrow_drop_down"
              :icon="getParentIcon(node.i18nName) ?? 'folder'"
              :label="t(node.i18nName)"
              :content-inset-level="node.contentLevel"
            >
              <!-- 第三層 -->
              <q-item
                v-for="(node_1, j) in node.children"
                :key="j"
                clickable
                :to="node_1.path"
                class="rounded-xl"
                dense
              >
                <div class="d-flex align-center">
                  <q-icon
                    v-if="node_1?.meta?.sidebarIcon"
                    :name="node_1?.meta?.sidebarIcon"
                    size="sm"
                    class="mr-2"
                  />
                  <q-icon
                    v-else
                    name="radio_button_unchecked"
                    size="12px"
                    class="mr-2"
                  />
                  <span class="ml-2">{{ t(node_1.i18nName) }}</span>
                </div>
              </q-item>
            </q-expansion-item>
          </template>
        </q-expansion-item>
      </div>
    </template>
  </div>
</template>

<!-- Css -->

<style lang="scss">
.body--light {
  .q-expansion-item__content {
    margin-left: 18px;
    padding-left: 4px !important;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }
}

.body--dark {
  .q-expansion-item__content {
    margin-left: 18px;
    padding-left: 4px !important;
    border-left: 1px solid lightgrey;
  }
}

.q-item__section--avatar {
  min-width: unset !important;
  padding-right: 10px !important;
}
</style>
