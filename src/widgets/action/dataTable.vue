<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { defineModel } from "vue";
import { capitalizeFirstLetter, getRandomNumber } from "@/utils/globalFns.js";
import { useI18n } from "@/services/i18n-service";

const { t } = useI18n();
const emit = defineEmits(["request", "handlePageChange"]);

const Props = defineProps({
  // 標題
  title: {
    type: String,
    default: "",
  },
  // 表格資料
  rows: {
    type: Array,
    default: () => [],
  },
  // 表頭欄位
  columns: {
    type: Array,
    default: () => [],
  },
  // 是否顯示loading
  loading: {
    type: Boolean,
    default: false,
  },
  // 是否隱藏分頁
  hidePagination: {
    type: Boolean,
    default: false,
  },
  // 分頁資訊
  pagination: {
    type: Object,
    default: () => null,
  },
  // 無資料時顯示文字
  noDataLabel: {
    type: String,
    default: "",
  },
  // 是否使用關鍵字搜尋
  isUseKeyword: {
    type: Boolean,
    default: false,
  },
  // 不顯示的chip過濾條件
  noShowChips: {
    type: Array,
    default: () => [],
  },
  // 不能收回的chip
  noRemoveChips: {
    type: Array,
    default: () => [],
  },
  // 電腦版filters 自定義class
  webFiltersClass: {
    type: String,
    default: "",
  },
  // table是否撐滿高度
  fullHeight: {
    type: Boolean,
    default: true,
  },
  // 撐滿高度的目標 預設table外層的dom
  fullHeightTarget: {
    type: String,
    default: "",
  },
  /* 是否使用在layout-default頁面
   * 是的話高度撐滿的目標為按照layout-default的版型設計
   */
  isUseInPage: {
    type: Boolean,
    default: false,
  },
});

const tablePaginaion = defineModel();

const tableFilters = defineModel("tablefilters", {
  default: () => ({
    sortBy: null, // 排序依據
    descending: false, // 升冪降冪
    page: 1, // 當前分頁
    rowsPerPage: 10, // 分頁筆數
    rowsNumber: 10, // 總共筆數
  }),
});

const state = reactive({
  showSearch: false,
  id: `table-${getRandomNumber()}`,
  height: "auto",
});

const tablePaginationEvent = ({ pagination }) => {
  tablePaginaion.value = pagination;
  emit("request", false);
};

const paginationEvent = (currentPage) => {
  tablePaginaion.value.page = currentPage;
  emit("request", false);
};

const setTableHeightInPage = () => {
  const totalHeight = document.querySelector(".layout-default").offsetHeight;
  const headerHeight = document.querySelector("#layout-default-header")
    .offsetHeight;
  const breadcrumbHeight = document.querySelector("#layout-default-breadcrumb")
    .offsetHeight;
  const tabPageHeight =
    document.querySelector(".tab-pages-tabs--top")?.offsetHeight ?? 0;
  // const tableHeaderHeight = document.querySelector(".q-table__top")
  //   .offsetHeight;
  // const tableBottomHeight = document.querySelector(".q-table__bottom")
  //   .offsetHeight;
  // const tableMiddle = document.querySelector(".q-table__middle");
  const padding = 40;
  const remainHeight =
    totalHeight - headerHeight - breadcrumbHeight - tabPageHeight - padding;

  state.height = `${Math.max(remainHeight, 390)}px`;
};

const setDataTableHeight = () => {
  const hadParentTarget = Props.fullHeightTarget !== "";
  const tableContainer = document.querySelector(".q-table__container");
  const parentDom = hadParentTarget
    ? document.querySelector(Props.fullHeightTarget)
    : tableContainer.parentElement;
  state.height = `${Math.max(parentDom.offsetHeight, 390)}px`;
};

const setupSetTableHeight = () => {
  switch (true) {
    case Props.fullHeight && Props.isUseInPage:
      setTableHeightInPage();
      break;
    case Props.fullHeight:
      setDataTableHeight();
      break;
  }
};

const perPageEvent = () => {
  paginationEvent(1);
};

onMounted(() => {
  console.log(Props.isUseInPage, Props.fullHeight);
  setupSetTableHeight();
  window.addEventListener("resize", setupSetTableHeight);
});
</script>

<template>
  <!--
        --- 屬性說明 ---
        separator:格線設定
        table-class:自定義class
     -->
  <div class="relative data-table">
    <!-- 有傳入分頁資訊就使用分頁 沒有則使用預設 -->
    <q-table
      v-model:pagination="tablePaginaion"
      :no-data-label="t(noDataLabel || t('global.NoData'))"
      color="blue"
      :hide-pagination="hidePagination"
      flat
      bordered
      :rows="Props.rows"
      :columns="Props.columns"
      row-key="id"
      separator="cell"
      table-class="default-table-style"
      :id="state.id"
      :style="{ height: state.height }"
      :title="title"
      :loading="Props.loading"
      :rows-per-page-options="[5, 10, 20, 30, 50, 100, 200]"
      @request="tablePaginationEvent"
    >
      <template #top>
        <slot name="all-top">
          <div class="full-width">
            <div class="py-3 px-5">
              <div class="d-flex flex-wrap align-center">
                <q-spinner-hourglass
                  v-if="loading"
                  class="mr-1"
                  color="primary"
                  size="1.5em"
                />
                <h5 class="ma-0 pa-0" style="font-size: 1.3rem">{{ title }}</h5>
                <q-space></q-space>
              </div>
              <div class="row mt-3">
                <slot name="top-chip"></slot>
              </div>
              <div class="row mt-3" :class="{ 'mt-5': $q.screen.width < 768 }">
                <!-- 過濾顯示 -->
                <div class="col-8 d-flex align-center flex-wrap">
                  <div
                    v-for="key in Object.keys(tableFilters)"
                    v-show="$q.screen.width < 768"
                    :key="key"
                  >
                    <template
                      v-if="
                        !noShowChips.includes(key) &&
                        ![
                          'pageNo',
                          'pageSize',
                          'rowsNumber',
                          'sortBy',
                          'descending',
                          'orderBy',
                        ].includes(key) &&
                        tableFilters[key] !== null &&
                        tableFilters[key]
                      "
                    >
                      <q-chip
                        :removable="![...noRemoveChips].includes(key)"
                        :color="!$q.dark.isActive ? 'grey-4' : 'grey-9'"
                        size="sm"
                        class="mx-0 mr-1 py-3 pr-3"
                        :class="
                          !['startTime', 'endTime'].includes(key) ? 'px-3' : ''
                        "
                        @remove="
                          Array.isArray(tableFilters[key])
                            ? (tableFilters[key] = [])
                            : (tableFilters[key] = null);
                          emit('request', true);
                        "
                      >
                        <slot name="chips" :slot-data="key">
                          <span class="mr-1">
                            {{ t(capitalizeFirstLetter(key)) }} :
                            {{ tableFilters[key] }}
                          </span>
                        </slot>
                      </q-chip>
                    </template>
                  </div>
                </div>
                <div class="col-4 text-right">
                  <q-btn
                    padding="3px"
                    icon="search"
                    size="md"
                    :loading="loading"
                    flat
                    round
                    @click="
                      isUseKeyword
                        ? (state.showSearch = true)
                        : emit('request', true)
                    "
                  >
                    <q-tooltip anchor="center left" self="center right">
                      {{ t("Search") }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn padding="3px" icon="filter_list" size="md" flat round>
                    <q-tooltip>
                      {{ t("Filters") }}
                    </q-tooltip>
                    <q-menu
                      :fit="$q.screen.width <= 1024"
                      :cover="$q.screen.width <= 1024"
                    >
                      <q-form ref="filterForm" class="q-gutter-md">
                        <q-card
                          class=""
                          :style="
                            $q.screen.width > 1024
                              ? 'min-width:300px;max-width:450px'
                              : 'width:80vw'
                          "
                        >
                          <div class="px-5 pt-4 pb-2 d-flex align-center">
                            <q-icon
                              class="mr-1"
                              size="20px"
                              name="filter_alt"
                            />
                            {{ t("Filters") }}
                            <q-space />
                            <q-btn
                              v-close-popup
                              flat
                              color="grey"
                              round
                              padding="5px"
                              icon="cancel"
                            />
                          </div>
                          <q-separator class="mt-2" />
                          <q-card-section>
                            <!-- mobile filter篩選 -->
                            <div class="q-gutter-md">
                              <slot name="mobile-filters"></slot>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-form>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <!-- table外層filters NOTE:當螢幕寬度大於768顯示 -->
              <div
                v-if="$q.screen.width > 768"
                class="pc-table-filters mt-5"
                :class="webFiltersClass"
              >
                <slot name="web-filters"></slot>
              </div>
            </div>
            <!-- 關鍵字輸入框 -->
            <transition
              class="animate__animated"
              appear
              enter-active-class="animate__zoomIn"
              :duration="{ enter: 300, leave: 1 }"
            >
              <div v-if="state.showSearch">
                <q-input
                  v-model="tableFilters.keyword"
                  autofocus
                  :loading="loading"
                  :disable="loading"
                  :label="t('Search')"
                  dense
                  @keypress.enter="emit('request', true)"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                  <template #append>
                    <q-btn
                      v-if="tableFilters.keyword"
                      flat
                      round
                      padding="1px"
                      icon="clear"
                      size="md"
                      @click="tableFilters.keyword = null"
                    ></q-btn>
                    <q-btn
                      padding="2px"
                      icon="pageview"
                      size="md"
                      flat
                      round
                      @click="emit('request', true)"
                    ></q-btn>
                  </template>
                  <template #after>
                    <q-btn
                      :disable="loading"
                      padding="2px"
                      icon="highlight_off"
                      size="md"
                      flat
                      round
                      @click="
                        tablePaginaion.page = 1;
                        tableFilters.keyword = null;
                        state.showSearch = false;
                      "
                    ></q-btn>
                  </template>
                </q-input>
              </div>
            </transition>
          </div>
        </slot>
      </template>
      <!-- 標題 -->
      <template #header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{
              col.label.includes("WithPercent")
                ? `${t(col.label.replace("WithPercent", ""))} (%)`
                : t(col.label)
            }}
          </q-th>
        </q-tr>
      </template>
      <!-- 內容 -->
      <template #body="props">
        <slot name="all-body" :props="props" :cols="props.cols"> </slot>
      </template>
      <template v-if="!hidePagination" #bottom>
        <slot name="bottom">
          <div></div>
        </slot>
        <div class="flex flex-center py-2 custom-pagination">
          <div class="custom-pagination-rows-per-page">
            <div class="custom-pagination-rows-per-page-label">
              {{ t("global.RowsPerPage") }}:
            </div>
            <q-select
              v-model="tablePaginaion.rowsPerPage"
              class="user-interface-header-item"
              borderless
              :options="[5, 10, 20, 30, 50, 100, 200]"
              style="min-width: 16px"
              @update:model-value="perPageEvent"
            />
          </div>
          <div class="mr-3">
            {{ t("global.TotalCount") }}：{{ tablePaginaion.rowsNumber }}
          </div>
          <q-pagination
            v-model="tablePaginaion.page"
            size="sm"
            :disable="Props.loading"
            :max="
              Math.ceil(tablePaginaion.rowsNumber / tablePaginaion.rowsPerPage)
            "
            :max-pages="6"
            boundary-links
            direction-links
            @update:model-value="paginationEvent"
          />
          <q-linear-progress
            v-show="Props.loading"
            dark
            rounded
            indeterminate
            color="blue"
            class="custom-pagination-loading"
          />
        </div>
      </template>
      <!-- NoData -->
      <template #no-data="data">
        <div class="d-flex align-center">
          <q-spinner-hourglass
            v-if="loading"
            class="mr-1"
            color="primary"
            size="1.5em"
          />
          <q-icon v-else color="red" size="xs" class="mr-1" :name="data.icon" />
          <span>{{ data.message }}</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped>
.data-table {
  height: 100%;
}

.relative {
  position: relative;
}

.q-table__card {
  // color: #000;
  // background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

:deep(.q-table__top) {
  padding: 0 0;
}

:deep(.q-table__middle) {
  min-height: 200px;
}

:deep(.q-table__bottom--nodata) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
}
</style>
@/utils/globalFns.js
