<template>
  <div>
    {{ helloWorld }}
    <q-icon name="lock"></q-icon>
  </div>
</template>
<script setup>
const helloWorld = ref("Hello, World!");
</script>
