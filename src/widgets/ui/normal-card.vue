<template>
  <q-card class="normal-card" :class="[customClass]">
    <q-card-section class="normal-card-title">
      <h4>{{ title }}</h4>
    </q-card-section>
    <!--    <q-separator />-->
    <q-card-section class="normal-card-content">
      <slot></slot>
    </q-card-section>
  </q-card>
</template>
<script setup>
defineProps({
  title: String,
  customClass: String,
});
</script>
<style lang="scss">
$padding-form: 6px;
.normal-card {
  width: 100%;
  &-title {
    padding-top: $padding-form;
    padding-bottom: $padding-form;
  }
  &-content {
    padding-top: 0;
  }
}
</style>
