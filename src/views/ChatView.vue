<template>
  <div class="wrapper">
    <div class="leftContainer">
      <ChatList v-bind:chats="chats" v-bind:token="token" />
    </div>
    <!--suppress JSCheckFunctionSignatures -->
    <div class="centerContainer">
      <ChatMessageList
        v-if="chats.length > 0"
        v-bind:messages="
          (() => {
            let c = chats.find((e) => e.id === parseInt($route.params.chatId));
            return c ? c : { messages: [], members: [] };
          })().messages
        "
        v-bind:token="token"
      />
      <MessageSendInput v-bind:token="token"></MessageSendInput>
    </div>
    <!--suppress JSCheckFunctionSignatures -->
    <div class="leftContainer">
      <ChatGenerateInvite v-bind:token="token"></ChatGenerateInvite>
      <ChatUserList
        v-if="chats.length > 0"
        v-bind:users="
          (() => {
            let c = chats.find((e) => e.id === parseInt($route.params.chatId));
            return c ? c : { messages: [], members: [] };
          })().members
        "
      />
    </div>
  </div>
</template>

<script>
import ChatList from "@/components/chat/ChatList.vue";
import axios from "axios";
import ChatMessageList from "@/components/chat/ChatMessageList.vue";
import ChatUserList from "@/components/chat/ChatUserList.vue";
import MessageSendInput from "@/components/chat/MessageSendInput.vue";
import ChatGenerateInvite from "@/components/chat/ChatGenerateInvite.vue";

export default {
  name: "ChatView",
  components: {
    ChatGenerateInvite,
    MessageSendInput,
    ChatUserList,
    ChatMessageList,
    ChatList,
  },
  data: () => {
    return {
      chats: [],
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbm9ueW0iLCJleHAiOjE2NDM4ODk5Njd9.puHVkxpItsjZzglX2QwQ7oyMZARDkVw8isgn7LEyqSQ",
    };
  },
  created() {
    this.refreshChats();
    this.timer = setInterval(this.refreshChats, 1000);
  },
  methods: {
    refreshChats() {
      axios
        .get("http://localhost:8000/chats/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((resp) => {
          this.chats = resp.data;
        });
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },
  beforeUnmount() {
    this.cancelAutoUpdate();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  max-height: 100vh;
}
.centerContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  width: 50vw;
}
</style>
