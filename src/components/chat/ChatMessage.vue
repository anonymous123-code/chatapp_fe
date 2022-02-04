<template>
  <div class="message">
    <span class="username">{{ message.author.username }}</span>
    <span class="editMenu">
      <VButton>Edit</VButton>
      <VButton v-on:click="deleteMessage">Delete</VButton>
    </span>
    <div>{{ message.content }}</div>
  </div>
</template>

<script>
import axios from "axios";
import VButton from "@/components/abstract/VButton.vue";

export default {
  name: "ChatMessage",
  components: { VButton },
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
.editMenu button {
  display: inline-block;
}
.message:hover {
  background: rgba(var(--color-background-soft-tupel), 0.4);
}

.message .username {
  font-weight: bold;
}
</style>
