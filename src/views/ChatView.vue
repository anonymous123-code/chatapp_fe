<template>
  <div class="wrapper">
    <div class="leftContainer" v-if="token.length > 0">
      <ChatList v-bind:chats="chats" v-bind:token="token" />
    </div>
    <!--suppress JSCheckFunctionSignatures -->
    <div class="centerContainer" v-if="token.length > 0">
      <ChatMessageList
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
    <div class="leftContainer" v-if="token.length > 0">
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
    <div
      class="loginDialog-root"
      v-if="token.length === 0"
      v-on:click="visible = false"
    >
      <!-- Modal content -->
      <div class="loginDialog-content" v-on:click.stop>
        <form name="loginForm" class="loginForm">
          <input
            v-model="username"
            autocomplete="username"
            placeholder="Username"
          />
          <input
            type="password"
            v-model="password"
            autocomplete="current-password"
            placeholder="Password"
          />
          <button type="button" v-on:click="login">Login</button>
        </form>
        <p>- or -</p>
        <form name="registerForm" class="registerForm">
          <input
            v-model="registerEmail"
            autocomplete="email"
            placeholder="Email"
          />
          <input
            v-model="registerFullName"
            autocomplete="name"
            placeholder="Full Name"
          />
          <input
            v-model="registerUsername"
            autocomplete="username"
            placeholder="Username"
          />
          <input
            type="password"
            autocomplete="new-password"
            v-model="registerPassword"
            placeholder="Password"
          />
          <button type="button" v-on:click="register">Register</button>
        </form>
      </div>
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
      username: "",
      password: "",
      token_: "",
      registerEmail: "",
      registerFullName: "",
      registerPassword: "",
      registerUsername: "",
    };
  },
  created() {
    this.refreshChats();
    this.timer = setInterval(this.refreshChats, 1000);
  },
  computed: {
    token() {
      return this.token_;
    },
  },
  methods: {
    refreshChats() {
      if (this.token.length === 0) return;
      axios
        .get("http://localhost:8000/chats/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((resp) => {
          this.chats = resp.data;
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
              this.token_ = "";
            } else {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    login() {
      const params = new URLSearchParams();
      params.append("grant_type", "");
      params.append("username", this.username);
      params.append("password", this.password);
      params.append("scope", "");
      params.append("client_id", "");
      params.append("client_secret", "");
      axios.post("http://localhost:8000/token", params).then((response) => {
        this.token_ = response.data.access_token;
      });
    },
    register() {
      axios.post(
        "http://localhost:8000/users/register",
        {},
        {
          params: {
            username: this.registerUsername,
            password: this.registerPassword,
            full_name: this.registerFullName,
            email: this.registerEmail,
          },
        }
      );
    },
  },
  beforeUnmount() {
    this.cancelAutoUpdate();
  },
};
</script>

<style scoped>
.wrapper {
  padding: 2rem;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 4rem);
  width: calc(100vw - 4rem);
}
.centerContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.loginDialog-root {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  display: flex;
}
.loginDialog-content {
  margin: auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid var(--color-border);
  background-color: rgba(var(--color-background-soft-tupel), 0.4);
}
.loginForm input,
.registerForm input {
  display: block;
  margin: 5px 0;
  border-width: 0;
  border-radius: 5px;
  color: var(--color-text);
  width: 150px;
  background-color: var(--color-background-soft);
}
.loginForm input:focus,
.registerForm input:focus {
  outline: none;
  background-color: var(--color-background-mute);
}
.registerForm button,
.loginForm button {
  display: block;
  background-color: var(--color-background-soft);
  border-width: 0;
  border-radius: 5px;
  color: var(--color-text);
  width: calc(150px - 2 * 20px);
  padding: 5px;
  margin: 2px 20px;
}
.registerForm button:hover,
.loginForm button:hover {
  background-color: var(--color-background-mute);
}
.loginDialog-content p {
  text-align: center;
}
</style>
