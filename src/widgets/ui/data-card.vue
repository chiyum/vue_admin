<template>
  <q-card class="data-card">
    <q-card-section class="data-card-top">
      <q-icon
        class="data-card-icon"
        :name="icon || 'attach_money'"
        color="primary"
        size="24px"
      />
      <div>
        <h5 class="text-gray-8">{{ label }}</h5>
        <span>{{ text }}</span>
      </div>
    </q-card-section>
    <q-card-section class="data-card-bottom">
      <span @click="callback">
        {{ btnText }}
      </span>
    </q-card-section>
  </q-card>
</template>
<script setup>
defineProps({
  label: String,
  text: String,
  icon: String,
  btnText: String,
  callback: Function,
});
</script>

<style scoped lang="scss">
.data-card {
  &-top {
    display: flex;
    align-items: center;
    padding: 8px;
    h5 {
      font-size: 0.83rem;
      font-weight: 400;
      letter-spacing: 0.01786em;
      color: #616161;
    }
    span {
      margin-top: 4px;
      color: #000000;
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: 0.0125em;
    }
  }
  &-icon {
    padding: 24px;
  }
  &-bottom {
    padding: 16px 26px;
    color: #1976d2;
    font-weight: 500;
    background: #eeeeee;
  }
}
</style>
