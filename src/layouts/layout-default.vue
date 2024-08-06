<template>
  <q-layout class="layout-default" view="hHh LpR fFf">
    <q-header
      class=""
      :style="$q.dark.isActive ? 'background: #2D2D2D;' : 'background: white;'"
      height-hint="98"
      :class="$q.dark.isActive ? 'white--text' : 'tw-text-616161'"
      style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          :icon="state.OpenDrawer ? 'menu_open' : 'menu'"
          @click="state.OpenDrawer = !state.OpenDrawer"
        />
        <q-icon class="ml-1" size="md" name="admin_panel_settings" />
        <b>Admin Panel</b>
        <q-space />
        <q-icon
          size="sm"
          color="orange-4"
          name="hourglass_top"
          class="spinning mr-1"
        >
          <q-tooltip
            anchor="bottom middle"
            self="top middle"
            :offset="[10, 10]"
          >
            <span>{{ t("Expiration") }}：</span>
            <span>{{ expireTime }}</span>
          </q-tooltip>
        </q-icon>
        <q-btn
          color=""
          flat
          dense
          round
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          @click="$q.dark.toggle()"
        />
        <!-- 多語系 -->
        <q-btn
          padding="5px"
          color=""
          class="ml-1"
          icon="g_translate"
          flat
          round
        >
          <q-menu transition-show="jump-down" transition-hide="jump-up" fit>
            <q-list>
              <q-item
                v-for="(item, idx) in Object.keys(langs)"
                :key="idx"
                v-close-popup
                active-class="blue lighten-1 white--text"
                :class="$q.dark.isActive ? 'white--text' : ''"
                class="row items-center text-no-wrap"
                :active="i18nLang === item"
                clickable
                @click="changeI18nLang(item)"
              >
                <q-avatar v-if="item === 'en'" size="30px">
                  <img src="@/assets/images/country/US.png" />
                </q-avatar>
                <q-avatar v-else-if="item === 'zh-tw'" size="30px">
                  <img src="@/assets/images/country/TW.png" />
                </q-avatar>
                <span class="q-ml-md">{{ item }}</span>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat dense rounded size="16px" padding="3px 10px" no-caps>
          <div class="d-flex align-center flex-nowrap">
            <div style="border: 2.5px solid #21ba45" class="rounded-circle">
              <q-avatar v-if="userData?.profileImg" size="lg">
                <img :src="userData?.profileImg" />
              </q-avatar>
              <q-icon v-else size="lg" color="success" name="account_circle" />
            </div>
            <div class="d-flex flex-column align-start justify-start ml-1">
              <small class="text-weight-bold" style="line-height: 14px">
                {{ userData?.nickName || t("NoNickName") }}
              </small>
              <small
                :class="$q.dark.isActive ? 'text-blue-grey-3' : 'grey--text'"
                class="text-weight-bold"
                style="line-height: 14px"
                >{{ userData.username }}</small
              >
            </div>
          </div>
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list dense bordered class="pa-1">
              <!-- <q-item v-ripple tag="label" class="rounded-lg">
                <q-item-section>
                  <div class="d-flex flex-row align-center text-left">
                    <q-icon size="16px" class="mr-2" name="portrait"></q-icon>
                    <span>{{ t('ProfilePicture') }}</span>
                  </div>
                </q-item-section>
              </q-item> -->

              <q-item
                v-ripple
                tag="label"
                class="rounded-lg mt-1"
                @click="CallResetPasswordDialog"
              >
                <q-item-section>
                  <div class="d-flex flex-row align-center text-left">
                    <q-icon size="16px" class="mr-2" name="vpn_key"></q-icon>
                    <span>{{ t("ResetPassword") }}</span>
                  </div>
                </q-item-section>
              </q-item>
              <q-item
                v-if="false"
                v-ripple
                tag="label"
                class="rounded-lg mt-1"
                @click="CallResetNicknameDialog"
              >
                <q-item-section>
                  <div class="d-flex flex-row align-center text-left">
                    <q-icon size="16px" class="mr-2" name="vpn_key"></q-icon>
                    <span>{{ t("ChangeNickname") }}</span>
                  </div>
                </q-item-section>
              </q-item>

              <q-separator class="my-1" />

              <q-item v-ripple tag="label" class="rounded-lg red white--text">
                <q-item-section @click="Logout()">
                  <div
                    class="d-flex flex-row align-center text-left justify-center"
                  >
                    <q-icon size="16px" class="mr-2" name="logout"></q-icon>
                    <span>{{ t("LogOut") }}</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="state.OpenDrawer"
      show-if-above
      side="left"
      bordered
      :width="250"
    >
      <!-- drawer content -->
      <DrawerRouter />
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <slot />
      </q-page>
    </q-page-container>

    <div class="listen">
      <!-- <audio hidden :src="audioSrc" id="audioPoint" /> -->
      <audio hidden ref="audioPlayer" :src="audioSrc" controls />
    </div>
  </q-layout>
</template>

<script setup>
import DrawerRouter from "@/widgets/layout/DrawerRouter.vue";
import ResetPassword from "@/widgets/layout/dialog/ResetPassword.vue";
import ResetNickname from "@/widgets/layout/dialog/ResetNickname.vue";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { useQuasar } from "quasar";
import dayjs from "dayjs";
import soundFile from "@/assets/audio/170.mp3";
import { useI18n } from "@/services/i18n-service";
// import { getImageUrl } from "@/utils/getImageUrl";

const audioSrc = ref(soundFile);
const { t } = useI18n();
const audioPlayer = ref(null);
const appStore = useAppStore();
const authStore = useAuthStore();
const { i18nLang, langs } = storeToRefs(appStore);
const { changeI18nLang } = appStore;
const userData = authStore.userData;

const $q = useQuasar();
const expireTime = computed(() => {
  const ExpiredTimeStr = localStorage.getItem("admin_expiredTime") || null;
  if (ExpiredTimeStr && ExpiredTimeStr !== "undefined") {
    const ExpiredTime = parseInt(ExpiredTimeStr, 10);
    return dayjs.unix(ExpiredTime).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return "";
  }
});

let state = reactive({
  OpenDrawer: true,
  SlideTransferApplyDialog: {
    Open: false,
    Data: [],
    // 表格標題
    HeaderRow: [
      { name: "username", field: "username", label: "Username", align: "left" }, // 用戶名
      { name: "nickName", field: "nickName", label: "Nickname", align: "left" }, // 暱稱
      { name: "memo", field: "memo", label: "UserNote", align: "left" }, // 會員備註
      {
        name: "transferType",
        field: "transferType",
        label: "Type",
        align: "left",
      }, // 操作類型
      {
        name: "paymentTypeName",
        field: "paymentTypeName",
        label: "ApplicationMethod",
        align: "left",
      }, // 申請方式
      { name: "amount", field: "amount", label: "Credit", align: "left" }, // 積分
      {
        name: "createdAt",
        field: "createdAt",
        label: "CreatedAt",
        align: "left",
      }, // 申請時間
      { name: "statusCN", field: "statusCN", label: "State", align: "left" }, // 狀態
      {
        name: "Operation",
        field: "Operation",
        label: "Operation",
        align: "left",
      }, // 操作
    ],
    IsBtnActionLoading: false,
  },
});

// const playAudio = () => {
//   if (audioPlayer.value) {
//     const playPromise = audioPlayer.value.play();
//     if (playPromise !== undefined) {
//       playPromise
//         .then(() => {
//           // console.log('播放音效');
//         })
//         .catch((error) => {
//           console.error("播放音效失敗:", error);
//         });
//     }
//   }
// };

const Logout = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_expiredTime");
  window.location.reload();
};

const CallResetPasswordDialog = () => {
  $q.dialog({
    component: ResetPassword,
  });
};

const CallResetNicknameDialog = () => {
  $q.dialog({
    component: ResetNickname,
  });
};
</script>

<style lang="scss">
.body--dark {
  .q-item.q-router-link--active,
  .q-item--active {
    background: #334e59;
    color: white !important;
  }
}

.body--light {
  .q-item.q-router-link--active,
  .q-item--active {
    background: #e7f2f9;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinning {
  animation: spin 2s linear infinite;
}
</style>
