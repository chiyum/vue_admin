<template>
  <q-page padding>
    <draggable-buttons
      v-if="appStore.systemSetting.habit.tabPosition === 'top'"
      class="tab-pages-tabs"
      :class="{
        'tab-pages-tabs--top':
          appStore.systemSetting.habit.tabPosition === 'top',
      }"
      :initial-buttons="state.opensPages"
      :other-bind="{ dense: true, color: 'blue-8' }"
    >
      <template v-slot:button="{ data }">
        <div
          class="tab-pages-tabs-item"
          @click.self="onChangeCurrentShowTab(data)"
        >
          <div class="tab-pages-tabs-item-name">
            {{ t(data.label) }}
          </div>
          <div class="tab-pages-tabs-item-split-btn" @click="onSpiltPage(data)">
            <q-icon
              size="14px"
              color="dark"
              name="collections_bookmark"
            ></q-icon>
          </div>
          <div
            class="tab-pages-tabs-item-close-btn"
            v-if="state.opensPages.length > 1"
            @click="onCloseTab(data)"
          >
            <q-icon size="14px" color="red-6" name="cancel"></q-icon>
          </div>
        </div>
      </template>
    </draggable-buttons>
    <div
      class="tab-pages"
      :class="{ multiple: state.currentShowPages.length > 1 }"
    >
      <Suspense>
        <template
          v-for="(page, index) in state.currentShowPages"
          :key="`page-${index}`"
        >
          <div
            :style="{
              width: state.currentShowPages.length > 1 ? '50%' : '100%',
            }"
          >
            <BreadCrumb :current-page="page" id="layout-default-breadcrumb" />
            <component :is="page.name"></component>
          </div>
        </template>
      </Suspense>
    </div>
  </q-page>
  <teleport to="body">
    <draggable-buttons
      v-if="appStore.systemSetting.habit.tabPosition === 'bottom'"
      class="tab-pages-tabs"
      :initial-buttons="state.opensPages"
      :other-bind="{ dense: true, color: 'blue-8' }"
    >
      <template v-slot:button="{ data }">
        <div
          class="tab-pages-tabs-item"
          @click.self="onChangeCurrentShowTab(data)"
        >
          <div class="tab-pages-tabs-item-name">
            {{ t(data.label) }}
          </div>
          <div class="tab-pages-tabs-item-split-btn" @click="onSpiltPage(data)">
            <q-icon
              size="14px"
              color="dark"
              name="collections_bookmark"
            ></q-icon>
          </div>
          <div
            class="tab-pages-tabs-item-close-btn"
            v-if="state.opensPages.length > 1"
            @click="onCloseTab(data)"
          >
            <q-icon size="14px" color="red-6" name="cancel"></q-icon>
          </div>
        </div>
      </template>
    </draggable-buttons>
  </teleport>
</template>
<script setup>
import BreadCrumb from "@/widgets/layout/breadcrumb-mutiple.vue";
import draggableButtons from "@/widgets/action/draggable-buttons.vue";
import { routes } from "@/services/router-service.js";
import { drawerRouters } from "@/_app/pages.js";
import { useAppStore } from "@/store/app-store.js";
import { useI18n } from "@/services/i18n-service.js";

const { t } = useI18n();
const appStore = useAppStore();
const registerAppChildrenComponent = inject("registerComponent");
const SPLIT_MAX_PAGE = 2;
// defineProps({
//   // 開分頁但沒顯示的頁面
//   pendingOpenPages: {
//     type: Array,
//     required: true,
//   },
// });
const state = reactive({
  // 已經開啟的分頁 由元件來控制要顯示哪個頁面
  opensPages: [], // 開啟的分頁標籤[{ name, label, component }]
  currentShowPages: [], // 當前顯示的分頁 ['componentName']
  alreadyRegisterComponent: new Map(),
});

const computedTabPage = computed(() => [...appStore.systemSetting.tabPages]);

// 定義一個函數來將路由數組扁平化
const flattenRoutes = (routes) => {
  // 使用 reduce 方法來遍歷路由數組
  return routes.reduce((acc, route) => {
    // 將當前路由添加到累加器數組中
    acc.push(route);
    // 如果當前路由有子路由
    if (route.children) {
      // 遞歸調用 flattenRoutes 來扁平化子路由，並將結果添加到累加器中
      acc.push(...flattenRoutes(route.children));
    }
    // 返回累加器數組
    return acc;
  }, []);
};

// 定義主要的路由匹配函數
const onMatchRoutes = (firstArray, secondArray) => {
  // 將第一個數組扁平化
  const flattenedFirstArray = flattenRoutes(firstArray);

  // 使用 map 方法遍歷第二個數組
  return secondArray.map((secondItem) => {
    // 在扁平化的第一個數組中查找匹配的路由
    const matchingFirstItem = flattenedFirstArray.find(
      (firstItem) => firstItem.path === secondItem.path
    );
    // 如果找到匹配項並且匹配項有 i18nName
    if (matchingFirstItem && matchingFirstItem.i18nName) {
      // 創建一個新對象，包含第二個數組項的所有屬性，並添加 i18nName
      return { ...secondItem, i18nName: matchingFirstItem.i18nName };
    }
    // 如果沒有找到匹配項或匹配項沒有 i18nName，則返回原始的第二個數組項
    return secondItem;
  });
};

// 調用 matchRoutes 函數進行路由匹配
const matchRoutes = onMatchRoutes(drawerRouters, routes);
// console.log(matchRoutes, "matchRoutes");

// component 利用Name下去顯示，所以一開始加入時得先註冊
const checkComponentHasRegister = (name, component) => {
  if (!state.alreadyRegisterComponent.has(name)) {
    state.alreadyRegisterComponent.set(name, component);
    return true; // 註冊成功
  }
  console.warn(`Component "${name}" is already registered.`);
  return false; // 註冊失敗（已存在）
};

const registerComponent = (name, component) => {
  if (checkComponentHasRegister(name, component)) {
    registerAppChildrenComponent(name, component);
  }
};

const transferPage = (page) => {
  const safeName = `page-${page.name.replace(/\//g, "")}`;
  // console.log(page.multipleUseComponent, "page.multipleUseComponent");
  return {
    name: safeName,
    originName: page.name,
    label: page.i18nName, // 後續再增加i18n
    component: page.multipleUseComponent,
    meta: page.meta,
    path: page.matchPath,
  };
};

// openPage是物件
const updatePages = (openPages, isSplit = false) => {
  // console.log(openPages, "openPages");
  state.opensPages = openPages
    .map((page) => {
      // 處理特殊情況：如果 path 以 /default 結尾，將其替換為 /:pathMatch(.*)*
      const matchPath = page.path.endsWith("/default")
        ? page.path.replace(/\/default$/, "/:pathMatch(.*)*")
        : page.path;

      // 在 matchRoutes 中查找匹配的路由
      const matchedRoute = matchRoutes.find(
        (route) => route.path === matchPath
      );

      if (matchedRoute) {
        // 使用匹配的路由數據
        const proceedItem = transferPage({
          ...matchedRoute,
          matchPath,
          name: matchedRoute.name || page.name, // 如果 matchedRoute 沒有 name，使用 page.name
          i18nName: matchedRoute.i18nName || page.i18nName,
        });

        // 註冊掛載 component
        // console.log(proceedItem.component, "即將註冊的component");
        registerComponent(proceedItem.name, proceedItem.component);

        return proceedItem;
      } else {
        console.warn(`No matching route found for path: ${matchPath}`);
        return null; // 或者返回一個默認值
      }
    })
    .filter(Boolean); // 過濾掉可能的 null 值
  console.log(state.opensPages, "updatePages's state.opensPages");
  // 是否為分割模式(顯示雙畫面)
  if (isSplit) {
    state.currentShowPages = state.opensPages.filter(
      (page, index) => index < SPLIT_MAX_PAGE
    );
  } else {
    // 當前顯示的分頁
    state.currentShowPages =
      state.opensPages.length > 0 ? [state.opensPages[0]] : [];
  }
};

const onChangeCurrentShowTab = (tab) => {
  state.currentShowPages[0] = tab;
  console.log("onChangeCurrentShowTab", tab);
};

const onSpiltPage = (spiltPage) => {
  // 分割分頁的做法是原先的第一個開啟頁面加上新的分頁，帶入的是componentName
  state.currentShowPages = [state.currentShowPages[0], spiltPage];
};

const onCloseTab = (tab) => {
  appStore.onRemoveTabPage(tab);
};

const init = () => {
  // setDefaultPage();
  updatePages(appStore.systemSetting.tabPages);
};

init();

watch(computedTabPage, (newVal) => {
  console.log("更新當前畫面 computedTabPage");
  updatePages(newVal);
});

/*
 * 待處理 @todo
 * 1. sliderBar點擊後加入component以及分頁標籤
 * 2. 分頁標籤的按鈕要加入設定功能 關閉分頁or雙開分頁
 * 3. 分頁若雙開，右上角要加入關閉按鈕
 * 4. 麵包屑要撰寫一版這版的判斷 麵包屑包在for改傳路由進去顯示 預設開啟路由從route抓當前
 * 5. 托曳btn可以在迴圈內的btn加slot，然後用資料傳遞的方式讓父元件接受值運用 V
 * 6. btn取值改抓struct V
 */
</script>
<style scoped lang="scss">
.tab-pages {
  display: flex;
  align-items: stretch;
  gap: 1rem;
  &.multiple {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: 100%;
      background: #e0e0e0;
    }
  }
  &-tabs {
    //max-width: 500px;
    overflow-x: scroll;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
    &--top {
      position: relative;
      margin-bottom: 0.5rem;
    }
    &-item {
      margin: 0.3rem 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      font-size: 1rem;
      &-split-btn,
      &-close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        background: #ffffff;
        cursor: pointer;
        border-radius: 6px;
        aspect-ratio: 1 / 1;
      }
    }
  }
}

:deep(.q-btn) {
  padding: 0;
}
</style>
