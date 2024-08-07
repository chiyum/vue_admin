<template>
  <div class="user-interface full-pages">
    <!-- <q-inner-loading :showing="state.isLoading" label-class="text-teal" label-style="font-size: 1.1em" color="primary" style="z-index: 100;" /> -->
    <DataTable
      v-model="state.pagination"
      v-model:tablefilters="state.tableFilters"
      class="user-interface-main"
      :rows="state.rows"
      :columns="state.columns"
      :loading="state.isLoading"
      :title="t('global.UserList')"
      @request="getData"
    >
      <template #mobile-filters>
        <div class="row mt-2">
          <!-- startTime -->
          <div class="col-12 col-md-6 pa-1">
            <DateAndTime
              v-model="state.tableFilters.startTime"
              :bind="{ filled: true, label: t('global.StartTime') }"
              @update="getData(true)"
            />
          </div>
          <!-- endTime -->
          <div class="col-12 col-md-6 pa-1">
            <DateAndTime
              v-model="state.tableFilters.endTime"
              :bind="{ filled: true, label: t('global.EndTime') }"
              @update="getData(true)"
            />
          </div>
        </div>
        <div class="row mt-2">
          <!-- 帳號 -->
          <div class="col-12 col-md-6 pa-1">
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
          <div class="col-12 col-md-6 pa-1">
            <q-input
              v-model="state.tableFilters.userId"
              :label="t('global.UserId')"
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
          <div class="col-12 col-md-6 pa-1">
            <q-input
              v-model="state.tableFilters.nickName"
              :label="t('global.Nickname')"
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
          <div class="col-12 col-md-6 pa-1">
            <q-input
              v-model="state.tableFilters.memo"
              :label="t('global.Note')"
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
      <template #web-filters>
        <DateAndTime
          v-model="state.tableFilters.startTime"
          :bind="{ outlined: true, dense: true, label: t('global.StartTime') }"
          @update="getData(true)"
        />
        <DateAndTime
          v-model="state.tableFilters.endTime"
          :bind="{ outlined: true, dense: true, label: t('global.EndTime') }"
          @update="getData(true)"
        />
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
        <q-input
          v-model="state.tableFilters.userId"
          :label="t('global.UserId')"
          outlined
          dense
          fill-mask
          @keypress.enter="getData(true)"
        >
          <template #prepend>
            <q-icon name="badge" />
          </template>
        </q-input>
        <q-input
          v-model="state.tableFilters.nickName"
          :label="t('global.Nickname')"
          outlined
          dense
          fill-mask
          @keypress.enter="getData(true)"
        >
          <template #prepend>
            <q-icon name="bookmark_border" />
          </template>
        </q-input>
        <q-input
          v-model="state.tableFilters.memo"
          :label="t('global.Note')"
          outlined
          dense
          fill-mask
          @keypress.enter="getData(true)"
        >
          <template #prepend>
            <q-icon name="edit_note" />
          </template>
        </q-input>
      </template>
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
            <div v-else-if="header.name === 'balance'">
              {{ formattedAmount(props.row.balance) }}
            </div>
            <div v-else-if="header.name === 'subAgentLevel'" class="text-left">
              <q-badge v-if="props.row.subAgentLevel !== 0" color="positive">
                {{
                  t("global.ProxyLevelsSubstitute", {
                    level: props.row.subAgentLevel,
                  })
                }}
              </q-badge>
              <q-badge v-else color="primary">
                {{ t("global.OrdinaryUser") }}
              </q-badge>
            </div>
            <div
              v-else-if="['roomState'].includes(header.name)"
              class="text-left column-steate"
            >
              <q-badge
                v-if="!props.row.isDisabledRoom && !props.row.is_muted"
                color="positive"
              >
                {{ t("global.Normal") }}
              </q-badge>
              <q-badge v-if="props.row.isDisabledRoom" color="red">
                {{ t("global.CantJoinRoom") }}
              </q-badge>
              <q-badge v-if="props.row.is_muted" color="red">
                {{ t("global.Mute") }}
              </q-badge>
            </div>
            <div v-else-if="header.name === 'actions'" class="text-left">
              <q-icon
                class="cursor-pointer"
                name="settings"
                color="grey-7"
                size="20px"
              >
                <q-menu>
                  <q-list dense style="min-width: 200px">
                    <q-item
                      v-permission="'ViewGetUserInfo'"
                      v-close-popup
                      clickable
                      @click="getUserInfo(props.row.userId)"
                    >
                      <q-item-section>{{
                        t("global.MemberData")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-permission="'OperateGetSingleUserRebate'"
                      v-close-popup
                      clickable
                      @click="openBackwaterSetting(props.row.userId)"
                    >
                      <q-item-section>{{
                        t("global.LotteryRebate")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-if="state.IsForbidden"
                      v-close-popup
                      clickable
                      @click="openLotteryReport(props.row.userId)"
                    >
                      <q-item-section>{{
                        t("global.DetailReport")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-permission="'OperateForceTransfer'"
                      v-close-popup
                      clickable
                      @click="
                        updateAccounting(props.row.userId, props.row.username)
                      "
                    >
                      <q-item-section>{{
                        t("global.ScoreOperation")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-close-popup
                      clickable
                      @click="showDistributeDialog(props.row)"
                    >
                      <q-item-section>{{
                        t("global.GiveRedPacket")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-permission="'OperateMuteUser'"
                      v-close-popup
                      clickable
                      @click="disableChat(props.row.userId, props.row.is_muted)"
                    >
                      <q-item-section>{{
                        props.row.is_muted
                          ? t("global.CancelMute")
                          : t("global.Mute")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-permission="'OperateDisableRoomEntryForUser'"
                      v-close-popup
                      clickable
                      @click="
                        disableEnterRoom(
                          props.row.userId,
                          props.row.isDisabledRoom
                        )
                      "
                    >
                      <q-item-section>{{
                        props.row.isDisabledRoom
                          ? t("global.CancelCantJoinRoom")
                          : t("global.CantJoinRoom")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-if="props.row.subAgentLevel === 0"
                      v-permission="'OperateSetSubAgent'"
                      v-close-popup
                      clickable
                      @click="setAgent(props.row.userId)"
                    >
                      <q-item-section>{{
                        t("global.SetAgent")
                      }}</q-item-section>
                    </q-item>
                    <q-item
                      v-close-popup
                      clickable
                      @click="deliteUser(props.row.userId, props.row.username)"
                    >
                      <q-item-section>{{ t("global.Delete") }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </div>
            <div v-else class="text-left">
              {{ props.row[header.name] !== "" ? props.row[header.name] : "-" }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </DataTable>
    <!-- 用戶資料 -->
    <CustomDialog
      :is-show="state.detailOption.isShowDialog"
      :title="t('global.MemberData')"
      @dismiss="changeUserDetail"
    >
      <div class="user-detail-dialog">
        <div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.memo"
              dense
              class="user-interface-header-item"
              square
              filled
              :label="t('global.MemberNote')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.userId"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.UserId')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.account"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.MemberAccount')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.nickname"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.MemberNickname')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col" style="margin-top: 2.4rem">
            <q-input
              v-model="state.detailOption.detail.phone"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.PhoneNumber')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.wechat"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.MemberWechat')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.qq"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.QQAccount')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="formattedRegisterTime"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.RegisterTime')"
              style="width: 100%"
            />
          </div>
        </div>
        <div class="user-detail-dialog-right">
          <div class="user-detail-dialog-col user-detail-dialog-col--between">
            <div class="user-detail-dialog-col-label">
              {{ t("global.Avatar") }}
            </div>
            <q-img
              :src="
                state.detailOption.detail.profileImg !== ''
                  ? state.detailOption.detail.profileImg
                  : getImageUrl('avatar/june-o-vyAGTBYSkqU-unsplash.jpg')
              "
              spinner-color="white"
              style="height: 60px; width: 60px"
            />
          </div>
          <q-separator />
          <div class="user-detail-dialog-col user-detail-dialog-col--between">
            <div class="user-detail-dialog-col-label">
              {{ t("global.AlipayPayment") }}
            </div>
            <q-img
              :src="
                state.detailOption.detail.alipayQrPath !== ''
                  ? state.detailOption.detail.alipayQrPath
                  : getImageUrl('user/pay-demo.png')
              "
              spinner-color="white"
              style="height: 60px; width: 60px"
            />
          </div>
          <q-separator />
          <div class="user-detail-dialog-col user-detail-dialog-col--between">
            <div class="user-detail-dialog-col-label">
              {{ t("global.WeChatPayment") }}
            </div>
            <q-img
              :src="
                state.detailOption.detail.weChatQrPath !== ''
                  ? state.detailOption.detail.alipayQrPath
                  : getImageUrl('user/pay-demo.png')
              "
              spinner-color="white"
              style="height: 60px; width: 60px"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.cardholder"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.BankBookName')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.BankCode"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.BankBookType')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.address"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.BankBookAddress')"
              style="width: 100%"
            />
          </div>
          <div class="user-detail-dialog-col">
            <q-input
              v-model="state.detailOption.detail.bankAccount"
              dense
              class="user-interface-header-item"
              square
              filled
              disable
              :label="t('global.BankBookAccount')"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
    </CustomDialog>
    <!-- 回水彈窗 -->
    <CustomDialog
      :is-show="state.backwater.isShowDialog"
      :title="t('global.LotteryRebate')"
      :options="{ hasAction: true, customCss: 'backwater-dialog' }"
      :show-confirm-button="!state.IsDisableUpdateRebate"
      @dismiss="onBackwaterDialogClose"
    >
      <div class="user-detail-dialog-col user-detail-dialog-col--columns">
        <div>
          <div class="user-detail-dialog-col-label">
            {{ t("global.DoOpenRebate") }}
          </div>
          <SwitchComponent v-model="state.backwater.state" />
        </div>
        <div class="backwater-state-values">
          <div class="robot-edit robot-edit-dialog">
            <div class="robot-edit-col">
              <div class="robot-edit-col-item">
                <div class="robot-edit-col-item-label">
                  {{ t("global.ChangeAll") }}
                </div>
                <div
                  class="robot-edit-col-item-value robot-edit-col-item-value--inline-center"
                >
                  <q-input
                    v-model.number="state.backwater.allValues"
                    type="number"
                    borderless
                    dense
                  />%
                </div>
              </div>
            </div>
            <div
              v-for="(col, index) in state.backwater.stateValues"
              :key="`col-${index}`"
              class="robot-edit-col"
            >
              <div
                v-for="item in col"
                :key="item.id"
                class="robot-edit-col-item"
              >
                <div class="robot-edit-col-item-label">
                  {{ t(item.label) }}
                </div>
                <div
                  class="robot-edit-col-item-value robot-edit-col-item-value--inline-center"
                >
                  <q-input
                    v-model.number="item.value"
                    type="number"
                    borderless
                    dense
                  />%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomDialog>
    <!-- 報表彈窗 -->
    <CustomDialog
      :is-show="state.recordOption.isShowDialog"
      :title="t('global.DetailReport')"
      :options="{
        hasAction: false,
        customCss: 'lottery-record-dialog',
        isFullWidth: true,
      }"
      @dismiss="
        () => {
          state.recordOption.isShowDialog = false;
        }
      "
    >
      <Record :user-id="state.recordOption.userId" />
    </CustomDialog>
  </div>
</template>
<script setup>
import axios from "@/services/http-service";
import getImageUrl from "@/utils/getImageUrl";
import DataTable from "@/widgets/action/dataTable.vue";
import CustomDialog from "@/widgets/action/customDialog.vue";
import DateAndTime from "@/widgets/action/dateAndTime.vue";
import { filterReservedKeys, formattedAmount } from "@/utils/globalFns";
import dayjs from "dayjs";
// import { useAuthStore } from "@/store/auth-store";
// import { storeToRefs } from "pinia";
import { useI18n } from "@/services/i18n-service";

const { t } = useI18n();

/** 取得列表 */
const getData = async (isFilter = false) => {
  state.isLoading = true;

  if (isFilter) state.pagination.page = 1;
  state.tableFilters.pageNo = state.pagination.page;
  state.tableFilters.pageSize = state.pagination.rowsPerPage;

  /** 整理過濾資料 */
  let params = {};
  const otherParams = filterReservedKeys(state.tableFilters);
  params = {
    agentId: 1,
    ...otherParams, // 非filter資料
    startTime: state.tableFilters.startTime
      ? dayjs(state.tableFilters.startTime).unix()
      : null,
    endTime: state.tableFilters.endTime
      ? dayjs(state.tableFilters.endTime).unix()
      : null,
    filters: {
      userId: state.tableFilters.userId || null,
      username: state.tableFilters.username || null,
      nickName: state.tableFilters.nickName || null,
      memo: state.tableFilters.memo || null,
    },
  };

  axios.get("/admin/searchUsers", { params }).then(({ data: res }) => {
    state.isLoading = false;
    if (res.code !== 0) return;
    /** 成功後只更改當前頁面及總筆數 */
    state.pagination.page = res.data.pageNo;
    state.pagination.rowsNumber = res.data.totalCount;
    state.rows = res.data?.items || [];
    console.log(state.pagination);
  });
};
// const authStore = useAuthStore();
// const { userData } = storeToRefs(authStore);

const state = reactive({
  columns: [
    { label: "Avatar", field: "Avatar", name: "profileImg", align: "center" }, // 頭像
    { label: "UserId", field: "UserId", name: "userId", align: "left" }, // 會員編號
    { label: "Username", field: "Username", name: "username", align: "left" }, // 用戶名
    { label: "Nickname", field: "Nickname", name: "nickname", align: "left" }, // 暱稱
    { label: "Balance", field: "Balance", name: "balance", align: "left" }, // 餘額
    /** 以下開始特殊icon */
    {
      label: "Identity",
      field: "Identity",
      name: "subAgentLevel",
      align: "left",
    }, // 用戶身份 0是普通會員 1.2.3為各級代理
    {
      label: "RoomState",
      field: "RoomState",
      name: "roomState",
      align: "left",
    }, // 房間狀態 禁言 or 禁止加入房間 兩者為false時為正常
    { label: "UserNote", field: "UserNote", name: "memo", align: "left" }, // 會員備註
    { label: "Operation", field: "Actions", name: "actions", align: "center" }, // 操作
  ],
  rows: [],
  isLoading: false,
  detailOption: {
    isShowDialog: false,
    detail: {
      userId: -1,
      account: "帳號",
      nickname: "暱稱",
      phone: -1,
      wechat: -1,
      qq: -1,
      profileImg: "",
      alipayQrPath: "",
      weChatQrPath: "",
      cardholder: "持卡人",
      address: "持卡人地址",
      bankAccount: "卡號",
      BankCode: "銀行類別",
      memo: "會員備註",
      createdAt: -1,
    },
  },
  /** 彩票回水 */
  backwater: {
    isShowDialog: false,
    state: false,
    userId: -1,
    allValues: "",
    stateValues: [],
  },
  recordOption: {
    isShowDialog: false,
    userId: -1,
  },
  pagination: {
    sortBy: null, // 排序依據
    descending: false, // 升冪降冪
    page: 1, // 當前分頁
    rowsPerPage: 10, // 分頁筆數
    rowsNumber: 100, // 總共筆數
  },
  tableFilters: {
    pageNo: 1,
    pageSize: 10,
    rowsNumber: 10, // 總共筆數
    sortBy: "id", // 排序依據
    orderBy: "DESC", // 升冪降冪
  },
  showSearch: false,
});
const init = () => {
  getData();
};
init();
</script>
