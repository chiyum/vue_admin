<template>
  <div class="layout-default">
    <LayoutHeader />
    <slot />
  </div>
</template>

<script>
import { useI18n } from "@/services/i18n-service";
import LayoutHeader from "@/widgets/layout/header.vue";
export default {
  components: {
    LayoutHeader,
  },
  setup() {
    const { t } = useI18n();
    // layout也可以做邏輯處理
    return {
      t,
    };
  },
};
</script>
