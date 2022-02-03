<template>
  <router-link :to="'/chats/' + chat.id" class="chatButton">{{
    chat.id
  }}</router-link>
</template>

<script>
export default {
  name: "ChatButton",
  props: ["chat"],
};
</script>

<style scoped>
</style>
