<template>
  <div>
    {{ helloWorld }}{{ route.params }}
    <q-icon name="lock"></q-icon>
  </div>
</template>
<script setup>
import { defineOptions } from "vue";
defineOptions({
  customOptions: {
    test: "test",
  },
});
/** 路由說明 */
const route = useRoute();
const helloWorld = ref("Hello, World!");
</script>
