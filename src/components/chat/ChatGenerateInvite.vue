<template>
  <button v-on:click="generate" title="Generate Invite">Generate Invite</button>
  <div v-if="invite.length > 0">Invite: {{ invite }}</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatGenerateInvite",
  props: ["token"],
  data: () => {
    return {
      invite: "",
    };
  },
  methods: {
    generate() {
      axios
        .post(
          `http://localhost:8000/chats/${this.$route.params.chatId}/invite`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.invite = response.data.invite;
        });
    },
  },
};
</script>

<style scoped></style>
