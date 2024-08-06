<template>
  <div
    class="flex justify-center items-center q-electron-drag"
    style="
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    "
  >
    <div
      class="row electron-hide"
      :class="
        $q.dark.isActive
          ? 'shadow-20 dark-card-background'
          : 'base-card-shadow normal-card-background'
      "
      style="
        width: 60vw;
        min-width: 300px;
        position: relative;
        padding: 25px 0;
        border-radius: 8px;
      "
    >
      <!-- 多語系 -->
      <q-btn
        padding="5px"
        style="z-index: 999"
        color="primary"
        class="absolute-top-right mr-2 mt-2"
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
      <q-btn
        color=""
        padding="5px"
        style="z-index: 999"
        class="absolute-top-left ml-2 mt-2"
        flat
        dense
        round
        :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        @click="$q.dark.toggle()"
      />
      <div
        v-show="$q.screen.gt.sm"
        class="col-6 flex justify-center items-center"
      >
        <Vue3Lottie
          animation-link="https://lottie.host/0a647627-a7c1-4978-aa0e-00b62c05637c/e6W3fHNTdx.json"
          height="70%"
          width="50%"
        />
      </div>
      <q-separator v-if="$q.screen.gt.sm" vertical inset />
      <div class="col flex justify-center items-center mainCard my-auto">
        <q-card
          square
          style="min-width: 290px; height: 100%; width: 60%"
          class="no-shadow"
          :style="$q.dark.isActive ? 'background: #121212;' : ''"
        >
          <q-card-section align="center" @keypress.enter="onLogin()">
            <q-form class="q-gutter-md">
              <h4
                class="mt-5 py-5 justify-center no-margin d-flex align-center text-blue ENFont"
              >
                {{ t("global.BackstageLogin") }}
              </h4>
              <q-input
                ref="username"
                v-model.trim="state.LoginData.Username"
                tabindex="1"
                autofocus
                clearable
                clear-icon="mdi-close-circle"
                app
                filled
                :label="t('global.Username')"
                lazy-rules
              >
                <template #prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>

              <q-input
                ref="password"
                v-model.trim="state.LoginData.Password"
                autocomplete="on"
                tabindex="2"
                :type="state.ShowPwd ? 'text' : 'password'"
                clearable
                clear-icon="mdi-close-circle"
                :disable="state.Loading"
                filled
                :label="t('global.Password')"
                lazy-rules
              >
                <template #prepend>
                  <q-icon name="vpn_key" />
                </template>
                <template #append>
                  <q-btn
                    padding="0"
                    flat
                    round
                    @click="state.ShowPwd = !state.ShowPwd"
                  >
                    <q-icon
                      :name="state.ShowPwd ? 'visibility' : 'visibility_off'"
                    />
                  </q-btn>
                </template>
              </q-input>

              <div class="text-center">
                <q-btn
                  class="logon-btn bg-logon-card-input"
                  text-color="white"
                  unelevated
                  label=""
                  style="font-size: large"
                  :loading="state.Loading"
                  @click="onLogin()"
                >
                  <span>{{ t("global.Login") }}</span>
                  <q-icon class="ml-1" size="xs" name="login" />
                  <template #loading>
                    <q-spinner-hourglass class="on-left" />
                    {{ t("global.Loading") }}...
                  </template>
                </q-btn>
              </div>

              <p class="text-grey" align="left">
                {{ t("global.BackstageSystem") }}
              </p>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Vue3Lottie } from "vue3-lottie";
import { useQuasar } from "quasar";
import { useI18n } from "@/services/i18n-service";
import { defineOptions } from "vue";
import { useAppStore } from "@/store/app-store";
import { fackLogin } from "@/utils/fackAPI";
// import { storeToRefs } from "pinia"
const appStore = useAppStore();
const { i18nLang, langs } = storeToRefs(appStore);
const { changeI18nLang } = appStore;

defineOptions({
  layout: "layout-login",
  isHideSidebar: true,
  // customOptions: {
  //   icon: "login",
  // },
});

const router = useRouter();
const $q = useQuasar();
const { t } = useI18n();

const state = reactive({
  Loading: false,
  ShowPwd: false,
  LoginData: {
    Username: "",
    Password: "",
  },
  RememberPwd: false,
});

const onLogin = async () => {
  state.Loading = true;
  fackLogin()
    .then((r) => {
      const { data: res } = r;
      localStorage.setItem("admin_token", res.data.token);
      router.push("/home");
    })
    .catch(() => {})
    .finally(() => (state.Loading = false));
};
</script>
