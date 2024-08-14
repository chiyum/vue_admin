<template>
  <div class="table-demo">
    <!-- <q-inner-loading :showing="state.isLoading" label-class="text-teal" label-style="font-size: 1.1em" color="primary" style="z-index: 100;" /> -->
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
      <!--   手機版本篩選    -->
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
      <!--  電腦版本篩選｀    -->
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
      <!--   自定義row欄位顯示及處理   -->
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
      v-model="state.detailOption.isShowDialog"
      :title="t('global.MemberData')"
      :has-action="false"
      @dismiss="onUserDetailtDialogClose"
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
              v-model="state.detailOption.detail.username"
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
  </div>
</template>
<script setup>
import axios from "@/services/http-service";
import getImageUrl from "@/utils/getImageUrl";
import DataTable from "@/widgets/action/dataTable.vue";
import DateAndTime from "@/widgets/action/dateAndTime.vue";
import { filterReservedKeys, formattedAmount } from "@/utils/globalFns";
import dayjs from "dayjs";
// import { useAuthStore } from "@/store/auth-store";
// import { storeToRefs } from "pinia";
import { useI18n } from "@/services/i18n-service";
import AddAccounting from "@/widgets/action/addAccountingAmout.vue";
import CustomDialog from "@/widgets/action/customDialog.vue";
import { useQuasar } from "quasar";

const { t } = useI18n();
const $q = useQuasar();

const state = reactive({
  columns: [
    {
      label: "global.Avatar",
      field: "Avatar",
      name: "profileImg",
      align: "center",
    }, // 頭像
    { label: "global.UserId", field: "UserId", name: "userId", align: "left" }, // 會員編號
    {
      label: "global.Username",
      field: "Username",
      name: "username",
      align: "left",
    }, // 用戶名
    {
      label: "global.Nickname",
      field: "Nickname",
      name: "nickname",
      align: "left",
    }, // 暱稱
    {
      label: "global.Balance",
      field: "Balance",
      name: "balance",
      align: "left",
    }, // 餘額
    /** 以下開始特殊icon */
    {
      label: "global.Identity",
      field: "Identity",
      name: "subAgentLevel",
      align: "left",
    }, // 用戶身份 0是普通會員 1.2.3為各級代理
    {
      label: "global.RoomState",
      field: "RoomState",
      name: "roomState",
      align: "left",
    }, // 房間狀態 禁言 or 禁止加入房間 兩者為false時為正常
    {
      label: "global.UserNote",
      field: "UserNote",
      name: "memo",
      align: "left",
    }, // 會員備註
    {
      label: "global.Operation",
      field: "Actions",
      name: "actions",
      align: "center",
    }, // 操作
  ],
  rows: [],
  isLoading: false,
  detailOption: {
    isShowDialog: false,
    detail: {
      userId: -1,
      username: "帳號",
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
};
// const authStore = useAuthStore();
// const { userData } = storeToRefs(authStore);
const updateAccounting = (id, username) => {
  $q.dialog({
    component: AddAccounting,
    componentProps: {
      id,
      username,
    },
  }).onOk(({ selectValue, inputValue, memo }) => {
    state.isLoading = true;
    const options = {
      Deposit: 9,
      Withdraw: 10,
    };
    axios
      .post("/admin/forceTransfer", {
        agentId: 1,
        userId: id,
        transferType: options[selectValue.value],
        amount: inputValue,
        memo: memo,
      })
      .then(() => {
        getData();
      })
      .finally(() => {
        state.isLoading = false;
      });
  });
};
/** 禁言與否 */
const disableChat = (id, isMuted) => {
  $q.dialog({
    title: t("global.ConfirmMute"),
    message: t("global.EnableMute"),
    ok: t("global.Confirm"),
    cancel: t("global.Cancel"),
  }).onOk(() => {
    state.isLoading = true;
    axios
      .post("/admin/muteUser", {
        agentId: 1,
        userId: id,
        isMuted: !isMuted,
      })
      .then(() => {
        getData();
      })
      .catch(() => {
        state.isLoading = false;
      });
  });
};
/** 禁止進入房間與否 */
const disableEnterRoom = (id, isDisabledRoom) => {
  $q.dialog({
    title: t("ConfirmEnable"),
    message: t("EnableJoinRoom"),
    ok: t("Confirm"),
    cancel: t("Cancel"),
  }).onOk(() => {
    state.isLoading = true;
    axios
      .post("/admin/disableRoomEntryForUser", {
        agentId: 1,
        userId: id,
        isDisabledRoom: !isDisabledRoom,
      })
      .then(() => {
        getData();
      })
      .catch(() => {
        state.isLoading = false;
      });
    // console.log('OK', res);
  });
};
/** 取得用戶詳細資料 */
const getUserInfo = (userId) => {
  state.isLoading = true;
  axios
    .get("/admin/getUserInfo", {
      params: {
        agentId: 1,
        userId: userId,
      },
    })
    .then(({ data }) => {
      if (data.code === 0) {
        state.detailOption.detail = data.data;
        state.detailOption.isShowDialog = true;
      } else {
        $q.notify({
          message: "error",
          color: "negative",
        });
      }
    })
    .finally(() => {
      state.isLoading = false;
    });
};
const setAgent = (userId) => {
  state.isLoading = true;
  axios
    .post("/admin/setAgent", {
      agentId: 1,
      userId,
    })
    .then(() => {
      getData();
    })
    .catch(() => {
      state.isLoading = false;
    });
};
/** 刪除用戶 @todo 目前mockServer那邊刪除會有bug 暫時改成前端手動修改 */
const deliteUser = (userId, account) => {
  $q.dialog({
    title: t("global.ConfirmDelete"),
    message: `${t("global.ConfirmDelete")}${account}?`,
    ok: t("global.Confirm"),
    cancel: t("global.Cancel"),
  }).onOk(() => {
    state.isLoading = true;
    axios
      .post("/admin/deleteUser", {
        agentId: 1,
        userId,
      })
      .then(() => {
        getData();
      })
      .catch(() => {
        state.isLoading = false;
      });
  });
};

const onUserDetailtDialogClose = ({ isConfirm }) => {
  console.log(isConfirm, "isConfirm");
};
const init = () => {
  getData();
};
init();
</script>
