<template>
  <div class="chat">
    <div style="width: 100%">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :text="['hey, how are you?']"
        sent
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="[`doing fine, how r you?`]"
        stamp="4 minutes ago"
      />
    </div>
    <div class="chat-textarea col-12 col-md-7">
      <q-input
        v-model="state.chatContent"
        clearable
        :bg-color="$q.dark.isActive ? 'dark' : 'white'"
        input-style="max-height:95px; overflow-y:auto; resize: none;"
        grow
        placeholder="Enter content..."
        filled
        type="textarea"
        @keydown.enter="sendMessage"
      >
        <template #append>
          <q-btn
            :disable="!state.chatContent"
            color="primary"
            icon="send"
            flat
            round
            padding="5px"
            @click="sendMessage(null)"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>
<script setup>
const state = {
  chatContent: "",
};

const sendMessage = () => {
  console.log("send message");
};
</script>
<style scoped lang="scss"></style>
