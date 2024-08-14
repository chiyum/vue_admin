<template>
  <q-card class="user-card">
    <q-img :src="bgSrc" />
    <q-card-section>
      <q-avatar size="100px">
        <img alt="user" :src="photoSrc" />
      </q-avatar>
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2 user-card-tip">{{ text }}</div>
      <q-btn
        color="primary"
        push
        v-if="showAction"
        class="user-card-action mt-3"
        >{{ actionBtnText }}</q-btn
      >
    </q-card-section>
  </q-card>
</template>
<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
  photoSrc: {
    type: String,
    default: "",
  },
  bgSrc: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  actionBtnText: {
    type: String,
    default: "",
  },
  showAction: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" scoped>
.user-card {
  position: relative;
  .q-avatar {
    position: absolute;
    bottom: 95%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 50% !important;
  }
  .q-card__section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;
  }
  &-tip {
    color: #867a7a;
  }
  &-photo {
  }
}
</style>
