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
  border-radius: 7px;
  background-color: var(--color-background-soft);
  display: flex;
  flex-direction: row;
  cursor: text;
  margin: 3px;
}

.messageInput:focus-within {
  background-color: var(--color-background-mute);
}

.messageInput * {
  background: transparent;
  border-width: 0;
  color: var(--color-text);
  margin: 5px;
}

.messageInput input {
  border-bottom: 2px hidden #ddd0;
  flex-grow: 1;
  outline: none;
}
.messageInput button {
  cursor: pointer;
  margin: 0;
  padding: 5px;
  border-radius: 7px;
}
.messageInput button:hover {
  background-color: #aaa2;
}
.messageInput input:focus-within {
  border-bottom: 2px solid #aaa2;
}

@media (prefers-color-scheme: dark) {
  .messageInput input:focus-within {
    border-bottom: 2px solid #ddd2;
  }
  .messageInput button:hover {
    background-color: #fff1;
  }
}
</style>
