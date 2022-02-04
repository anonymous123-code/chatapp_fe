<template>
  <button class="addChatButton" v-on:click="shouldShow = true">+</button>
  <VDialog
    class="chatAddDialog-root"
    v-model:visible="shouldShow"
    dialog-class="chatAddDialog-content"
  >
    <VButton v-on:click="createChat">Create Chat</VButton>
    <p>or</p>
    <VInput v-model="invite" v-on:keydown.enter="useInvite" />
    <VButton v-on:click="useInvite">Use Invite</VButton>
  </VDialog>
</template>

<script>
import axios from "axios";
import VDialog from "@/components/abstract/VDialog.vue";
import VButton from "@/components/abstract/VButton.vue";
import VInput from "@/components/abstract/VInput.vue";
export default {
  name: "AddChatButton",
  components: { VInput, VButton, VDialog },
  data: () => {
    return {
      shouldShow: false,
      invite: "",
    };
  },
  props: {
    token: String,
  },
  methods: {
    useInvite() {
      axios.get(`${import.meta.env.VITE_APIROOT}invite/${this.invite}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    },
    createChat() {
      axios.post(
        `${import.meta.env.VITE_APIROOT}chats/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
    },
  },
};
</script>

<style scoped>
.addChatButton {
  border-width: 0;
  cursor: pointer;
}
</style>
