<template>
  <div class="messageInput" v-on:click="$refs.chatInput.focus()">
    <input v-model="message" v-on:keydown.enter="sendMessage" ref="chatInput" />
    <button v-on:click.stop="sendMessage" ref="sendButton">Send</button>
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
      this.$refs.sendButton.blur();
      this.message = "";
    },
  },
  props: ["token"],
};
</script>

<style scoped>
.messageInput {
  height: 30px;
  border-radius: 5px;
  background-color: var(--color-background-soft);
  display: flex;
  flex-direction: row;
  cursor: text;
  padding: 5px;
}

.messageInput:focus-within {
  background-color: var(--color-background-mute);
}

.messageInput * {
  background: transparent;
  border-width: 0;
  color: var(--color-text);
}

.messageInput input {
  flex-grow: 1;
  outline: none;
}
.messageInput button {
  cursor: pointer;
}
.messageInput input:focus-within {
  border-bottom: 2px solid #ddf7;
}
</style>
