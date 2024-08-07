<!-- eslint-disable vue/no-v-for-template-key -->
<script setup>
/** @desc 最多支援三層 */
import { drawerRouters } from "@/_app/pages";
import { useAuthStore } from "@/store/auth-store";
import { storeToRefs } from "pinia";
import { useI18n } from "@/services/i18n-service";

// const $q = useQuasar();
const store = useAuthStore();
const { t } = useI18n();
const { userData } = storeToRefs(store);

// 固定隱藏的路由
let hideRoute = ["AppMessage", "PaymentSetting", "RobotList"];

// Promission 對應表
const promission = {
  // 後端 : 前端
  viewGetOnlineUsers: "OnlineUser", // 用戶管理 > 在線會員 1
  viewSearchUsers: "UserList", // 用戶管理 > 用戶列表 2
  viewGetRoomSetting: "BasicSetting", // 房間管理 > 基本設定 8
  viewSearchSubAgents: "ProxyList", // 代理列表 12
  viewSearchRoomEntryReview: "RoomEntryApprovals", // 申請管理 > 進房審核 15
  viewSearchRoomEntryReviewRecords: "RoomEntryApprovalRecords", // 申請管理 > 進房審核紀錄 16
  viewGetAllSpecialUsersRebate: "SpecialRebate", // 回水管理 > 特殊回水 21
  viewGetAgentRebates: "LotteryRebate", // 回水管理 > 彩票回水 24
  viewGetGameMessages: "NotifyManagement", // 消息設置 各遊戲頁面 (禁止查看遊戲推送消息) 29
  viewSearchUsersReport: "LotteryReport", // 報表管理 > 彩票報表 (禁止查看彩票報表) 30
  viewSearchRebateRecord: "RebateReport", // 報表管理 > 回水報表 (禁止查看回水報表) 33
  viewSearchGameHistory: "LiveMonitorManagement", // 即時監控 各遊戲頁面 (禁用查看開獎紀錄) 35
};

// 藉由userData disabledPermissions 增加 需隱藏的路由
if (userData && userData.value && userData.value.disabledPermissions) {
  userData.value.disabledPermissions.forEach((permission) => {
    const frontendRoute = promission[permission.Name];
    if (frontendRoute && !hideRoute.includes(frontendRoute)) {
      hideRoute.push(frontendRoute);
    }
  });
} else {
  console.log("userData.value.disabledPermissions is null or undefined");
}

// showDistributeDialog();
/**
 * 路由篩選
 * @desc 根據需要的條件進行篩選
 */
const showRouters = computed(() => {
  let routers = JSON.parse(JSON.stringify(drawerRouters)); // 深拷貝 drawerRouters
  return routers;
});

const init = () => {
  console.log(drawerRouters, "drawerRouters");
  if (userData.value.identify === "sub-account")
    hideRoute = [...hideRoute, "Subaccount", "RoleList"];
};
init();
</script>
<!-- v-if="item.i18nName === 'MemberManagement' && userData.roleId === 2" -->
<!-- PageContent -->

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
              :name="item.meta?.icon ?? 'description'"
              size="sm"
              class="mr-2"
            />
            <span>{{ t(item.i18nName) }}{{ item.meta?.icon }}</span>
          </div>
        </q-item>
        <!-- 無icon item -->
        <q-expansion-item
          v-else
          dense
          header-class="rounded-xl px-2"
          expand-icon="arrow_drop_down"
          :icon="item.meta?.icon ?? 'folder'"
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
                  v-if="item.meta?.icon"
                  :name="item.meta?.icon"
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
              :icon="item.meta?.icon ?? 'folder'"
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
                    v-if="item.meta?.icon"
                    :name="item.meta?.icon"
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
