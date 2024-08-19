<template>
  <float
    :default-position="state.defaultPosition"
    :position-type="state.positionType"
    @on-click="onExpansionItemClick"
    cursor="default"
  >
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="Account settings"
      caption="John Doe"
      class="float-info"
      ref="expansionItem"
      expand-icon-toggle
      v-model="state.isExpanded"
    >
      <template v-slot:expand-icon="props">
        <div class="expand-icon-wrapper">
          <q-icon :name="props.expanded ? 'expand_less' : 'expand_more'" />
          <div class="expand-icon-overlay" @click.stop.prevent></div>
        </div>
      </template>
      <template #header>
        <q-item-section avatar>
          <q-avatar>
            <q-icon color="amber" name="notifications_active" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          {{ t("notice.type.total") }} <strong>{{ state.noticeLength }}</strong>
        </q-item-section>
      </template>
      <q-card>
        <q-list>
          <q-separator />
          <q-item
            v-for="([, value], index) in Object.entries(notices)"
            :key="`notice-${index}`"
            class="float-info-item"
          >
            <q-item-section>{{ t(value.name) }}</q-item-section>
            <q-item-section>
              <q-badge :color="index % 2 === 0 ? 'primary' : 'negative'">
                {{ value.list.length }}
              </q-badge>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-expansion-item>
  </float>
</template>
<script setup>
import float from "@/widgets/action/float.vue";
import { useI18n } from "@/services/i18n-service.js";

const { t } = useI18n();

const expansionItem = ref(null);

const state = reactive({
  defaultPosition: {
    x: 0,
    y: 51,
  },
  noticeLength: computed(() => {
    let total = 0;
    for (const [, value] of Object.entries(notices)) {
      total += value.list.length;
    }
    return total;
  }),
  positionType: "fixed",
  isExpanded: false,
});

// 通知的資料 需要新增通知時，請在此處新增會自動新增到通知列表中
const notices = reactive({
  applyQuota: { name: "notice.type.apply", list: ["fake data"] },
  withdrawNotify: {
    name: "notice.type.withdraw",
    list: ["fake data", "fake data"],
  },
  transferNotify: { name: "notice.type.bank", list: [] },
  identifyNotify: {
    name: "notice.type.identity",
    list: ["fake data", "fake data", "fake data"],
  },
});

const setDefaultPositionX = () => {
  const documentWidth = document.querySelector(".layout-default").offsetWidth;
  const currentElementWidht = document.querySelector(".float-info").offsetWidth;
  state.defaultPosition.x = documentWidth - currentElementWidht;
};

const onExpansionItemClick = () => {
  expansionItem.value.toggle();
  // console.log("isMobile", isMobile);
  // 因為手機端點擊後有bug，所以利用JS強制觸發開關
  // if (isMobile) {
  //   expansionItem.value.toggle();
  // }
};

defineExpose({
  onExpansionItemClick,
});

onMounted(() => {
  setDefaultPositionX();
});
</script>

<style scoped lang="scss">
.float-info {
  width: 250px;
  background: #ffffff;
  border: 1.5px solid #e9e7ee;
  :deep(.q-expansion-item__container) {
    .q-item {
      height: 48px;
    }
  }
  //.q-expansion-item__container {
  //  .q-item {
  //    height: 48px;
  //  }
  //}

  .body--dark & {
    background: #1e1e1e;
    border: 1.5px solid #2d2d2d;
  }
}
:deep(.float-info-item) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  &:hover {
    background: #f5f5f5;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
// 使用偽元素覆蓋整個q-item，讓展開及縮放只通過JS觸發
:deep(.q-item) {
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    cursor: pointer;
    //background: red;
  }
}
</style>
