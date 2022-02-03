<template>
  <div class="user">{{ user.username }}</div>
</template>

<script>
export default {
  name: "ChatUser",
  props: ["user"],
};
</script>

<style scoped></style>
