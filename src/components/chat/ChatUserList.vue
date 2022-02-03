<template>
  <div class="userlist">
    <ChatUser
      v-for="user in users"
      v-bind:user="user"
      v-bind:key="user.username"
    />
  </div>
</template>

<script>
import ChatUser from "./ChatUser.vue";
export default {
  name: "ChatUserList",
  components: { ChatUser },
  props: ["users"],
};
</script>

<style scoped>
.userlist {
}
</style>
