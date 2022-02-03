<template>
  <div class="message">
    <span class="username">{{ message.author.username }}</span>
    <span class="editMenu">
      <button>Edit</button>
      <button v-on:click="deleteMessage">Delete</button>
    </span>
    <div>{{ message.content }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatMessage",
  data: () => {
    return {
      console: console,
    };
  },
  props: ["message", "token"],
  methods: {
    deleteMessage() {
      let token = this.token;
      let auth = "Bearer " + token;
      axios.delete(
        `http://localhost:8000/chats/${this.$route.params.chatId}/messages/${this.message.id}`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
    },
  },
};
</script>

<style scoped>
.message .editMenu {
  display: none;
  float: right;
}
.message:hover .editMenu {
  display: inline;
}

.message:hover {
  background: rgba(var(--color-background-soft-tupel), 64);
}

.message .username {
  font-weight: bold;
}
</style>
