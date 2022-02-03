<template>
  <div class="chatlist">
    <ChatButton v-for="chat in chats" v-bind:chat="chat" v-bind:key="chat.id" />
    <AddChatButton v-bind:token="token"></AddChatButton>
  </div>
</template>

<script>
import ChatButton from "./ChatButton.vue";
import AddChatButton from "./AddChatButton.vue";
export default {
  name: "ChatList",
  components: { AddChatButton, ChatButton },
  props: ["chats", "token"],
};
</script>

<style scoped>
.chatlist {
  display: flex;
  flex-direction: column;
}
:deep(.chatButton),
:deep(.addChatButton) {
  text-align: center;
  padding: 5px;
  width: 30px;
  height: 30px;
  margin: 5px;
  border-radius: 10px;
  color: var(--color-text-highlight);
  background: var(--color-background-mute);
}
</style>
