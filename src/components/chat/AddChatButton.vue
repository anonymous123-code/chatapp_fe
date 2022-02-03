<template>
  <button
    class="addChatButton"
    v-on:click="
      visible = true;
      console.log(shouldShow);
    "
  >
    +
  </button>
  <div
    class="chatAddDialog-root"
    v-if="shouldShow"
    v-on:click="visible = false"
  >
    <!-- Modal content -->
    <div class="chatAddDialog-content" v-on:click.stop>
      <span class="close" v-on:click="visible = false">&times;</span>
      <button v-on:click="createChat">Create Chat</button>
      <p>or</p>
      <input v-model="invite" v-on:keydown.enter="useInvite" />
      <button v-on:click="useInvite">Use Invite</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddChatButton",
  components: {},
  data: () => {
    return {
      visible: false,
      invite: "",
      console: console,
    };
  },
  computed: {
    shouldShow() {
      return this.visible;
    },
  },
  props: {
    token: String,
  },
  methods: {
    useInvite() {
      axios.get(`http://localhost:8000/invite/${this.invite}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    },
    createChat() {
      axios.post(
        `http://localhost:8000/chats/`,
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
.chatAddDialog-root {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.chatAddDialog-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.addChatButton {
  border-width: 0;
  cursor: pointer;
}
</style>
