<template>
  <div class="card">
    <div class="header">
      <span class="icon">
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </span>
      <p class="alert">{{ title }}</p>
    </div>

    <p class="message">
      {{ text }}
    </p>

    <div class="actions">
      <div class="btn read" @click="$emit('confirm')">
        {{ t(confirmBtnText) }}
      </div>
      <div class="btn mark-as-read" @click="$emit('cancel')">
        {{ t(cancelBtnText) }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "@/services/i18n-service.js";
const { t } = useI18n();
defineEmits(["confirm", "cancel"]);
defineProps({
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  confirmBtnText: {
    type: String,
    default: "global.Confirm",
  },
  cancelBtnText: {
    type: String,
    default: "global.Cancel",
  },
});
</script>
<style scoped lang="scss">
.card {
  //max-width: 320px;
  border-width: 1px;
  border-color: rgba(219, 234, 254, 1);
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 1);
  padding: 1rem;
  .body--dark & {
    background: rgb(29 29 29);
    border-color: rgb(64 71 81);
  }
}

.header {
  display: flex;
  align-items: center;
  grid-gap: 1rem;
  gap: 1rem;
}

.icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: rgba(96, 165, 250, 1);
  padding: 0.5rem;
  color: rgba(255, 255, 255, 1);
}

.icon svg {
  height: 1rem;
  width: 1rem;
}

.alert {
  font-weight: 600;
  color: rgba(107, 114, 128, 1);
  .body--dark & {
    color: #ffffff;
  }
}

.message {
  white-space: pre-wrap;
  margin-top: 1rem;
  min-height: 40px;
  max-height: 80px;
  overflow-y: scroll;
  color: rgba(107, 114, 128, 1);
  .body--dark & {
    color: #ffffff;
  }
}

.actions {
  margin-top: 1.5rem;
}

.actions .btn {
  text-decoration: none;
  cursor: pointer;
}

.mark-as-read,
.read {
  display: inline-block;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}

.read {
  background-color: rgba(59, 130, 246, 1);
  color: rgba(255, 255, 255, 1);
}

.mark-as-read {
  margin-top: 0.5rem;
  background-color: rgba(249, 250, 251, 1);
  color: rgba(107, 114, 128, 1);
  transition: all 0.15s ease;
}

.mark-as-read:hover {
  background-color: rgb(230, 231, 233);
}
</style>
