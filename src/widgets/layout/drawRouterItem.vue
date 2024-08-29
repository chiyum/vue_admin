<template>
  <div>
    <!--
  routers
  q-item為無下拉選單的item
  q-expansion-item為有下拉選單的item
 -->
    <q-item
      v-if="!item.children"
      clickable
      :to="item.path"
      class="rounded-xl px-2"
      dense
    >
      <div class="d-flex align-center">
        <q-icon
          v-if="item?.meta?.sidebarIcon"
          :name="item?.meta?.sidebarIcon ?? 'description'"
          size="sm"
          class="mr-2"
        />
        <q-icon v-else name="radio_button_unchecked" size="12px" class="mr-2" />
        <span>{{ t(item.i18nName) }}</span>
      </div>
    </q-item>
    <q-expansion-item
      v-else
      dense
      header-class="rounded-xl px-2"
      expand-icon="arrow_drop_down"
      :icon="getParentIcon(item.i18nName) ?? 'folder'"
      :label="t(item.i18nName)"
      :content-inset-level="item.contentLevel"
    >
      <!--  若有子層遞迴該元件    -->
      <draw-router-item
        v-for="(child, index) in item.children"
        :key="child.i18nName + index"
        :item="child"
        @item-click="itemClick(item)"
      />
    </q-expansion-item>
  </div>
</template>

<script setup>
import { useI18n } from "@/services/i18n-service.js";
import { useAppStore } from "@/store/app-store.js";

// 定義 props
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const appStore = useAppStore();

const { t } = useI18n();

const state = reactive({
  openTabPages: computed(() => appStore.systemSetting.habit.isOpenTabPage),
});

const itemClick = (item) => {
  console.log(item, "itemClick");
  if (state.openTabPages) {
    appStore.onAddTabPage(item);
  }
};

/**
 * 設定父層icon
 * 若要設定則依照資料夾名稱設定對應的icon name
 * @param {String} iconName
 * @returns {String}
 */
const getParentIcon = (iconName) => {
  const removePrefixName = iconName.split(".")[1];
  switch (removePrefixName) {
    case "components":
      return "extension";
    default:
      return null;
  }
};
</script>
