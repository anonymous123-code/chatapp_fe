<template>
  <div class="messageInput">
    <input v-model="message" v-on:keydown.enter="sendMessage" />
    <button v-on:click="sendMessage">Send</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MessageSendInput",
  data: () => {
    return { message: "" };
  },
  methods: {
    sendMessage() {
      let auth = "Bearer " + this.token;
      axios.post(
        `http://localhost:8000/chats/${this.$route.params.chatId}/messages/`,
        {},
        {
          params: { msg: this.message },
          headers: {
            Authorization: auth,
          },
        }
      );
      this.message = "";
    },
  },
  props: ["token"],
};
</script>

<style scoped>
.messageInput {
  height: 30px;
  display: flex;
  flex-direction: row;
}
.messageInput input {
  flex-grow: 1;
}
</style>
