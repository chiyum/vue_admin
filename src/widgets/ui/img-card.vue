<template>
  <q-card class="my-card">
    <img :src="src" />

    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2">{{ tip }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ text }}
    </q-card-section>
  </q-card>
</template>
<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  tip: {
    type: String,
    default: "",
  },
});
</script>
