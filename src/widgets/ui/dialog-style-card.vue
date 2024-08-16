<template>
  <q-card class="default-dialog-card">
    <q-card-section class="default-dialog-card-icon" v-if="icon !== ''">
      <slot name="icon">
        <svg
          aria-hidden="true"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          class="default-dialog-card-icon-content warning"
          v-if="icon === 'warning'"
        >
          <path
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
        <div
          v-else-if="icon === 'success'"
          class="default-dialog-card-icon-content success"
        >
          <q-icon name="done" color="white" size="3rem"></q-icon>
        </div>
        <div
          v-else-if="icon === 'error'"
          class="default-dialog-card-icon-content error"
        >
          <q-icon name="priority_high" color="negative" size="3rem"></q-icon>
        </div>
      </slot>
    </q-card-section>
    <q-card-section class="default-dialog-card-title">
      <slot name="title">
        {{ title }}
      </slot>
    </q-card-section>
    <q-card-section class="default-dialog-card-main">
      <slot name="main">
        {{ message }}
      </slot>
    </q-card-section>
    <q-card-actions align="center" class="default-dialog-card-action">
      <slot name="actions">
        <q-btn color="primary" label="確定" @click="onConfirm" />
        <q-btn color="negative" label="取消" @click="onCancel" />
      </slot>
    </q-card-actions>
  </q-card>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["confirm", "cancel"]);
const onConfirm = () => {
  emit("confirm");
};

const onCancel = () => {
  emit("cancel");
};
</script>

<style scoped lang="scss">
.default-dialog-card {
  width: 512px;
  border-radius: 20px;
  &-title,
  &-icon,
  &-main,
  &-action {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: justify;
  }

  &-icon {
    padding-top: 3rem;
    padding-bottom: 20px;
    &-content {
      width: 6rem;
      height: 6rem;
      &.warning {
        color: #f8bb86;
        animation: dialog-warning 0.5s;
      }
      &.success {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(92, 225, 133);
        background: linear-gradient(
          127deg,
          rgba(92, 225, 133, 1) 0%,
          rgba(185, 252, 174, 1) 100%
        );
        border-radius: 50%;
        animation: dialog-success 0.5s;
      }
      &.error {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #c10015;
        border-radius: 50%;
        animation: rotate-center 0.5s ease-in-out both;
      }
    }
  }

  &-title {
    //padding-top: 2px;
    padding-bottom: 0;
    font-size: 1.875em;
    color: #545454;
  }

  &-main {
    padding: 1rem 3.2rem 1.85rem;
    color: #6b7280;
    font-size: 1rem;
  }

  &-action {
    padding-bottom: 30px;
    .q-btn {
      padding: 0.5rem 2rem;
    }
  }
}
</style>
