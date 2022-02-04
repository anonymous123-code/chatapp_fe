<template>
  <VButton v-on:click="generate" title="Generate Invite"
    >Generate Invite</VButton
  >
  <VDialog v-model:visible="visible">
    <div style="padding: 10px">Invite: {{ invite }}</div>
  </VDialog>
</template>

<script>
import axios from "axios";
import VButton from "@/components/abstract/VButton.vue";
import VDialog from "@/components/abstract/VDialog.vue";

export default {
  name: "ChatGenerateInvite",
  components: { VDialog, VButton },
  props: ["token"],
  data: () => {
    return {
      visible: false,
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
          this.visible = true;
          this.invite = response.data.invite;
        });
    },
  },
};
</script>

<style scoped></style>
