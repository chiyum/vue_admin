<template>
  <q-card class="chat-box">
    <q-toolbar class="chat-box-toolbar">
      <q-avatar size="60px">
        <q-img :src="avatarSrc" />
      </q-avatar>
      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
    <q-card-section>
      <div
        class="chat-box-messages"
        style="width: 100%"
        :style="{ height: height }"
        ref="msgContainer"
      >
        <q-chat-message
          v-for="(chat, index) in state.chatList"
          :key="`chat-${index}`"
          :name="chat.name"
          :avatar="chat.avatar"
          :text="[chat.text]"
          :sent="chat.isSent"
          :stamp="chat.stamp"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="chat-textarea col-12 col-md-7">
        <q-input
          v-model="state.chatContent"
          clearable
          :bg-color="$q.dark.isActive ? 'dark' : 'white'"
          input-style="max-height:95px; overflow-y:auto; resize: none;"
          placeholder="Enter content..."
          outlined
          type="textarea"
          @keyup.enter="sendMessage($event)"
        >
          <template #append>
            <q-btn
              :disable="!state.chatContent"
              color="primary"
              icon="send"
              flat
              round
              padding="5px"
              @click="sendMessage($event)"
            />
          </template>
        </q-input>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { messages } from "@/constants/chat.js";

defineProps({
  height: {
    type: String,
    default: "300px",
  },
  title: {
    type: String,
    default: "Chat Box",
  },
  avatarSrc: {
    type: String,
    default: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
});

const state = reactive({
  chatContent: "",
  chatList: [...messages],
});

const msgContainer = ref(null);

const sendMessage = (event) => {
  if (state.chatContent.trim() === "" || event.shiftKey) return;
  const newMessage = {
    name: "me",
    avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
    text: state.chatContent,
    isSent: true,
    stamp: "now",
  };
  state.chatList.push(newMessage);
  state.chatContent = "";
};

watch(
  () => state.chatList,
  () => {
    if (msgContainer.value) {
      nextTick(() => {
        msgContainer.value.scrollTop = msgContainer.value.scrollHeight;
      });
    }
  },
  {
    deep: true,
  }
);
</script>
<style scoped lang="scss">
.chat-box {
  display: flex;
  flex-direction: column;
  &-messages {
    overflow-y: scroll;
  }
  &-toolbar {
    padding: 10px;
    background: #e43371;
    color: #ffffff;
  }
}
</style>
