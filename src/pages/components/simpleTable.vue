<template>
  <div class="simple-table">
    <DataTable
      v-model="state.pagination"
      v-model:tablefilters="state.tableFilters"
      class="user-interface-main"
      :rows="state.rows"
      :columns="state.columns"
      :loading="state.isLoading"
      :title="t('global.UserList')"
      :is-use-in-page="true"
      @request="getData"
    >
      <!--   tbody欄位區域(row)   -->
      <template #all-body="{ props }">
        <q-tr>
          <q-td v-for="header in state.columns" :key="header.name">
            <!--              欄位自定義範例
                 1. 這裡的header.name是columns.name
                 2. props.row是每一筆資料
                 3. 若不特別處理，則會直接顯示對應的欄位資料
             -->
            <div v-if="header.name === 'profileImg'" class="div-center">
              <q-img
                :src="props.row.profileImg"
                alt="頭像"
                class="table-avatar"
              />
            </div>
            <div v-else class="text-left">
              {{ props.row[header.name] !== "" ? props.row[header.name] : "-" }}
            </div>
          </q-td>
        </q-tr>
      </template>
      <!--  右邊filters篩選功能內的元素    -->
      <template #mobile-filters>
        <div class="row mt-2">
          <!-- 帳號 -->
          <div class="col-12 pa-1">
            <q-input
              v-model="state.tableFilters.username"
              :label="t('global.Username')"
              filled
              fill-mask
              @keypress.enter="getData(true)"
            >
              <template #append>
                <q-icon
                  name="search"
                  class="cursor-pointer"
                  @click="getData(true)"
                />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <!--  電腦版filters篩選功能的元素    -->
      <template #web-filters>
        <q-input
          v-model="state.tableFilters.username"
          :label="t('global.Username')"
          outlined
          dense
          fill-mask
          @keypress.enter="getData(true)"
        >
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </template>
    </DataTable>
  </div>
</template>
<script setup>
import DataTable from "@/widgets/action/dataTable.vue";
import { useI18n } from "@/services/i18n-service.js";
import { filterReservedKeys } from "@/utils/globalFns.js";
import axios from "@/services/http-service.js";

const { t } = useI18n();

const state = reactive({
  /* 表格欄位 */
  columns: [
    {
      label: "global.Avatar",
      field: "Avatar",
      name: "profileImg",
      align: "center",
    }, // 頭像
    {
      label: "global.Username",
      field: "Username",
      name: "username",
      align: "left",
    }, // 用戶名
    {
      label: "global.Balance",
      field: "Balance",
      name: "balance",
      align: "left",
    }, // 餘額
  ],
  /* 篩選
   * 1. 可以自己加入需要篩選的條件 例如範例的username
   * 2. 這裡的參數會帶到API中
   */
  tableFilters: {
    pageNo: 1, // 當前分頁
    pageSize: 10, // 每頁筆數
    rowsNumber: 10, // 總共筆數
    sortBy: "id", // 排序依據
    orderBy: "DESC", // 升冪降冪
    username: "", // 用戶名
  },
  /* 分頁資料 */
  pagination: {
    sortBy: null, // 排序依據
    descending: false, // 升冪降冪
    page: 1, // 當前分頁
    rowsPerPage: 10, // 分頁筆數
    rowsNumber: 100, // 總共筆數
  },
  /* 表格資料 */
  rows: [],
  /* 是否在Loading 表格會有載入效果 */
  isLoading: false,
});

/* 取得資料
 * 1. 此函式需要設定在dataTable.vue的@request事件中
 * 2. 若有自定義
 * 3. isFilter: 的作用是讓當前分頁重置為1
 */
const getData = (isFilter) => {
  state.isLoading = true;

  if (isFilter) state.pagination.page = 1;
  state.tableFilters.pageNo = state.pagination.page;
  state.tableFilters.pageSize = state.pagination.rowsPerPage;

  /** 整理過濾資料 */
  let params = {};
  const otherParams = filterReservedKeys(state.tableFilters); // 取出非filter資料 例如pageNo
  console.log(otherParams);
  params = {
    agentId: 1,
    ...otherParams, // 非filter資料
    // 篩選資料根據需求自行加入
    filters: {
      username: state.tableFilters?.username || null,
    },
  };

  axios
    .get("/admin/searchUsers", { params, rejectEmpty: true })
    .then(({ data: res }) => {
      state.isLoading = false;
      if (res.code !== 0) return;
      /** 成功後只更改當前頁面及總筆數 */
      state.pagination.page = res.data.pageNo;
      state.pagination.rowsNumber = res.data.totalCount;
      state.rows = res.data?.items || [];
      console.log(state.pagination);
    });

  /* 資料格式 說明
   * 1. 資料格式格式的欄位名稱要與columns.name一致才會顯示
   */
  // state.rows = [
  //   {
  //     profileImg:
  //       "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
  //     balance: 100,
  //     username: "user1",
  //   },
  //   {
  //     profileImg:
  //       "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
  //     balance: 200,
  //     username: "user2",
  //   },
  // ];
};

const init = () => {
  getData();
};
init();
// getData();
</script>

<style lang="scss">
//@import
</style>
