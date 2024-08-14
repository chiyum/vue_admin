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
      <template #all-body="{ props }">
        <q-tr>
          <q-td v-for="header in state.columns" :key="header.name">
            <div v-if="header.name === 'profileImg'" class="div-center">
              <img
                v-image-default
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
    </DataTable>
  </div>
</template>
<script setup>
import DataTable from "@/widgets/action/dataTable.vue";
import { useI18n } from "@/services/i18n-service.js";

const { t } = useI18n();

const state = reactive({
  columns: [
    {
      label: "global.Avatar",
      field: "Avatar",
      name: "profileImg",
      align: "center",
    }, // 頭像
    {
      label: "global.Balance",
      field: "Balance",
      name: "balance",
      align: "left",
    }, // 餘額
  ],
  tableFilters: {
    pageNo: 1,
    pageSize: 10,
    rowsNumber: 10, // 總共筆數
    sortBy: "id", // 排序依據
    orderBy: "DESC", // 升冪降冪
  },
  rows: [],
  isLoading: false,
});

const getData = () => {
  state.isLoading = true;
  setTimeout(() => {
    state.isLoading = false;
    state.rows = [
      {
        profileImg:
          "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
        balance: 100,
      },
      {
        profileImg:
          "https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d2254363d8a0d6a7b74a19b2da5902b4.jpg",
        balance: 200,
      },
    ];
  }, 1000);
};
// getData();
</script>

<style lang="scss">
//@import
</style>
